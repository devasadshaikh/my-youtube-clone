import { ChevronDown, ChevronUp, Clapperboard, Clock, Flame, Gamepad2, History, Home, Library, Lightbulb, ListVideo, Music2, Newspaper, PlaySquare, Podcast, Repeat, Shirt, ShoppingBag, Trophy } from "lucide-react";
import { Children, ElementType, useState } from "react";
import { useSideBarContext } from "../contexts/SideBarContexts";
import { PageHeaderFirstSection } from "./PageHeader";

const SideBar = () => {
    const { isLargeOpen, isSmallOpen, close } = useSideBarContext()
    return (
        <>
            <aside className={` sticky top-0 overflow-y-auto pb-4 flex flex-col ml-1 scrollbar-hidden lg:hidden
             ${isLargeOpen ? " lg:hidden" : " lg:flex"}`}>

                <SmallSideBarItem Icon={Home} title="Home" url="/" />
                <SmallSideBarItem Icon={Repeat} title="Shorts" url="/shorts" />
                <SmallSideBarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
                <SmallSideBarItem Icon={Library} title="Library" url="/library" />
            </aside>

            {isSmallOpen && (
                <div onClick={close}
                    className=" lg:hidden fixed inset-0 z-[999] bg-black opacity-50"
                />
            )}


            <aside className={` w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2  
            ${isLargeOpen ? " lg:flex" : " lg:hidden"} ${isSmallOpen ? " flex z-[999] bg-white max-h-screen" : " hidden"}`}>

                <div className=" lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white ">
                    <PageHeaderFirstSection />
                </div>
                <hr className=" lg:mt-4 mb-2" />
                <LargeSideBarSection>
                    <LargeSideBarItem isActive Icon={Home} title="Home" url="/" />
                    <LargeSideBarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
                </LargeSideBarSection>
                <hr />
                <LargeSideBarSection visibleCount={5}>
                    <LargeSideBarItem Icon={Library} title="Library" url="/library" />

                    <LargeSideBarItem Icon={History} title="History" url="/history" />

                    <LargeSideBarItem Icon={PlaySquare} title="Your Videos" url="/your-videos" />

                    <LargeSideBarItem Icon={Clock} title="Watch Later" url="/playlist?list=WL" />

                    <LargeSideBarItem key={1} Icon={ListVideo} title="React" url={`/playlist?list=${1}`} />

                    <LargeSideBarItem key={2} Icon={ListVideo} title="Sanity" url={`/playlist?list=${2}`} />

                    <LargeSideBarItem key={3} Icon={ListVideo} title="Next.js" url={`/playlist?list=${3}`} />

                    <LargeSideBarItem key={4} Icon={ListVideo} title="Web Development" url={`/playlist?list=${4}`} />

                    <LargeSideBarItem key={5} Icon={ListVideo} title="Javascript" url={`/playlist?list=${5}`} />

                </LargeSideBarSection>

                <hr />

                <LargeSideBarSection title="  ">
                    <p className=" ml-3 font-semibold">Subscriptions</p>

                    <div className=" flex items-center p-2 rounded-md hover:bg-gray-100">
                        <div className='w-7 h-7 rounded-full bg-gray-200'></div>
                        <p className=" text-sm ml-5">CodeWithHarry</p>
                    </div>

                    <div className=" flex items-center p-2 rounded-md hover:bg-gray-100">
                        <div className='w-7 h-7 rounded-full bg-gray-200'></div>
                        <p className=" text-sm ml-5">IT MATE PK</p>
                    </div>

                    <div className=" flex items-center p-2 rounded-md hover:bg-gray-100">
                        <div className='w-7 h-7 rounded-full bg-gray-200'></div>
                        <p className=" text-sm ml-5">Dave Gray</p>
                    </div>

                    <div className=" flex items-center p-2 rounded-md hover:bg-gray-100">
                        <div className='w-7 h-7 rounded-full bg-gray-200'></div>
                        <p className=" text-sm ml-5">Panaverse DAO</p>
                    </div>

                    <div className=" flex items-center p-2 rounded-md hover:bg-gray-100">
                        <div className='w-7 h-7 rounded-full bg-gray-200'></div>
                        <p className=" text-sm ml-5">Tailwind Labs</p>
                    </div>

                </LargeSideBarSection>
                <hr />

                <LargeSideBarSection>
                    <p className=" ml-3 font-semibold">Explore</p>

                    <LargeSideBarItem Icon={Flame} title="Trending" />

                    <LargeSideBarItem Icon={ShoppingBag} title="Shopping" />

                    <LargeSideBarItem Icon={Music2} title="Music" />

                    <LargeSideBarItem Icon={Flame} title="Trending" />

                    <LargeSideBarItem Icon={Newspaper} title="News" />

                    <LargeSideBarItem Icon={Gamepad2} title="Gaming" />

                    <LargeSideBarItem Icon={Trophy} title="Sports" />

                    <LargeSideBarItem Icon={Lightbulb} title="Learning" />

                    <LargeSideBarItem Icon={Shirt} title="Fashion & Beauty" />

                    <LargeSideBarItem Icon={Podcast} title="Podcasts" />

                </LargeSideBarSection>

            </aside>
        </>

    )
}
export default SideBar;

interface SmallSideBarItemProps {
    Icon: ElementType,
    title: string,
    url: string
}

function SmallSideBarItem({ Icon, title, url }: SmallSideBarItemProps) {
    return (
        <a href={url} className=" hidden py-4 md:flex flex-col items-center gap-1 hover:bg-gray-100 rounded-lg">
            <Icon className=" w-5 h-5" />
            <div className=" text-[10px]">{title}</div>
        </a>
    )
}

interface LargeSideBarSectionProps {
    children: React.ReactNode,
    title?: string,
    visibleCount?: number
}
function LargeSideBarSection({ children, title, visibleCount = Number.POSITIVE_INFINITY }: LargeSideBarSectionProps) {

    const [expand, setExpand] = useState(false)
    const childrenArray = Children.toArray(children).flat()
    const visibleChildren = expand ? childrenArray : childrenArray.slice(0, visibleCount)
    const showExpandButton = childrenArray.length > visibleCount

    const ButtonIcon = expand ? ChevronUp : ChevronDown
    return (
        <>
            <div>
                {title && <div className=" ml-4 mt-2 text-lg mb-1">{title}</div>}
                {visibleChildren}
                {showExpandButton && (
                    <button
                        onClick={() => setExpand(e => !e)}
                        className=" flex w-full items-center rounded-lg gap-4 p-3">
                        <ButtonIcon className=" w-5 h-5" />

                        <div>{expand ? "Show Less" : "Show More"}</div>
                    </button>
                )}
            </div>



        </>
    )

}

interface LargeSideBarItemProps {
    Icon: ElementType,
    title: string,
    url?: string,
    isActive?: boolean
}

function LargeSideBarItem({ Icon, title, url, isActive = false }: LargeSideBarItemProps) {
    return (
        <a href={url} className={` p-2 flex  items-center gap-4 hover:bg-gray-100 rounded-lg ${isActive ?
            " font-semibold bg-neutral-100 hover:bg-gray-200" : undefined}`} >
            <Icon className="w-5 h-5 " />
            <div className=" whitespace-nowrap overflow-hidden text-ellipsis">
                {title}

            </div>


        </a>
    )

}
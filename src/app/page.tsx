"use client"
import { useState } from "react";
import CategoryPills from "./PageComponents/CategoryPills";
import PageHeader from "./PageComponents/PageHeader";
import { categories } from "./data/home";
import YourComponent from "./PageComponents/VideoGridItems";
import SideBar from "./PageComponents/SideBar";
import SideBarProvider from "./contexts/SideBarContexts";


const Home = () => {

  const [selected, setSelected] = useState(categories[0])

  return (
    <>
   
      <SideBarProvider>

        <div className="  max-h-screen flex flex-col">
          <PageHeader />
          <div className=" grid grid-cols-[auto,1fr] flex-grow overflow-auto">

            <SideBar />
            <div className="     overflow-x-hidden  mt-5">
              <div className="  sticky top-0 bg-white z-10 pb-2">
                <CategoryPills categories={categories}
                  selected={selected} onSelect={setSelected} />
              </div>


              <div className="">
              <YourComponent />
              </div>




            </div>

          </div>

        </div>
      </SideBarProvider>
     
    </>
  )
}
export default Home;


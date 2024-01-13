"use client"

import { useEffect, useRef, useState } from 'react';
import { fetchTrendingVideos, VideoItem } from '../data/youtubeApi';
import { formatViewCount } from '../data/view';
import { getTimeDifference } from '../data/date';
import { formatDuration } from '../data/duration';


export default function YourComponent() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isPlaying, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current == null) return

    if (isPlaying) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }, [isPlaying])


  useEffect(() => {
    async function fetchVideos() {
      const trendingVideos = await fetchTrendingVideos();
      setVideos(trendingVideos);
      if (trendingVideos.length > 0) {
        setSelectedVideoId(trendingVideos[0].id);
      }
    }
    fetchVideos();
  }, []);




  return (
    <div className="   ">

      <div
        className="   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">

        {videos.map(video => (

          <div key={video.id} >









            <a

              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className=' relative aspect-video  '
            >



              <img src={video.thumbnail} alt={video.title} className='  object-cover rounded-xl' />
              <div className="absolute right-1  bottom-1 rounded text-sm bg-black text-white">{formatDuration(video.timeDuration)}</div>


            </a>

            <div className=' flex mt-3'>
              <div className=' w-10 h-10 bg-gray-200 rounded-full p-5'></div>



              <h1 className=' font-semibold ml-4 '>

                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=' relative aspect-video'
                >

                  {video.title}

                </a>

              </h1>
            </div>


            <p className=' ml-14 text-base mt-2'>{video.channelName}</p>
            <div className=' flex gap-x-1 text-sm ml-14'>
              <p>{formatViewCount(video.views)} views .</p>
              <p>{getTimeDifference(video.publishDate)}</p>
            </div>


          </div>
        ))}
      </div>

    </div>
  );



}


import React from 'react'
import { useState } from 'react'
import { ALL_VIDEOS } from '@/pages/DataContent/Data'
import 

const ChannelInfo = () => {
   const router = useRouter();
     const { id } = router.query;
  interface Video {
    _id: string;
    videotitle: string;
    videochanel: string;
    views: number;
    Like: number;
    filepath: string;
  }
  const [video, setVideo] = useState < Video | undefined > (undefined)

  const videoInfo = ALL_VIDEOS
  return (
    <div></div>
  )
}

export default ChannelInfo
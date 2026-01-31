import React from 'react'
import { useState } from 'react'
import { ALL_VIDEOS } from '@/pages/DataContent/Data'
import { useRouter } from 'next/router'

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
  const [video, setVideo] = useState<Video | undefined>(undefined)

  const videoInfo = ALL_VIDEOS
  return (
    <div>
       <h1></h1>
    </div>
  )
}

export default ChannelInfo
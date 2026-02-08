import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CustomVideoPlayer from "@/components/CustomVideoPlayer";
import data from "@/lib/data/videos";
import ChannelInfo from "@/components/ChannelInfo";
import Comments from "@/components/Comments";
import RelatedVideos from "@/components/RelatedVideo";

const VideoOpenToWatch = () => {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  interface Video {
    _id: string;
    videotitle: string;
    videochanel: string;
    views: number;
    Like: number;
    filepath: string;
  }

  const [video, setVideo] = useState<Video | undefined>(undefined);

  const relatedVideos = data.ALL_VIDEOS;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const foundVideo = relatedVideos.find((v) => String(v._id) === String(id));

    setTimeout(() => {
      setLoading(false);
      setVideo(foundVideo);
    }, 0);
  }, [router.isReady, id, relatedVideos]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Video not found for ID: {id}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1800px]">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Video Player, Info, Comments */}
        <div className="flex-1 w-full lg:w-[calc(100%-400px)]">
          <div className="w-full">
            <CustomVideoPlayer video={video} />
          </div>
          <div className="mt-4">
            <ChannelInfo />
            <Comments videoId={String(id || video?._id || "")} />
          </div>
        </div>

        {/* Right Column: Related Videos */}
        <div className="w-full lg:w-[350px] shrink-0">
          <h3 className="text-lg font-bold mb-4 hidden lg:block">Related Videos</h3>
          <RelatedVideos videos={relatedVideos} />
        </div>
      </div>
    </div>
  );
};

export default VideoOpenToWatch;

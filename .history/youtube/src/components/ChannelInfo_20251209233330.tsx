import React from "react";
import { useRouter } from "next/router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { ALL_VIDEOS } from "@/pages/DataContent/Data";
import { useState } from "react";
import {
  Clock,
  Download,
  MoreHorizontal,
  Share,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

const ChannelInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const video = ALL_VIDEOS.find((v) => String(v._id) === String(id));

  // Always call hooks unconditionally
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likes, setlikes] = useState(video?.Like || 0);
  const [dislikes, setDislikes] = useState(video?.Dislike || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  if (!video) return <h1>No Video Found</h1>;


  return (
    <div className="space-y-3">
      {/* Video Title */}
      <h1 className="text-2xl font-semibold">{video.videotitle}</h1>

      <div className="">
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback>{video.videochanel[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{video.videochanel}</h3>
            <p className="text-sm text-gray-600">1.2M subscribers</p>
          </div>
          <Button
            onClick={() => setIsSubscribed(!isSubscribed)}
            variant={isSubscribed ? "outline" : "default"}
            className={
              isSubscribed
                ? "bg-gray-100"
                : "bg-red-600 hover:bg-red-700 text-white"
            }
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </div>

        <div className="flex items-center  gap-3">
          <div className="flex items-center bg-gray-200 rounded-full">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-l-full"
            // onClick={handleLike}
            >
              <ThumbsUp
                className={`w-5 h-5 mr-2 ${isLiked ? "fill-black text-black" : ""
                  }`}
              />
              {likes.toLocaleString()}
            </Button>
            <div className="w-px h-6 bg-gray-300" />
            <Button
              variant="ghost"
              size="sm"
              className="rounded-r-full"
            // onClick={handleDislike}
            >
              <ThumbsDown
                className={`w-5 h-5 mr-2 ${isDisliked ? "fill-black text-black" : ""
                  }`}
              />
              {dislikes.toLocaleString()}
            </Button>
          </div>
          {/* <Button
            variant="ghost"
            size="sm"
            className={`bg-gray-100 rounded-full ${isWatchLater ? "text-primary" : ""
              }`}
          // onClick={handleWatchLater}
          >
            <Clock className="w-5 h-5 mr-2" />
            {isWatchLater ? "Saved" : "Watch Later"}
          </Button> */}
          <Button
            variant="ghost"
            size="sm"
            className="bg-gray-200 rounded-full"
          >
            <Share className="w-5 h-5 mr-2" />
            Share
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-gray-200 rounded-full"
          >
            <Download className="w-5 h-5 mr-2" />
            Download
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-gray-200 rounded-full"
          >
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;

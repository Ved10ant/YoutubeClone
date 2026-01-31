import React, { useState } from "react";
import { useRouter } from "next/router";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

import { useState } from "react"; import { ALL_VIDEOS } from "@/pages/DataContent/Data"; import { useRouter } from "next/router";
 import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"; import { Button } from "./ui/button"; const ChannelInfo = ({ channel, user }: any) => { const router = useRouter(); const { id } = router.query; interface Video { _id: string; videotitle: string; videochanel: string; views: number; Like: number; filepath: string; } const [isSubscribed, setisSubscribed] = useState(false); const [video, setVideo] = useState<Video | undefined>(undefined); const videoInfo = ALL_VIDEOS;
const ALL_VIDEOS = [
  {
    _id: "1",
    videotitle: "Amazing Nature Documentary",
    videochanel: "Nature Channel",
    views: 45000,
    Like: 2500,
    filepath: "https://www.pexels.com/download/video/35002097/",
  },
  {
    _id: "2",
    videotitle: "Cooking Tutorial: Perfect Pasta",
    videochanel: "Chef's Kitchen",
    views: 23000,
    Like: 1200,
    filepath: "https://www.pexels.com/download/video/35002097/",
  },
  {
    _id: "3",
    videotitle: "SouthIndies vs India Highlights",
    videochanel: "Sports TV",
    views: 89000,
    Like: 8700,
    filepath: "https://www.pexels.com/download/video/35002097/",
  },
];

const ChannelInfo = ({channel ,user}:any) => {
  const router = useRouter();
  const { id } = router.query;

  const [isSubscribed, setIsSubscribed] = useState(false);

  // -----------------------------------
  // FIND VIDEO BASED ON ROUTE /watch/:id
  // -----------------------------------
  const video = ALL_VIDEOS.find((v) => String(v._id) === String(id));

  // -----------------------------------
  // CHANNEL DATA BASED ON VIDEO OWNER
  // -----------------------------------
  const channel = video
    ? {
        ...DUMMY_CHANNEL,
        username: video.videochanel,
      }
    : DUMMY_CHANNEL;

  return (
    <div className="space-y-3">
      {/* Video Title */}
      <h1 className="text-2xl font-semibold">
        {video?.videotitle || "No Title Found"}
      </h1>

      <div className="flex items-center gap-4 mt-3">
        {/* Avatar */}
        <Avatar className="w-12 h-12">
          <AvatarFallback>
            {channel.username ? channel.username[0] : "?"}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <h2 className="text-lg font-medium">{channel.username}</h2>
          <p className="text-sm text-gray-500">
            {channel.subscribers} subscribers
          </p>
        </div>

        {/* Subscribe Button */}
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
    </div>
  );
};

export default ChannelInfo;

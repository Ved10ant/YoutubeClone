import React from "react";
import { useRouter } from "next/router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { ALL_VIDEOS } from "@/pages/DataContent/Data";
import { useState } from "react";

const ChannelInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isSubscribed, setIsSubscribed] = useState(false)

  const video = ALL_VIDEOS.find((v) => String(v._id) === String(id));

  if (!video) return <h1>No Video Found</h1>;

  return (
    <div className="space-y-3">
      {/* Video Title */}
      <h1 className="text-2xl font-semibold">{video.videotitle}</h1>

      <div className="flex items-center gap-4 mt-3">
        {/* Avatar */}
        <Avatar className="w-12 h-12">
          <AvatarFallback>
            {video.videochanel ? video.videochanel[0] : "?"}
          </AvatarFallback>
        </Avatar>

        {/* Channel Info */}
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">{video.videochanel}</h2>
          <p className="text-sm text-gray-500">{}</p>
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

import React from "react";
import { useState } from "react";
import { ALL_VIDEOS } from "@/pages/DataContent/Data";
import { useRouter } from "next/router";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";

const ChannelInfo = ({ channel, user }: ) => {
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
  const [isSubscribed, setisSubscribed] = useState(false);
  const [video, setVideo] = useState<Video | undefined>(undefined);

  const videoInfo = ALL_VIDEOS;
  return (
    <div>
      {/* The `video` state is initialized as undefined and never set, so `video?.videotitle` is always undefined. 
          To display the title, you need to retrieve the video data based on the current route `id`. */}
      <h1>
        {videoInfo.find((v) => {
          return String(v._id) === String(id);
        })?.videotitle || "No Title Found"}
      </h1>
      <div className="flex">
        <Avatar>
          <AvatarFallback>
            {channel?.username ? channel.username[0] : "?"}
          </AvatarFallback>
        </Avatar>
        <h1>{video?.videochanel}</h1>
        {user && user?._id !== channel?._id && (
          <div className="flex gap-2">
            <Button
              onClick={() => setisSubscribed(!isSubscribed)}
              variant={isSubscribed ? "outline" : "default"}
              className={
                isSubscribed ? "bg-gray-100" : "bg-red-600 hover:bg-red-700"
              }
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelInfo;

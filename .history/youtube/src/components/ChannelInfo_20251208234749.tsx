import React from "react";
import { useState } from "react";
import { ALL_VIDEOS } from "@/pages/DataContent/Data";
import { useRouter } from "next/router";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

const ChannelInfo = ({ channel, user }: any) => {
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
      <Avatar>
        <AvatarFallback>
          {channel?.username}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ChannelInfo;

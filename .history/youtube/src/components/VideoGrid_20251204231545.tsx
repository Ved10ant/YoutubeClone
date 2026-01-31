import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

const VideoGrid = () => {
  const [loading, setLoading] = useState(true);

  const videos = [
    {
      _id: "1",
      videotitle: "Amazing Nature Documentary",
      filename: "nature-doc.mp4",
      filepath: "/videos/nature-doc.mp4",
      videochanel: "Nature Channel",
      views: 45000,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      videotitle: "Cooking Tutorial: Perfect Pasta",
      filename: "pasta-tutorial.mp4",
      filepath: "/videos/pasta-tutorial.mp4",
      videochanel: "Chef's Kitchen",
      views: 23000,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      _id: "3",
      videotitle: "RenGoku vs Mussa",
      filename: "fight.mp4",
      filepath: "/videos/fight.mp4",
      videochanel: "golu_yeager",
      views: 25000,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      _id: "3",
      videotitle: "RenGoku vs Mussa",
      filename: "fight.mp4",
      filepath: "/videos/fight.mp4",
      videochanel: "golu_yeager",
      views: 25000,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      _id: "3",
      videotitle: "TriggerInsan",
      filename: "fight.mp4",
      filepath: "/videos/fight.mp4",
      videochanel: "golu_yeager",
      views: 25000,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      _id: "3",
      videotitle: "RenGoku vs Mussa",
      filename: "fight.mp4",
      filepath: "/videos/fight.mp4",
      videochanel: "golu_yeager",
      views: 25000,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading
        ? "Loading..."
        : videos.map((v) => <VideoCard key={v._id} video={v} />)}
    </div>
  );
};
export default VideoGrid;

import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

const VideoGrid = () => {
  const [loading, setLoading] = useState(true);

  const TEST_VIDEO_URL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

  const videos = [
    {
      _id: "1",
      videotitle: "Amazing Nature Documentary (Click to watch!)",
      filename: "nature-doc.mp4",
      // 🎯 FIXED: Using the direct streaming link
      filepath: TEST_VIDEO_URL,
      videochanel: "Nature Channel",
      views: 45000,
      createdAt: new Date().toISOString(),
      smallvideo: TEST_VIDEO_URL
    },
    {
      _id: "2",
      videotitle: "Cooking Tutorial: Perfect Pasta",
      filename: "pasta-tutorial.mp4",
      // 🎯 FIXED: Using the direct streaming link
      filepath: TEST_VIDEO_URL,
      videochanel: "Chef's Kitchen",
      views: 23000,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      _id: "3",
      videotitle: "RenGoku vs Mussa",
      filename: "fight.mp4",
      // 🎯 FIXED: Using the direct streaming link
      filepath: TEST_VIDEO_URL,
      videochanel: "golu_yeager",
      views: 25000,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      _id: "4",
      videotitle: "SouthIndies vs India",
      filename: "fight.mp4",
      // 🎯 FIXED: Using the direct streaming link
      filepath: TEST_VIDEO_URL,
      videochanel: "golu_yeager",
      views: 25000,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      _id: "5",
      videotitle: "TriggerInsan",
      filename: "fight.mp4",
      // 🎯 FIXED: Using the direct streaming link
      filepath: TEST_VIDEO_URL,
      videochanel: "Trigger",
      views: 25000,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      _id: "6",
      videotitle: "RenGoku vs Mussa",
      filename: "fight.mp4",
      // 🎯 FIXED: Using the direct streaming link
      filepath: TEST_VIDEO_URL,
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
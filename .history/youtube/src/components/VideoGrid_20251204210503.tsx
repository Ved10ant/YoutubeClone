import React, { useEffect, useState } from "react";
import Videocard from "../components/VideoCard";

const VideoGrid = () => {
    const [loading, setloading] = useState(true);

    const videoss = [
        {
            _id: "1",
            videotitle: "Amazing Nature Documentary",
            filename: "nature-doc.mp4",
            filepath: "/videos/nature-doc.mp4",
            videochanel: "Nature Channel",
            Like: 1250,
            views: 45000,
            uploader: "nature_lover",
            createdAt: new Date().toISOString(),
        },
        {
            _id: "2",
            videotitle: "Cooking Tutorial: Perfect Pasta",
            filename: "pasta-tutorial.mp4",
            filepath: "/videos/pasta-tutorial.mp4",
            videochanel: "Chef's Kitchen",
            Like: 890,
            views: 23000,
            uploader: "chef_master",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
            _id: "3",
            videotitle: "RenGoku vs Mussa",
            filename: "pasta-tutorial.mp4",
            filepath: "/videos/pasta-tutorial.mp4",
            videochanel: "golu_yeager",
            Like: 80,
            views: 25000,
            uploader: "golu_yeager",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
    ];

    useEffect(() => {
        // Since you're using static dummy data, set loading false immediately
        setloading(false);
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                loading
                    ? "Loading..."
                    : videoss.map((video) => (
                        <Videocard key={video._id} video={video} />
                    ))
            }
        </div>
    );
};

export default VideoGrid;

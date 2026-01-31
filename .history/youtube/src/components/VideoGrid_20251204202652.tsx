import React, { useEffect, useState } from "react";
import Videocard from "../components/VideoCard";
// import axiosInstance from "@/lib/axiosinstance";


const VideoGrid = () => {
    const [loading, setloading] = useState(true);
    const [video, setvideo] = useState<any>([])

    const videoss = [
        {/* <Link href={`/watch/${video?._id}`} className="group">
      in this , at each video this URL is created /watch/1 based on the _id: .
    */},
        {
            _id: "1",
            videotitle: "Amazing Nature Documentary",
            filename: "nature-doc.mp4",
            filetype: "video/mp4",
            filepath: "/videos/nature-doc.mp4",
            filesize: "500MB",
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
            filetype: "video/mp4",
            filepath: "/videos/pasta-tutorial.mp4",
            filesize: "300MB",
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
            filetype: "video/mp4",
            filepath: "/videos/pasta-tutorial.mp4",
            filesize: "300MB",
            videochanel: "golu_yeager",
            Like: 80,
            views: 25000,
            uploader: "golu_yeager",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
    ];
    return (
        <div>
            {
                loading ? "Loading...." : videoss.map((video)=>{})
            }
        </div>
    )
}

export default VideoGrid
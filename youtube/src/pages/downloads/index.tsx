import React, { useEffect } from "react";
import { useUser } from "@/lib/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Download } from "lucide-react";

export default function DownloadsPage() {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading) return <div>Loading...</div>;

    if (!user) return null;

    interface DownloadedVideo {
        videoId: string;
        videoTitle: string;
        videoThumbnail: string;
        videoChannel: string;
        downloadedAt: string;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 rounded-full">
                    <Download className="w-6 h-6 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold">Downloads</h1>
            </div>

            {user.downloads && user.downloads.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {user.downloads.map((video: DownloadedVideo, index: number) => (
                        <Link href={`/watch/${video.videoId}`} key={index}>
                            <div className="flex flex-col gap-2 cursor-pointer group">
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                    <Image
                                        src={video.videoThumbnail || "/img/thumbnail.png"}
                                        alt={video.videoTitle}
                                        priority
                                        width={500}
                                        height={500}
                                        className="h-full w-full object-cover group-hover:scale-105 duration-200"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold line-clamp-2">
                                        {video.videoTitle}
                                    </h3>
                                    <p className="text-sm text-gray-500">{video.videoChannel}</p>
                                    <p className="text-xs text-gray-500">
                                        Downloaded {formatDistanceToNow(new Date(video.downloadedAt))} ago
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <h2 className="text-xl font-semibold mb-2">No downloads yet</h2>
                    <p className="text-gray-500 mb-6">
                        Videos you download will appear here.
                    </p>
                    <Link href="/">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                            Explore Videos
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

import { useState, useEffect } from 'react';
import { user } from '../pages/DataContent/Data';
import { MoreVertical, X, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/";

interface HistoryItems {
    _id: string,
    videoid: string,
    views: string,
    watched_on: string,
    video: {
        _id: string,
        videotitle: string,
        view: number,
        createdat: string,
    }
}

const UserHistory = () => {

    const [history, sethistory] = useState<HistoryItems[]>([])
    const [loading, setloading] = useState(true)
    const AllUsers = user;

    useEffect(() => {
        if (AllUsers) {

        }
    }, [AllUsers])

    const loadHistory = () => {
        if (!AllUsers) return;
        try {
            const HistoryData = [
                {
                    _id: "h1",
                    videoid: "1",
                    views: "45000",
                    watched_on: new Date(Date.now() - 3600 * 1000).toISOString(), // 1 hour ago
                    video: {
                        _id: "1",
                        videotitle: "Amazing Nature Documentary",
                        view: 45000,
                        createdat: new Date().toISOString(),
                    }
                },
                {
                    _id: "h2",
                    videoid: "2",
                    views: "23000",
                    watched_on: new Date(Date.now() - 5 * 3600 * 1000).toISOString(), // 5 hours ago
                    video: {
                        _id: "2",
                        videotitle: "Cooking Tutorial: Perfect Pasta",
                        view: 23000,
                        createdat: new Date(Date.now() - 86400000).toISOString(),
                    }
                },
                {
                    _id: "h3",
                    videoid: "3",
                    views: "25000",
                    watched_on: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
                    video: {
                        _id: "3",
                        videotitle: "SouthIndies vs India",
                        view: 25000,
                        createdat: new Date(Date.now() - 86400000).toISOString(),
                    }
                },
                {
                    _id: "h4",
                    videoid: "4",
                    views: "9000",
                    watched_on: new Date(Date.now() - 4 * 86400000).toISOString(), // 4 days ago
                    video: {
                        _id: "4",
                        videotitle: "TriggerInsan",
                        view: 9000,
                        createdat: new Date(Date.now() - 86400000 * 3).toISOString(),
                    }
                }

            ]
            sethistory(HistoryData);
            setloading(false);
        } catch (error) {
            console.error("Error loading history:", error);
            setloading(false);
        }
    }
    const handleRemoveFromHistory = async (historyId: string) => {
        try {
            console.log("Removing from history:", historyId);

            sethistory(history.filter((item) => item._id !== historyId));
        } catch (error) {
            console.error("Error removing from history:", error);
        }
    };

    if (!user) {
        return (
            <div className="text-center py-12">
                <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                    Keep track of what you watch
                </h2>
                <p className="text-gray-600">
                    Watch history is not viewable when signed out.
                </p>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="text-center py-12">
                <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No watch history yet</h2>
                <p className="text-gray-600">Videos you watch will appear here.</p>
            </div>
        );
    }
    return (
        <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">{history.length} videos</p>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item._id} className="flex gap-4 group">
            <Link href={`/watch/${item.videoid._id}`} className="flex-shrink-0">
              <div className="relative w-40 aspect-video bg-gray-100 rounded overflow-hidden">
                <video
                  src={`${process.env.BACKEND_URL}/${item.videoid?.filepath}`}
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={`/watch/${item.videoid._id}`}>
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 mb-1">
                  {item.videoid.videotitle}
                </h3>
              </Link>
              <p className="text-sm text-gray-600">
                {item.videoid.videochanel}
              </p>
              <p className="text-sm text-gray-600">
                {item.videoid.views.toLocaleString()} views •{" "}
                {formatDistanceToNow(new Date(item.videoid.createdAt))} ago
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Added {formatDistanceToNow(new Date(item.createdAt))} ago
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleRemoveFromHistory(item._id)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove from watch history
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
    )
}

export default UserHistory
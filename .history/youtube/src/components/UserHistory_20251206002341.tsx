import { useState, useEffect } from 'react';
import { user } from '../pages/DataContent/Data';
import { MoreVertical, X, Clock } from "lucide-react";
import Link from 'next/link';
import { Button } from './ui/button';
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface HistoryItems {
  _id: string;
  videoid: string;
  watched_on: string;
  video: {
    _id: string;
    videotitle: string;
    videochanel: string;
    view: number;
    createdat: string;
    filepath: string;
  };
}

const UserHistory = () => {
  const [history, setHistory] = useState<HistoryItems[]>([]);
  const [loading, setLoading] = useState(true);

  const AllUsers = user;

  // ---------------------------
  // LOAD HISTORY DATA (Dummy)
  // ---------------------------
  useEffect(() => {
    if (!AllUsers) return;

    const HistoryData: HistoryItems[] = [
      {
        _id: "h1",
        videoid: "1",
        watched_on: new Date(Date.now() - 3600 * 1000).toISOString(), // 1 hour ago
        video: {
          _id: "1",
          videotitle: "Amazing Nature Documentary",
          videochanel: "Nature Channel",
          view: 45000,
          filepath: "https://www.pexels.com/download/video/35002097/",
          createdat: new Date().toISOString(),
        }
      },
      {
        _id: "h2",
        videoid: "2",
        watched_on: new Date(Date.now() - 5 * 3600 * 1000).toISOString(), // 5 hours ago
        video: {
          _id: "2",
          videotitle: "Cooking Tutorial: Perfect Pasta",
          videochanel: "Chef's Kitchen",
          view: 23000,
          filepath: "https://www.pexels.com/download/video/35002097/",
          createdat: new Date(Date.now() - 86400000).toISOString(),
        }
      },
      {
        _id: "h3",
        videoid: "3",
        watched_on: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
        video: {
          _id: "3",
          videotitle: "SouthIndies vs India",
          videochanel: "Sports TV",
          view: 25000,
          filepath: "https://www.pexels.com/download/video/35002097/",
          createdat: new Date(Date.now() - 86400000).toISOString(),
        }
      },
      {
        _id: "h4",
        videoid: "4",
        watched_on: new Date(Date.now() - 4 * 86400000).toISOString(), // 4 days ago
        video: {
          _id: "4",
          videotitle: "TriggerInsan",
          videochanel: "Trigger Channel",
          view: 9000,
          filepath: "https://www.pexels.com/download/video/35002097/",
          createdat: new Date(Date.now() - (86400000 * 3)).toISOString(),
        }
      }
    ];

    sethistory(HistoryData);
    setloading(false);
  }, []);

  // ---------------------------
  // REMOVE FROM HISTORY
  // ---------------------------
  const handleRemoveFromHistory = (historyId: string) => {
    setHistory(history.filter((item) => item._id !== historyId));
  };


  // ---------------------------
  // Loading State
  // ---------------------------
  if (loading) {
    return <div className="text-center py-12 text-gray-600">Loading...</div>;
  }

  // ---------------------------
  // No User Data
  // ---------------------------
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

  // ---------------------------
  // Empty History
  // ---------------------------
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
            {/* Thumbnail */}
            <Link href={`/watch/${item.video._id}`} className="flex-shrink-0">
              <div className="relative w-40 aspect-video bg-gray-100 rounded overflow-hidden">
                <video
                  src={item.video.filepath}
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>

            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <Link href={`/watch/${item.video._id}`}>
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 mb-1">
                  {item.video.videotitle}
                </h3>
              </Link>

              <p className="text-sm text-gray-600">
                {item.video.videochanel}
              </p>

              <p className="text-sm text-gray-600">
                {item.video.view.toLocaleString()} views •{" "}
                {formatDistanceToNow(new Date(item.video.createdat))} ago
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Watched {formatDistanceToNow(new Date(item.watched_on))} ago
              </p>
            </div>

            {/* Menu */}
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
  );
};

export default UserHistory;

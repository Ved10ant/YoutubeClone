// This URL is used to load the video source in both the grid and the player.
const TEST_VIDEO_URL =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

// 🟢 EXPORT the full array of video objects for use in other components.
export const ALL_VIDEOS = [
  {
    _id: "1",
    videotitle: "Amazing Nature Documentary (Click to watch!)",
    filename: "nature-doc.mp4",
    filepath: TEST_VIDEO_URL,
    videochanel: "Nature Channel",
    views: 45000,
    Like: 1250,
    Dislike: 50,
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    smallvideo: TEST_VIDEO_URL,
  },
  {
    _id: "2",
    videotitle: "Cooking Tutorial: Perfect Pasta",
    filename: "pasta-tutorial.mp4",
    filepath: TEST_VIDEO_URL,
    videochanel: "Chef's Kitchen",
    views: 23000,
    Like: 890,
    Dislike: 20,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    _id: "3",
    videotitle: "RenGoku vs Mussa",
    filename: "fight.mp4",
    filepath: TEST_VIDEO_URL,
    videochanel: "golu_yeager",
    views: 25000,
    Like: 430,
    Dislike: 5,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    _id: "4",
    videotitle: "SouthIndies vs India",
    filename: "cricket.mp4",
    filepath: TEST_VIDEO_URL,
    videochanel: "Sport Highlights",
    views: 350000,
    Like: 15000,
    Dislike: 500,
    createdAt: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
  },
  {
    _id: "5",
    videotitle: "TriggerInsan's Latest VLOG",
    filename: "vlog.mp4",
    filepath: TEST_VIDEO_URL,
    videochanel: "Trigger",
    views: 25000,
    Like: 900,
    Dislike: 15,
    createdAt: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
  },
  {
    _id: "6",
    videotitle: "Musa's Best Dance Moves",
    filename: "dance.mp4",
    filepath: TEST_VIDEO_URL,
    videochanel: "golu_yeager",
    views: 10000,
    Like: 120,
    Dislike: 1,
    createdAt: new Date(Date.now() - 2419200000).toISOString(), // 1 month ago
  },
];

export const user = [
  {
    _id: "1",
    
  },
];

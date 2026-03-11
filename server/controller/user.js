import users from "../models/user.js";

export const downloadVideo = async (req, res) => {
  const { userId, videoId, videoTitle, videoThumbnail, videoChannel } = req.body;

  try {
    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is Premium
    if (user.isPremium) {
      // Premium user: Unlimited downloads
      user.downloads.push({
        videoId,
        videoTitle,
        videoThumbnail,
        videoChannel,
        downloadedAt: new Date(),
      });
      await user.save();
      return res.status(200).json({ message: "Video downloaded successfully", user });
    }

    // Free user: Check daily limit
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastDownload = user.lastDownloadDate ? new Date(user.lastDownloadDate) : null;

    if (lastDownload) {
      lastDownload.setHours(0, 0, 0, 0);
    }

    if (lastDownload && lastDownload.getTime() === today.getTime()) {
      return res.status(403).json({ message: "Daily download limit reached. Upgrade to Premium for unlimited downloads." });
    }

    // Allow download
    user.downloads.push({
      videoId,
      videoTitle,
      videoThumbnail,
      videoChannel,
      downloadedAt: new Date(),
    });
    user.lastDownloadDate = new Date();
    await user.save();

    res.status(200).json({ message: "Video downloaded successfully", user });
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

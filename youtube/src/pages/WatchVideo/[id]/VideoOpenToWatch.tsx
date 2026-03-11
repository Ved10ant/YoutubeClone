import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CustomVideoPlayer from "@/components/CustomVideoPlayer";
import data from "@/lib/data/videos";
import ChannelInfo from "@/components/ChannelInfo";
import Comments from "@/components/Comments";
import RelatedVideos from "@/components/RelatedVideo";

import { Download } from "lucide-react";
import axiosInstance from "@/lib/axiosinstance"; // Use centralized instance
import axios from "axios";
import { useUser } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Script from "next/script";

const VideoOpenToWatch = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, login } = useUser(); // Get user and login from context

  const [loading, setLoading] = useState(true);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  interface Video {
    _id: string;
    videotitle: string;
    videochanel: string;
    views: number;
    Like: number;
    filepath: string;
  }

  const [video, setVideo] = useState<Video | undefined>(undefined);

  const relatedVideos = data.ALL_VIDEOS;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const foundVideo = relatedVideos.find((v) => String(v._id) === String(id));

    setTimeout(() => {
      setLoading(false);
      setVideo(foundVideo);
    }, 0);
  }, [router.isReady, id, relatedVideos]);

  const handleDownload = async () => {
    if (!user) {
      toast.error("Please sign in to download videos");
      return;
    }

    try {
      const response = await axiosInstance.post("/user/user/download", {
        userId: user._id || user.id,
        videoId: video?._id,
        videoTitle: video?.videotitle,
        videoThumbnail: "/img/thumbnail.png", // Placeholder or actual thumbnail if available
        videoChannel: video?.videochanel
      });

      if (response.status === 200) {
        if (response.data.user) {
          login(response.data.user);
        }

        // Trigger actual download in browser
        const a = document.createElement("a");
        a.href = video?.filepath || "/video/sample.mp4";
        a.download = `${video?.videotitle || "video"}.mp4`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        toast.success("Video saved to Downloads!");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
        setShowPremiumModal(true);
      } else {
        toast.error("Download failed. Please try again.");
        console.error(error);
      }
    }
  };

  interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }

  const handlePayment = async () => {
    try {
      const { data: order } = await axiosInstance.post("/user/payment/orders");

      // Check for Mock Order (Test Mode without Keys)
      if (order.id && order.id.startsWith("order_mock_")) {
        toast.info("Test Mode: Simulating Payment...");
        setTimeout(async () => {
          try {
            const res = await axiosInstance.post("/user/payment/verify", {
              razorpay_order_id: order.id,
              razorpay_payment_id: "pay_mock_123456",
              razorpay_signature: "mock_signature",
              userId: user?._id || user?.id
            });
            if (res.data.user) {
              login(res.data.user);
            }
            toast.success("Welcome to Premium! (Test Mode)");
            setShowPremiumModal(false);
          } catch (error) {
            console.error(error);
            toast.error("Mock payment verification failed");
          }
        }, 1500);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder", // Replace with env var
        amount: order.amount,
        currency: order.currency,
        name: "YourTube Premium",
        description: "Unlimited Downloads & Ad-free Experience",
        order_id: order.id,
        handler: async function (response: RazorpayResponse) {
          try {
            const res = await axiosInstance.post("/user/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user?._id || user?.id
            });
            if (res.data.user) {
              login(res.data.user);
            }
            toast.success("Welcome to Premium! You can now download unlimited videos.");
            setShowPremiumModal(false);
          } catch (verifyError) {
            toast.error("Payment verification failed");
            console.error(verifyError);
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#ff0000",
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error("Could not initiate payment");
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Video not found for ID: {id}</div>;
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="container mx-auto px-4 py-6 max-w-[1800px]">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Video Player, Info, Comments */}
          <div className="flex-1 w-full lg:w-[calc(100%-400px)]">
            <div className="w-full">
              <CustomVideoPlayer video={video} />
              <div className="mt-4 flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div>
                  <h1 className="text-xl font-bold">{video.videotitle}</h1>
                </div>
                <Button onClick={handleDownload} className="flex gap-2 items-center">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <ChannelInfo />
              <Comments videoId={String(id || video?._id || "")} />
            </div>
          </div>

          {/* Right Column: Related Videos */}
          <div className="w-full lg:w-[350px] shrink-0">
            <h3 className="text-lg font-bold mb-4 hidden lg:block">Related Videos</h3>
            <RelatedVideos videos={relatedVideos} />
          </div>
        </div>

        {/* Premium Modal */}
        {showPremiumModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full text-center relative">
              <button
                onClick={() => setShowPremiumModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4">Upgrade to Premium</h2>
              <p className="text-gray-600 mb-6">
                You have reached your daily download limit of 1 video.
                Upgrade to Premium for unlimited downloads!
              </p>
              <div className="bg-red-50 p-4 rounded-lg mb-6">
                <p className="text-3xl font-bold text-red-600">₹499</p>
                <p className="text-sm text-gray-500">One-time payment</p>
              </div>
              <Button onClick={handlePayment} className="w-full py-6 text-lg bg-red-600 hover:bg-red-700">
                Get Premium Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoOpenToWatch;

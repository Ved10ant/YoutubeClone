import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";
import { ALL_VIDEOS, user as users } from "@/pages/DataContent/Data";

interface Comment {
  _id: string;
  videoid: string;
  userid: string;
  commentbody: string;
  usercommented: string;
  commentedon: string;
}

interface CommentsProps {
  videoId: string;
}

// 💬 Static default comments - moved outside component to avoid impure function calls during render
const getDefaultComments = (videoId: string): Comment[] => [
  {
    _id: "c1",
    videoid: videoId,
    userid: "1",
    commentbody: "Great video bro!",
    usercommented: "Vedant Dighe",
    commentedon: new Date(Date.now() - 2000000).toISOString(),
  },
  {
    _id: "c2",
    videoid: videoId,
    userid: "2",
    commentbody: "Loved this content!",
    usercommented: "Rohit Sharma",
    commentedon: new Date(Date.now() - 4000000).toISOString(),
  },
];

const Comments = ({ videoId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // 💡 Static fake logged-in user
  const currentUser = users[0]; // you can change index

  useEffect(() => {
    setComments(getDefaultComments(videoId));
  }, [videoId]);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      _id: Date.now().toString(),
      videoid: videoId,
      userid: currentUser.id,
      commentbody: newComment,
      usercommented: currentUser.username,
      commentedon: new Date().toISOString(),
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment._id);
    setEditText(comment.commentbody);
  };

  const handleUpdateComment = () => {
    if (!editText.trim()) return;

    setComments((prev) =>
      prev.map((c) =>
        c._id === editingCommentId ? { ...c, commentbody: editText } : c
      )
    );

    setEditingCommentId(null);
    setEditText("");
  };

  const handleDelete = (id: string) => {
    setComments((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <div className="space-y-6 mt-6 w-220">
      <h2 className="text-xl font-semibold">{comments.length} Comments</h2>

      {/* Comment Input */}
      <div className="flex gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="" />
          <AvatarFallback>{currentUser.username[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
            className="min-h-20 resize-none border-0 border-b-2 rounded-none focus-visible:ring-0"
          />
          <div className="flex gap-2 justify-end">
            <Button
              variant="ghost"
              onClick={() => setNewComment("")}
              disabled={!newComment.trim()}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="" />
              <AvatarFallback>{comment.usercommented[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">
                  {comment.usercommented}
                </span>
                <span className="text-xs text-gray-600">
                  {formatDistanceToNow(new Date(comment.commentedon))} ago
                </span>
              </div>

              {editingCommentId === comment._id ? (
                <div className="space-y-2">
                  <Textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button onClick={handleUpdateComment}>Save</Button>
                    <Button
                      variant="ghost"
                      onClick={() => setEditingCommentId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm">{comment.commentbody}</p>

                  {/* Only comment owner can edit/delete */}
                  {comment.userid === currentUser.id && (
                    <div className="flex gap-2 mt-2 text-sm text-gray-500">
                      <button onClick={() => handleEdit(comment)}>Edit</button>
                      <button onClick={() => handleDelete(comment._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;

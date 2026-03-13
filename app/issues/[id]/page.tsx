'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function IssuePage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [issue, setIssue] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState('');
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);

  useEffect(() => {
    fetch(`/api/issue/${id}`).then(r => r.json()).then(data => {
      setIssue(data);
      setUpvoteCount(data._count?.upvotes || 0);
    });
    fetch(`/api/issue/${id}/comments`).then(r => r.json()).then(setComments);
  }, [id]);

  const handleUpvote = async () => {
    const res = await fetch(`/api/issue/${id}/upvote`, { method: 'POST' });
    const data = await res.json();
    setUpvoted(data.upvoted);
    setUpvoteCount(prev => data.upvoted ? prev + 1 : prev - 1);
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    const res = await fetch(`/api/issue/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: comment }),
    });
    const newComment = await res.json();
    setComments([newComment, ...comments]);
    setComment('');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: issue?.title, text: issue?.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!issue) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      Loading...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Issue Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {issue.image && (
            <img src={issue.image} alt={issue.title} className="w-full h-56 object-cover rounded-xl mb-4" />
          )}
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs px-3 py-1 rounded-full font-medium
              ${issue.status === 'resolved' ? 'bg-green-100 text-green-700' :
                issue.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'}`}>
              {issue.status}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(issue.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-green-900 mb-2">{issue.title}</h1>
          <p className="text-gray-500 text-sm mb-4">{issue.description}</p>
          {issue.address && <p className="text-xs text-gray-400 mb-4">📍 {issue.address}</p>}

          {/* Reported by */}
          <div className="flex items-center gap-2 mb-6">
            {issue.user?.image && (
              <Image src={issue.user.image} alt={issue.user.name} width={28} height={28} className="rounded-full" />
            )}
            <span className="text-xs text-gray-500">Reported by <strong>{issue.user?.name}</strong></span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleUpvote}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition
                ${upvoted ? 'bg-green-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-50'}`}
            >
              👍 {upvoteCount} Upvotes
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-green-50 transition"
            >
              🔗 Share
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-green-900 mb-4">💬 Comments ({comments.length})</h2>

          {session ? (
            <div className="flex gap-3 mb-6">
              <input
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-900"
                placeholder="Write a comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleComment()}
              />
              <button
                onClick={handleComment}
                className="px-4 py-2 bg-green-900 text-white rounded-xl text-sm font-medium hover:bg-green-800 transition"
              >
                Post
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-400 mb-4">Sign in to comment</p>
          )}

          <div className="space-y-4">
            {comments.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">No comments yet</p>
            )}
            {comments.map(c => (
              <div key={c.id} className="flex gap-3">
                {c.user?.image && (
                  <Image src={c.user.image} alt={c.user.name} width={32} height={32} className="rounded-full" />
                )}
                <div>
                  <p className="text-xs font-semibold text-green-900">{c.user?.name}</p>
                  <p className="text-sm text-gray-600">{c.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(c.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
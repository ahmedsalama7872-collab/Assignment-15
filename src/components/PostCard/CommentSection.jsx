import React, { useState } from 'react';
import dayjs from 'dayjs';
import EmojiPicker from "emoji-picker-react";
import { Image, Smile, SendHorizonal, X } from "lucide-react";

export default function CommentSection({
  post,
  user,
  commentsArray,
  commentsCount,
  commentAPI,
  setCommentAPI,
  handleAddComment,
  postText,
  setPostText,
  commentImage,
  handleImageChange,
  handleRemoveImage
}) {
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setPostText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className='border-t border-slate-200 bg-[#f7f8fa] px-4 py-4'>
      <div className='mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2'>
        <div className='flex items-center gap-2'>
          <p className='text-sm font-extrabold tracking-wide text-slate-700'>Comments</p>
          <span className='rounded-full bg-[#e7f3ff] px-2 py-0.5 text-[11px] font-bold text-[#1877f2]'>{commentsCount}</span>
        </div>
        <select className='rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none'>
          <option value="relevant">Most relevant</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className='space-y-2'>
        {commentsArray?.map((comment) => (
          <div key={comment._id} className='relative flex items-start gap-2'>
            <img src={comment.commentCreator.photo} alt="" className='mt-0.5 h-8 w-8 rounded-full object-cover' />
            <div className='min-w-0 flex-1'>
              <div className='relative inline-block max-w-full rounded-2xl bg-[#f0f2f5] px-3 py-2'>
                <p className='text-xs font-bold text-slate-900'>{comment.commentCreator.name}</p>
                <p className='text-xs text-slate-500'>@{comment.commentCreator.username} • {dayjs(comment.createdAt).fromNow()}</p>
                {comment.content && <p className='mt-1 whitespace-pre-wrap text-sm text-slate-800'>{comment.content}</p>}
                {comment.image && <img src={comment.image} alt="" className='mt-2 max-h-44 rounded-lg object-cover w-full' />}
              </div>
              <div className='mt-1.5 flex items-center gap-4 px-1'>
                <span className='text-xs font-semibold text-slate-400'>{dayjs(comment.createdAt).fromNow()}</span>
                <button className='text-xs font-semibold text-slate-500'>Like {comment.likes?.length || 0}</button>
                <button className='text-xs font-semibold text-slate-500 hover:text-[#1877f2]'>Reply</button>
              </div>
            </div>
          </div>
        ))}

        {commentsCount > 5 && commentsCount > commentsArray.length ? (
          <div className='pt-2 text-center'>
            <button 
              onClick={() => setCommentAPI(commentAPI + 5)} 
              className='rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 cursor-pointer'
            >
              View more comments
            </button>
          </div>
        ) : ''}
      </div>

      {/* Form لإضافة كومنت جديد */}
      <form onSubmit={handleAddComment} className='mt-3'>
        <div className='flex items-start gap-2'>
          <img src={user.photo} className='h-9 w-9 rounded-full object-cover' alt={user.name} />
          <div className='w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:bg-white'>
            <textarea 
              value={postText}
              onChange={(e) => setPostText(e.target.value)} 
              className='max-h-[140px] min-h-[40px] w-full resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-slate-500' 
              placeholder={`Comment as ${user.name}...`}
            ></textarea>
            
            {commentImage && (
              <div className='relative mt-2 w-full'>
                <img src={commentImage} className='max-h-36 w-full rounded-lg object-cover border border-slate-200' alt="Preview" />
                <button 
                  type="button"
                  onClick={handleRemoveImage} 
                  className='absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black cursor-pointer'
                >
                  <X className='w-4 h-4'/>
                </button>
              </div>
            )}

            <div className='mt-1 flex items-center justify-between'>
              <div className='relative flex items-center gap-1'>
                <label htmlFor={`imgInput-${post._id}`} className='inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-slate-500 hover:bg-slate-200 hover:text-emerald-600'>
                  <Image className='w-4 h-4'/>
                  <input type="file" accept='image/*' hidden id={`imgInput-${post._id}`} onChange={handleImageChange} />
                </label>
                
                <button 
                  type="button"
                  onClick={() => setShowEmoji(!showEmoji)} 
                  className='inline-flex items-center justify-center rounded-full p-2 text-slate-500 hover:bg-slate-200 hover:text-amber-500'
                >
                  <Smile className='w-4 h-4'/>
                </button>
                
                {showEmoji && (
                  <div className="absolute left-0 top-14 z-50">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>
              
              <button 
                type='submit'
                disabled={!postText.trim() && !commentImage}
                className='inline-flex cursor-pointer h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white transition hover:bg-[#166fe5] disabled:opacity-50'
              >
                <SendHorizonal className='w-4 h-4'/>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
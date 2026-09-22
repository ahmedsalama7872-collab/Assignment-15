import React from 'react';
import avatar from "../assets/default-profile.png";
import { Earth, MoreHorizontal, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

export default function PostCard() {
  return (
    <div className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm  mx-auto'>
      {/* Post Header */}
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <img src={avatar} className='w-11 h-11 rounded-full object-cover' alt="Ahmed Salama" />
          <div>
            <h3 className='font-bold text-sm text-gray-900'>Ahmed Salama</h3>
            <div className='flex items-center gap-1.5 text-xs text-gray-400 mt-0.5'>
              <span>@ahmedsalama7872</span>
              <span>•</span>
              <span>1d</span>
              <span>•</span>
              <div className='flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100 text-[11px] text-gray-600'>
                <Earth className='w-3 h-3' />
                <span>Public</span>
              </div>
            </div>
          </div>
        </div>
        <button className='text-gray-400 hover:text-gray-600 p-1'>
          <MoreHorizontal className='w-5 h-5' />
        </button>
      </div>

      {/* Post Content / Text */}
      <div className='mt-3 text-gray-800 text-sm font-medium'>
        <p>صل على النبي ❤️</p>
      </div>

      {/* Post Stats (Likes, Shares, Comments) */}
      <div className='flex items-center justify-between text-xs text-gray-500 mt-4 pt-3 border-t border-gray-50'>
        <div className='flex items-center gap-1.5'>
          <span className='bg-blue-600 text-white p-1 rounded-full text-[10px]'>
            <ThumbsUp className='w-3 h-3' />
          </span>
          <span className='font-medium text-gray-700'>2 likes</span>
        </div>
        <div className='flex items-center gap-3'>
          <span>0 shares</span>
          <span>•</span>
          <span>2 comments</span>
          <button className='text-blue-600 hover:underline font-medium ml-1'>View details</button>
        </div>
      </div>

      {/* Action Buttons (Like, Comment, Share) */}
      <div className='grid grid-cols-3 gap-1 py-1 my-2 border-y border-gray-50'>
        <button className='flex items-center justify-center gap-2 py-1.5 hover:bg-gray-50 rounded-xl text-gray-600 text-xs font-medium transition-colors'>
          <ThumbsUp className='w-4 h-4' />
          <span>Like</span>
        </button>
        <button className='flex items-center justify-center gap-2 py-1.5 hover:bg-gray-50 rounded-xl text-gray-600 text-xs font-medium transition-colors'>
          <MessageCircle className='w-4 h-4' />
          <span>Comment</span>
        </button>
        <button className='flex items-center justify-center gap-2 py-1.5 hover:bg-gray-50 rounded-xl text-gray-600 text-xs font-medium transition-colors'>
          <Share2 className='w-4 h-4' />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      <div className='bg-gray-50/70 p-3 rounded-2xl border border-gray-100/80 mt-3'>
        <span className='text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2'>
          TOP COMMENT
        </span>
        <div className='flex items-start gap-2.5'>
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces" 
            className='w-7 h-7 rounded-full object-cover mt-0.5' 
            alt="Abdelrahman" 
          />
          <div className='bg-white p-2.5 rounded-xl border border-gray-100 flex-1 shadow-2xs'>
            <h4 className='text-xs font-bold text-gray-900'>Abdelrahman</h4>
            <p className='text-xs text-gray-700 mt-0.5'>test</p>
          </div>
        </div>
        <button className='text-xs text-blue-600 font-semibold mt-2.5 hover:underline block'>
          View all comments
        </button>
      </div>
    </div>
  );
}
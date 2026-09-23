import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s",     
    s: '1s',         
    ss: '%ds',
    m: '1m',         
    mm: '%dm',      
    h: '1h',         
    hh: '%dh',       
    d: '1d',         
    dd: '%dd',      
    M: '1M',        
    MM: '%dM',      
    y: '1y',         
    yy: '%dy'        
  }
});
import { Earth, MoreHorizontal, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

export default function PostCard({post}) {
  const {body,image,privacy,user:{name,username,photo},createdAt,likes,sharesCount,commentsCount} = post
  return (
    <div className='bg-white  rounded-2xl border border-gray-100 shadow-sm  mx-auto'>
      {/* Post Header */}
      <div className='flex p-5 pb-0 items-start justify-between'>
        <div className='flex items-center gap-3'>
          <img src={photo} className='w-11 h-11 rounded-full object-cover' alt="Ahmed Salama" />
          <div>
            <h3 className='font-bold text-sm text-gray-900'>{name}</h3>
            <div className='flex items-center gap-1.5 text-xs text-gray-400 mt-0.5'>
              <span>@{username}</span>
              <span>•</span>
              <span>{dayjs(createdAt).fromNow()}</span>
              <span>•</span>
              <div className='flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100 text-[11px] text-gray-600'>
                <Earth className='w-3 h-3' />
                <span>{privacy}</span>
              </div>
            </div>
          </div>
        </div>
        <button className='text-gray-400 hover:text-gray-600 p-1'>
          <MoreHorizontal className='w-5 h-5' />
        </button>
      </div>

      <div className='mt-3 text-gray-800 text-sm px-5 mb-2 font-medium'>
        <p>{body}</p>
      </div>
<div className=' '>
  <img src={image} className='max-h-[620px] w-full object-cover' alt="" />
</div>
      <div className='flex px-5 items-center justify-between text-xs text-gray-500 mt-4 pt-3 '>
        <div className='flex items-center gap-1.5'>
          <span className='bg-blue-600 text-white p-1 rounded-full text-[10px]'>
            <ThumbsUp className='w-3 h-3' />
          </span>
          <span className='font-medium text-gray-700'>{likes.length} likes</span>
        </div>
        <div className='flex items-center gap-3'>
          <span>{sharesCount} shares</span>
          <span>•</span>
          <span>{commentsCount} comments</span>
          <button className='text-blue-600 hover:underline font-medium ml-1'>View details</button>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-1 py-1 my-2 mx-5 border-t border-gray-200'>
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

      {post.topComment?<div className='m-5 bg-gray-50/70 p-3 rounded-2xl border border-gray-100/80 mt-3'>
        <span className='text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2'>
          TOP COMMENT
        </span>
        <div className='flex items-start gap-2.5'>
          <img 
            src={post.topComment.commentCreator.photo} 
            className='w-7 h-7 rounded-full object-cover mt-0.5' 
            alt="Abdelrahman" 
          />
          <div className='bg-white p-2.5 rounded-xl border border-gray-100 flex-1 shadow-2xs'>
            <h4 className='text-xs font-bold text-gray-900'>{post.topComment?.commentCreator.name}</h4>
            <p className='text-xs text-gray-700 mt-0.5'>{post.topComment?.content}</p>
          </div>
        </div>
        <button className='text-xs text-blue-600 font-semibold mt-2.5 hover:underline block'>
          View all comments
        </button>
      </div>:''}
    </div>
  );
}
import React from 'react';
import { SquareArrowOutUpRight } from "lucide-react";

export default function SharedPostContent({ sharedPost }) {
  if (!sharedPost) return null;

  return (
    <div className='overflow-hidden rounded-xl border border-slate-200 bg-slate-50 mx-4'>
      <div className='flex p-5 pb-0 items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img src={sharedPost.user?.photo} className='w-8 h-8 rounded-full object-cover' alt={sharedPost.user?.name} />
          <div>
            <h3 className='font-bold text-sm text-gray-900'>{sharedPost.user?.name}</h3>
            <div className='flex items-center gap-1.5 text-xs text-gray-400 mt-0.5'>
              <span>@{sharedPost.user?.username}</span>
            </div>
          </div>
        </div>
        <button className='text-blue-600 hover:underline text-xs font-medium ml-1 cursor-pointer flex items-center gap-1 px-2 py-1 hover:bg-[#E7F3FF] rounded-[10px]'>
          Original Post <SquareArrowOutUpRight className='w-3 h-3' />
        </button>
      </div>
      
      <div className='mt-3 text-gray-800 text-sm px-5 mb-2 font-medium'>
        <p>{sharedPost.body}</p>
      </div>

      {sharedPost.image && (
        <div>
          <img src={sharedPost.image} className='max-h-[620px] w-full object-cover' alt="" />
        </div>
      )}
    </div>
  );
}
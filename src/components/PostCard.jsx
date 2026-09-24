import React, { useState, useContext } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { UserContext } from './UserContext.jsx';

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

import { Earth, MoreHorizontal, ThumbsUp, Repeat2, MessageCircle, ChevronDown, SquareArrowOutUpRight, Share2, Bookmark, Pencil, Trash2, User, Lock } from "lucide-react";
import { Dropdown, DropdownItem } from "flowbite-react";
import axios from 'axios';

export default function PostCard({ post }) {
  const { user } = useContext(UserContext);
  
  const { body, image, privacy, createdAt, sharesCount = 0, commentsCount = 0 } = post;

  const [likesArray, setLikesArray] = useState(post.likes || []);

  const isLiked = likesArray.includes(user?._id);

  async function handleLike() {

    try {
     
      setLikesArray(prevLikes => {
        if (prevLikes.includes(user._id)) {
          return prevLikes.filter(id => id !== user._id);
        } else {
          return [...prevLikes, user._id]; 
        }
      });

      await axios.put(
        `https://route-posts.routemisr.com/posts/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
          }
        }
      );
    } catch (error) {
      console.log("Error liking post:", error.response?.data || error.message);
      setLikesArray(post.likes || []);
    }
  }

  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm mx-auto'>
      {/* Post Header */}
      <div className='flex p-5 pb-0 items-start justify-between'>
        <div className='flex items-center gap-3'>
          <img src={post?.user?.photo} className='w-11 h-11 rounded-full object-cover' alt={post?.user?.name} />
          <div>
            <h3 className='font-bold text-sm text-gray-900'>{post?.user?.name}</h3>
            <div className='flex items-center gap-1.5 text-xs text-gray-400 mt-0.5'>
              <span>@{post?.user?.username}</span>
              <span>•</span>
              <span>{dayjs(createdAt).fromNow()}</span>
              <span>•</span>
              <div className="w-fit rounded-full">
                <Dropdown
                  label=""
                  renderTrigger={() => (
                    <div className="flex items-center gap-1.5 rounded-full bg-[#F1F5F9] px-3 py-1 cursor-pointer hover:bg-slate-200 transition">
                      {privacy === "public" ? (
                        <Earth className="h-3.5 w-3.5 text-gray-600" />
                      ) : privacy === "followers" ? (
                        <User className="h-3.5 w-3.5 text-gray-600" />
                      ) : (
                        <Lock className="h-3.5 w-3.5 text-gray-600" />
                      )}
                      <span className="text-xs font-medium text-black capitalize">
                        {privacy === "public" ? "Public" : privacy === "followers" ? "Followers" : "Only Me"}
                      </span>
                      <ChevronDown className='w-3 h-3 text-black'/>
                    </div>
                  )}
                  dismissOnClick={true}
                  className="rounded-2xl shadow-lg border border-gray-100 p-1 w-40"
                  placement="bottom-start"
                >
                  <DropdownItem className="flex items-center gap-2.5 py-2 px-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100">
                    <Earth className="w-4 h-4 text-gray-500" />
                    <span>Public</span>
                  </DropdownItem>
                  <DropdownItem className="flex items-center gap-2.5 py-2 px-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>Followers</span>
                  </DropdownItem>
                  <DropdownItem className="flex items-center gap-2.5 py-2 px-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100">
                    <Lock className="w-4 h-4 text-gray-500" />
                    <span>Only Me</span>
                  </DropdownItem>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        <Dropdown 
          label="" 
          renderTrigger={() => (
            <button className='text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition'>
              <MoreHorizontal className='w-5 h-5' />
            </button>
          )} 
          dismissOnClick={false}
          className="rounded-2xl shadow-lg border border-gray-100 p-1 w-48"
          placement="bottom-end"
        >
          <DropdownItem className="flex items-center gap-2.5 py-2 px-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100">
            <Bookmark className='w-4 h-4 text-gray-500' />
            <span>Save post</span>
          </DropdownItem>
          <DropdownItem className="flex items-center gap-2.5 py-2 px-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100">
            <Pencil className='w-4 h-4 text-gray-500' />
            <span>Edit post</span>
          </DropdownItem>
          <DropdownItem className="flex items-center gap-2.5 py-2 px-3 text-red-600 font-medium rounded-xl hover:bg-red-50">
            <Trash2 className='w-4 h-4 text-red-500' />
            <span>Delete post</span>
          </DropdownItem>
        </Dropdown>
      </div>

      <div className='mt-3 text-gray-800 text-sm px-5 mb-2 font-medium'>
        <p>{body}</p>
        {post.bookmarked ? <div className='mt-3 inline-flex items-center gap-1 rounded-full bg-[#e7f3ff] px-2.5 py-1 text-[11px] font-bold text-[#1877f2]'><Bookmark className='w-3 h-3'/> Saved</div> : ''}
      </div>

      <div>
        {image && <img src={image} className='max-h-[620px] w-full object-cover' alt="" />}
        {post.isShare && post.sharedPost ? (
          <div className='overflow-hidden rounded-xl border border-slate-200 bg-slate-50 mx-4'>
            <div className='flex p-5 pb-0 items-center justify-between'>
              <div className='flex items-center gap-3'>
                <img src={post.sharedPost.user?.photo} className='w-8 h-8 rounded-full object-cover' alt={post.sharedPost.user?.name} />
                <div>
                  <h3 className='font-bold text-sm text-gray-900'>{post.sharedPost.user?.name}</h3>
                  <div className='flex items-center gap-1.5 text-xs text-gray-400 mt-0.5'>
                    <span>@{post.sharedPost.user?.username}</span>
                  </div>
                </div>
              </div>
              <button className='text-blue-600 hover:underline text-xs font-medium ml-1 cursor-pointer flex items-center gap-1 px-2 py-1 hover:bg-[#E7F3FF] rounded-[10px]'>
                Original Post <SquareArrowOutUpRight className='w-3 h-3' />
              </button>
            </div>
            
            <div className='mt-3 text-gray-800 text-sm px-5 mb-2 font-medium'>
              <p>{post.sharedPost.body}</p>
            </div>

            {post.sharedPost.image && (
              <div>
                <img src={post.sharedPost.image} className='max-h-[620px] w-full object-cover' alt="" />
              </div>
            )}
          </div>
        ) : ''}
      </div>

      <div className='flex px-5 items-center justify-between text-xs text-gray-500 mt-4 pt-3'>
        <div className='flex items-center gap-1.5'>
          <span className='bg-blue-600 text-white p-1 rounded-full text-[10px]'>
            <ThumbsUp className='w-3 h-3' />
          </span>
          {/* عرض طول المصفوفة الحقيقي المحدث */}
          <span className='font-medium text-gray-700'>{likesArray.length} likes</span>
        </div>
        <div className='flex items-center gap-3'>
          <span className='flex items-center gap-1'><Repeat2 className='w-3 h-3' /> {sharesCount} shares</span>
          <span>•</span>
          <span>{commentsCount} comments</span>
          <button className='text-blue-600 hover:underline font-medium ml-1'>View details</button>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-1 py-1 my-2 mx-5 border-t border-gray-200'>
        <button 
          onClick={handleLike} 
          className={`flex items-center justify-center gap-2 py-1.5 hover:bg-gray-50 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            isLiked ? 'bg-[#e7f3ff] text-[#1877f2]' : 'text-gray-600'
          }`}
        >
          <ThumbsUp className='w-4 h-4' />
          <span>Like</span>
        </button>
        <button className='flex items-center justify-center gap-2 py-1.5 hover:bg-gray-50 rounded-xl text-gray-600 text-xs font-medium transition-colors cursor-pointer'>
          <MessageCircle className='w-4 h-4' />
          <span>Comment</span>
        </button>
        <button className='flex items-center justify-center gap-2 py-1.5 hover:bg-gray-50 rounded-xl text-gray-600 text-xs font-medium transition-colors cursor-pointer'>
          <Share2 className='w-4 h-4' />
          <span>Share</span>
        </button>
      </div>

      {post.topComment ? (
        <div className='m-5 bg-gray-50/70 p-3 rounded-2xl border border-gray-100/80 mt-3'>
          <span className='text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2'>
            TOP COMMENT
          </span>
          <div className='flex items-start gap-2.5'>
            <img 
              src={post.topComment.commentCreator?.photo} 
              className='w-7 h-7 rounded-full object-cover mt-0.5' 
              alt="Commenter" 
            />
            <div className='bg-white p-2.5 rounded-xl border border-gray-100 flex-1 shadow-2xs'>
              <h4 className='text-xs font-bold text-gray-900'>{post.topComment?.commentCreator?.name}</h4>
              <p className='text-xs text-gray-700 mt-0.5'>{post.topComment?.content}</p>
              {post.topComment?.image ? <img src={post.topComment?.image} alt="" className='w-full object-cover max-h-44 mt-2 rounded-lg'/> : ''}
            </div>
          </div>
          <button className='text-xs text-blue-600 font-semibold mt-2.5 hover:underline block'>
            View all comments
          </button>
        </div>
      ) : ''}
    </div>
  );
}
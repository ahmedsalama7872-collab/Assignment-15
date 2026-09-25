import React, { useState, useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { UserContext } from '../UserContext.jsx';
import { ThumbsUp, Repeat2, MessageCircle, Share2, Bookmark } from "lucide-react";
import axios from 'axios';

// استيراد الكومباوننتس الفرعية
import PostHeader from './PostHeader.jsx';
import SharedPostContent from './SharedPostContent.jsx';
import CommentSection from './CommentSection.jsx';
import ShareModal from './ShareModal.jsx';

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

export default function PostCard({ post }) {
  const [openModal, setOpenModal] = useState(false);
  const [shareBody, setShareBody] = useState(""); 
  const [commentsOpenned, setCommentsOpenned] = useState(false); 
  const [commentAPI, setCommentAPI] = useState(5); 

  const [postText, setPostText] = useState("");
  const [commentImage, setCommentImage] = useState(null);
  const [commentImageFile, setCommentImageFile] = useState(null);

  const [sharesCount, setSharesCount] = useState(post.sharesCount || 0); 
  const { user } = useContext(UserContext);
  const { body, image, commentsCount = 0 } = post;

  const [likesArray, setLikesArray] = useState(post.likes || []);
  const [commentsArray, setCommentsArray] = useState([]);
  const isLiked = likesArray.includes(user?._id);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCommentImageFile(file);
      setCommentImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setCommentImage(null);
    setCommentImageFile(null);
  };

  useEffect(() => {
    if (commentsOpenned) {
      getComments();
    }
  }, [commentAPI, commentsOpenned]);

  async function handleLike() {
    try {
      setLikesArray(prev => prev.includes(user._id) ? prev.filter(id => id !== user._id) : [...prev, user._id]);
      await axios.put(`https://route-posts.routemisr.com/posts/${post._id}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
      });
    } catch (error) {
      setLikesArray(post.likes || []);
    }
  }

  async function getComments() {
    try {
      const { data } = await axios.get(`https://route-posts.routemisr.com/posts/${post._id}/comments?page=1&limit=${commentAPI}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
      });
      setCommentsArray(data.data.comments || data.comments || []);
    } catch (error) {
      console.log("Error getting comments post:", error.response?.data || error.message);
    }
  }

  async function handleAddComment(e) {
    e.preventDefault();
    if (!postText.trim() && !commentImageFile) return;

    try {
      const formData = new FormData();
      if (postText.trim()) formData.append("content", postText);
      if (commentImageFile) formData.append("image", commentImageFile);

      await axios.post(`https://route-posts.routemisr.com/posts/${post._id}/comments`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
      });

      setPostText("");
      handleRemoveImage();
      getComments();
    } catch (error) {
      console.log("Error adding comment:", error.response?.data || error.message);
    }
  }

  async function handleShareSubmit() {
    try {
      setSharesCount(prev => prev + 1);
      setOpenModal(false);
      await axios.post(`https://route-posts.routemisr.com/posts/${post._id}/share`, { 
        body: shareBody.trim() === "" ? " " : shareBody 
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
      });
      setShareBody(""); 
    } catch (error) {
      setSharesCount(prev => prev - 1);
    }
  }

  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm mx-auto'>
      {/* 1. Header */}
      <PostHeader post={post} />

      {/* Post Body Text */}
      <div className='mt-3 text-gray-800 text-sm px-5 mb-2 font-medium'>
        <p>{body!='updated profile picture.'?body:''}</p>
        {post.bookmarked && <div className='mt-3 inline-flex items-center gap-1 rounded-full bg-[#e7f3ff] px-2.5 py-1 text-[11px] font-bold text-[#1877f2]'><Bookmark className='w-3 h-3'/> Saved</div>}
      </div>

      {/* Post Image or Shared Content */}
      <div>
        {image && <img src={image} className='max-h-[620px] w-full object-cover' alt="" />}
        {post.isShare && post.sharedPost ? <SharedPostContent sharedPost={post.sharedPost} /> : ''}
      </div>

      {/* Post Stats Bar (مع زرار View details) */}
      <div className='flex px-5 items-center justify-between text-xs text-gray-500 mt-4 pt-3'>
        <div className='flex items-center gap-1.5'>
          <span className='bg-blue-600 text-white p-1 rounded-full text-[10px]'>
            <ThumbsUp className='w-3 h-3' />
          </span>
          <span className='font-medium text-gray-700'>{likesArray.length} likes</span>
        </div>
        <div className='flex items-center gap-3'>
          <span className='flex items-center gap-1'><Repeat2 className='w-3 h-3' /> {sharesCount} shares</span>
          <span>•</span>
          <span>{commentsCount} comments</span>
          <button className='text-blue-600 hover:underline font-medium ml-1 cursor-pointer'>View details</button>
        </div>
      </div>

      {/* Action Buttons (Like, Comment, Share) */}
      <div className='grid grid-cols-3 gap-1 py-1 my-2 mx-5 border-t border-gray-200'>
        <button 
          onClick={handleLike} 
          className={`flex items-center justify-center gap-2 py-1.5 hover:bg-gray-50 rounded-xl text-xs font-medium transition cursor-pointer ${
            isLiked ? 'bg-[#e7f3ff] text-[#1877f2]' : 'text-gray-600'
          }`}
        >
          <ThumbsUp className='w-4 h-4' />
          <span>Like</span>
        </button>
        <button onClick={() => { setCommentsOpenned(!commentsOpenned); getComments(); }} className='flex items-center justify-center gap-2 py-1.5 hover:bg-gray-50 rounded-xl text-gray-600 text-xs font-medium cursor-pointer'>
          <MessageCircle className='w-4 h-4' />
          <span>Comment</span>
        </button>
        <button onClick={() => setOpenModal(true)} className='flex items-center justify-center gap-2 py-1.5 hover:bg-gray-50 rounded-xl text-gray-600 text-xs font-medium cursor-pointer'>
          <Share2 className='w-4 h-4' />
          <span>Share</span>
        </button>
      </div>

      {/* Top Comment (يظهر فقط لو الـ topComment موجود وقسم التعليقات مغلق) */}
      {post.topComment && !commentsOpenned ? (
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
          <button onClick={() => { setCommentsOpenned(!commentsOpenned); getComments(); }} className='cursor-pointer text-xs text-blue-600 font-semibold mt-2.5 hover:underline block'>
            View all comments
          </button>
        </div>
      ) : ''}

      {/* Comments Section */}
      {commentsOpenned && (
        <CommentSection 
          post={post}
          user={user}
          commentsArray={commentsArray}
          commentsCount={commentsCount}
          commentAPI={commentAPI}
          setCommentAPI={setCommentAPI}
          handleAddComment={handleAddComment}
          postText={postText}
          setPostText={setPostText}
          commentImage={commentImage}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
        />
      )}

      {/* Share Modal */}
      <ShareModal 
        openModal={openModal} 
        setOpenModal={setOpenModal} 
        shareBody={shareBody} 
        setShareBody={setShareBody} 
        handleShareSubmit={handleShareSubmit} 
        post={post} 
      />
    </div>
  );
}
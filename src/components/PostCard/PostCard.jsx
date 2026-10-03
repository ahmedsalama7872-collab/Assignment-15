import React, { useState, useContext, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';
import { ThumbsUp, Repeat2, MessageCircle, Share2, Bookmark, Users } from "lucide-react";
import axios from 'axios';
import PostHeader from './PostHeader.jsx';
import SharedPostContent from './SharedPostContent.jsx';
import CommentSection from './CommentSection.jsx';
import ShareModal from './ShareModal.jsx';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';

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

export default function PostCard({ post,setPosts,refetch }) {
  const [openModal, setOpenModal] = useState(false);
const [saved, setSaved] = useState(post.bookmarked || false);
  const [commentsOpenned, setCommentsOpenned] = useState(false); 
  const [commentAPI, setCommentAPI] = useState(5); 
const [shareBody, setShareBody] = useState("");
  const [postText, setPostText] = useState("");
  const [commentImage, setCommentImage] = useState(null);
  const [commentImageFile, setCommentImageFile] = useState(null);

  const [sharesCount, setSharesCount] = useState(post.sharesCount || 0); 
  const { user } = useContext(UserContext);
  const { body, image, commentsCount = 0 } = post;

  const [likesArray, setLikesArray] = useState(post.likes || []);
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

  async function getLikes(id) {
    const {data} = await axios.get(`https://route-posts.routemisr.com/users/${id}/profile`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}}) 
     console.log("LIKE USER RESPONSE:", data);
    return data.data.user
  }

const likesQueries = useQueries({
  queries: likesArray.map((id) => ({
    queryKey: ["likeUser", id],
    queryFn: () => getLikes(id),
    enabled: false
  })),
});


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


  const {refetch:refetchComments,data} = useQuery({
    queryKey:["getComments",post._id,commentAPI],
    queryFn:getComments,
    enabled:false
  })

const commentsArray = data || [];

  async function getComments() {
    
      const { data } = await axios.get(`https://route-posts.routemisr.com/posts/${post._id}/comments?page=1&limit=${commentAPI}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
      });
      
    
     
   return data.data.comments
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
      refetchComments()
    } catch (error) {
      console.log("Error adding comment:", error.response?.data || error.message);
    }
  }
const shareMutation = useMutation({
  mutationKey:["share"],
  mutationFn:async (shareBody)=>{
    const text = typeof shareBody === "string" ? shareBody : "";
    await axios.post(`https://route-posts.routemisr.com/posts/${post._id}/share`, { 
        body: text.trim() === "" ? " " : text 
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
      });
  },
    onSuccess: () => {
    setSharesCount((prev) => prev + 1);
    setOpenModal(false);
    setShareBody("");
    
  },
  onError:(error)=>{
    console.log(error.message);
    
  }
})
  function handleShareSubmit(shareBody) {
    shareMutation.mutate(shareBody)
  }
  async function handleSave() {
    try {
      
      
      await axios.put(`https://route-posts.routemisr.com/posts/${post._id}/bookmark`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
      });
      const newSaved = !saved
       setSaved(newSaved)
       if (!newSaved && setPosts){
        setPosts((posts)=>posts.filter(p=>((p._id || p.id) !== (post._id || post.id))))
       }
    } catch (error) {
      console.log(error);
      
    }
  }






  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm mx-auto'>
      
      <PostHeader refetch={refetch} post={post} handleSave={handleSave} saved={saved}/>

      
      <div className='mt-3 text-gray-800 text-sm px-5 mb-2 font-medium'>
        <p>{body!='updated profile picture.'&&body!='updated cover photo.'?body:''}</p>
        { saved && <div className='mt-3 inline-flex items-center gap-1 rounded-full bg-[#e7f3ff] px-2.5 py-1 text-[11px] font-bold text-[#1877f2]'><Bookmark className='w-3 h-3'/> Saved</div>}
      </div>

      
      <div>
        {image && <img src={image} className='max-h-[620px] w-full object-cover' alt="" />}
        {post.isShare && post.sharedPost ? <SharedPostContent sharedPost={post.sharedPost} post={post} /> : ''}
      </div>

      
      <div className='flex px-5 items-center justify-between text-xs text-gray-500 mt-4 pt-3'>
        <div className='flex items-center gap-1.5'>
          <span className='bg-blue-600 text-white p-1 rounded-full text-[10px]'>
            <ThumbsUp className='w-3 h-3' />
          </span>


  
  




      <Dialog>
     <DialogTrigger
    onClick={() => likesQueries.forEach((query) => query.refetch())}
    className="border-0 text-[14px] hover:bg-transparent hover:text-blue-500 cursor-pointer hover:underline"
  >
    {likesArray.length} likes
  </DialogTrigger>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle className={'flex gap-2'}> <Users className='w-4 h-4 text-blue-500'/> People who reacted</DialogTitle>
          
        </DialogHeader>
       
          
          <div>
          

          
 {likesQueries.map((query) => {
  const likeUser = query.data;

  if (!likeUser) return null;

  return (
  
     <Link to={`/profile/${likeUser._id}`} key={likeUser._id} className='flex mt-2 items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-100'>
           <img src={likeUser.photo} className='h-10 w-10 rounded-full object-cover' alt="" />
           <div className='min-w-0'>
<p className='truncate text-sm font-bold text-slate-900'>{likeUser.name}</p>
<p className='truncate text-xs text-slate-500'>{likeUser.username}</p>
           </div>
           </Link>
  );
})}
   
          </div>
          
      
       
              </DialogContent>
      </Dialog>
    
  

        </div>
        <div className='flex items-center gap-3'>
          <span className='flex items-center gap-1'><Repeat2 className='w-3 h-3' /> {sharesCount} shares</span>
          <span>•</span>
          <span>{commentsCount} comments</span>
<Link
  to={`/PostPreview/${post._id}`}
  className="text-blue-600 hover:underline font-medium ml-1 cursor-pointer"
>
  View details
</Link>        </div>
      </div>

      
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
        <button onClick={() => { setCommentsOpenned(!commentsOpenned);refetchComments(); }} className='flex items-center justify-center gap-2 py-1.5 hover:bg-gray-50 rounded-xl text-gray-600 text-xs font-medium cursor-pointer'>
          <MessageCircle className='w-4 h-4' />
          <span>Comment</span>
        </button>
        <button onClick={() => setOpenModal(true)} className='flex items-center justify-center gap-2 py-1.5 hover:bg-gray-50 rounded-xl text-gray-600 text-xs font-medium cursor-pointer'>
          <Share2 className='w-4 h-4' />
          <span>Share</span>
        </button>
      </div>

      {post.topComment && !commentsOpenned ? (
        <div className='m-5 bg-gray-50/70 p-3 rounded-2xl border border-gray-100/80 mt-3'>
          <span className='text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2'>
            TOP COMMENT
          </span>
          <div className='flex items-start gap-2.5'>
            <Link to={`/profile/${post.topComment.commentCreator._id}`}>
            <img 
              src={post.topComment.commentCreator?.photo} 
              className='w-7 h-7 rounded-full object-cover mt-0.5' 
              alt="Commenter" 
              />
              </Link>
            <div className='bg-white p-2.5 rounded-xl border border-gray-100 flex-1 shadow-2xs'>
             <Link to={`/profile/${post.topComment.commentCreator._id}`}>
              <h4 className='text-xs font-bold text-gray-900'>{post.topComment?.commentCreator?.name}</h4>
             </Link>
              <p className='text-xs text-gray-700 mt-0.5'>{post.topComment?.content}</p>
              {post.topComment?.image ? <img src={post.topComment?.image} alt="" className='w-full object-cover max-h-44 mt-2 rounded-lg'/> : ''}
            </div>
          </div>
          <button onClick={() => { setCommentsOpenned(!commentsOpenned); refetchComments(); }} className='cursor-pointer text-xs text-blue-600 font-semibold mt-2.5 hover:underline block'>
            View all comments
          </button>
        </div>
      ) : ''}

      
      {commentsOpenned && (
        <CommentSection
        refetchComments={refetchComments} 
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

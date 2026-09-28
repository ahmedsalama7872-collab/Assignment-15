import { useEffect, useState } from 'react';
import axios from 'axios';
import { Check, UserPlus } from 'lucide-react';

export default function Follow({userID,setProfile,profile,refetch}) {

const [isFollowing,setIsFollowing]= useState()



  async function handleFollow() {
    
      const { data } = await axios.put(
        `https://route-posts.routemisr.com/users/${userID}/follow`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );
      
      console.log("Followed successfully:", data);
      setIsFollowing(prev => !prev); // عكس الحالة مثلاً
      refetch()
      return true;
    
   
  }
  async function isFollow() {
    
      const { data } = await axios.get(
        `https://route-posts.routemisr.com//users/${userID}/profile`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );
      
     setIsFollowing(data.data.isFollowing)
  
  }
  useEffect(()=>{
    isFollow()
  },[])
  return (<>

                {(!profile)?  <button onClick={()=>handleFollow()} className={`flex items-center gap-1 text-xs cursor-pointer ${!isFollowing?'bg-[#E7F3FF] text-[#1877f2] hover:bg-[#d8ebff]':'bg-white text-[#1877f2]'} font-medium px-3 py-1.5 rounded-xl transition-colors flex flex-shrink-0`}>
                  {!isFollowing?<span className='flex gap-1'><UserPlus className="w-3.5 h-3.5" /> Follow</span>:<span className='flex gap-1'><Check className='w-4 h-4'/> Followed</span>}
                </button>:<button onClick={()=>handleFollow()} className={`inline-flex cursor-pointer w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-extrabold transition sm:w-auto ${!isFollowing?'bg-[#1877f2] text-white hover:bg-[#166fe5]':'bg-white text-[#1877f2]'}`}>{!isFollowing?<span className='flex gap-1 items-center'><UserPlus className='w-4 h-4'/>Follow</span>:<span className='items-center flex gap-1'><Check className='w-4 h-4'/>Following</span>}</button>}
  </>
  );
}
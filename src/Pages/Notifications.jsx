import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import NavbarCom from "../components/NavbarCom";
import { Check, CheckCheck, MessageCircle, Heart, UserPlus, Share2 } from "lucide-react";
import avatar from "../assets/default-profile.png";
import axios from "axios";
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
export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
const [unread,setUnread]=useState(false)
const [counter,setCounter]=useState(0)
  async function getNotifications() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/notifications?${unread?'unread=false&':''}limit=40`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        }
      );
      setNotifications(data.data?.notifications || []);
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  }
  async function getNotCount() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/notifications/unread-count`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        }
      );
      setCounter(data.data?.unreadCount)
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  }

  useEffect(() => {
    getNotifications();
    getNotCount()
  }, [unread]);

  // دالة لتحديد الأيقونة بناءً على نوع الإشعار
  const getNotificationIcon = (type) => {
    switch (type) {
      case "comment_post":
        return <MessageCircle className="w-4 h-4" />;
      case "like_post":
        return <Heart className="w-4 h-4 text-red-500 fill-red-500" />;
      case "follow_user":
        return <UserPlus className="w-4 h-4 text-blue-500" />;
      case "share_post":
        return <Share2 className="w-4 h-4 text-green-500" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  // دالة لتنسيق النص المناسب لكل إشعار
  const getNotificationText = (type) => {
    switch (type) {
      case "comment_post":
        return "commented on your post";
      case "like_post":
        return "liked your post";
      case "follow_user":
        return "followed you";
      case "share_post":
        return "shared your post";
      default:
        return "interacted with you";
    }
  };

  return (
    <div>
      <NavbarCom />

      <div className="mx-auto max-w-7xl py-4">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                  Notifications
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Realtime updates for likes, comments, shares, and follows.
                </p>
              </div>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                <CheckCheck className="w-4 h-4" /> mark all as read
              </button>
            </div>
            <div className="flex mt-6 gap-4 items-center">
              <button onClick={()=>setUnread(false)} className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${!unread?' bg-[#1877f2] text-white':' bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                All
              </button>
              <button onClick={()=>setUnread(true)} className={`rounded-full flex gap-2 px-4 py-1.5 text-sm font-bold transition ${unread?' bg-[#1877f2] text-white':' bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                Unread
                <span className={`rounded-full px-2 ${unread?'bg-[#5299F5] text-white':'bg-white text-[#5299F5]'} `} >{counter}</span>
              </button>
            </div>
          </div>

          {/* notif cards */}
          <div className="space-y-2 p-3 sm:p-4">
            {notifications.map((no) => {
              // حساب وقت بسيط أو استخدام القيمة المتاحة (يمكن تحسينها لاحقاً)
            

              return (
                <div
                  key={no._id}
                  className={`group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4 border-slate-200 ${no.isRead?'bg-white  hover:bg-slate-50':'bg-[#edf4ff]'}`}
                >
                  <div className="relative shrink-0">
                    <button className="block cursor-pointer">
                      <img
                        src={no.actor?.photo || avatar}
                        className="h-11 w-11 rounded-full object-cover"
                        alt={no.actor?.name || "User"}
                      />
                    </button>
                    <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white text-[#1877f2]">
                      {getNotificationIcon(no.type)}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                      <p className="text-sm leading-6 text-slate-800">
                        <button className="font-extrabold hover:text-[#1877f2] hover:underline">
                          {no.actor?.name}{" "}
                        </button>{" "}
                        {getNotificationText(no.type)}
                      </p>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-xs font-semibold text-slate-500">
                          {dayjs(no.createdAt).fromNow()}
                        </span>
                      </div>
                    </div>

                    {/* لو فيه محتوى نصي إضافي زي التعليق يظهر هنا */}
                    {no.entity?.body && (
                      <p className="mt-0.5 text-sm text-slate-600">
                        {no.entity.body}
                      </p>
                    )}

                    <div className="mt-2 flex items-center gap-2">
                      {no.isRead ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                          <Check className="w-4 h-4" /> Read
                        </span>
                      ) : (
                        <button className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-bold text-[#1877f2] ring-1 ring-[#dbeafe] transition hover:bg-[#e7f3ff]">
                          <Check className="w-3 h-3"/> Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
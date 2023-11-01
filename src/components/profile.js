import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAppContext } from '../appContext';
import { auth, db, storage } from "../config";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const navigate = useNavigate();

  const { currentUserUid } = useAppContext();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const userPostsQuery = query(postsCollection, where('senderId', '==', currentUserUid));
        const querySnapshot = await getDocs(userPostsQuery);

        const userPostsData = [];
        querySnapshot.forEach((doc) => {
          userPostsData.push(doc.data());
        });

        setUserPosts(userPostsData);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [currentUserUid]);
   
  const home=()=>{
    navigate("/main");
  }

  return (
    <div>
        <nav className='fixed top-0 w-full p-2'><button className='text-blue-500 font-medium text-lg ' onClick={home}>Home</button></nav>
        <div className='text-center text-white font-semibold text-2xl fixed top-12 w-full'>
          My Profile
        </div>
      <ul className=' flex gap-10 container w-96 mt-28 ml-7'>
        {userPosts.map((post, index) => (
        <div className='flex-col'>
          <img style={{height:"150px"}} src={post.pictureURL} alt="Post" />
          <li className='text-white' key={index}>{post.text}</li>
        </div>
        ))}
      </ul>
    </div>
  );
};

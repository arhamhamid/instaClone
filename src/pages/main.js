import React from "react";
import "./main.css";
import { useAppContext } from "../appContext";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../config";
import { MyModal } from "../components/modal";
import { collection, query, where, getDocs, doc, addDoc, updateDoc } from 'firebase/firestore';
import { FaHeart } from "react-icons/fa";

export const Main = () => {
  const navigate = useNavigate();
  const {currentUserUid,setCurrentUserUid,currentUserName,setCurrentUserName,} = useAppContext();
  const [posts, setPosts] = useState([]);


  const logout = () => {
    signOut(auth);
    navigate("/");
  };


  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentUserName(user?.displayName);
      setCurrentUserUid(user?.uid);
    }

    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const querySnapshot = await getDocs(postsCollection);

        const postsData = [];
        querySnapshot.forEach((doc) => {
          postsData.push(doc.data());
        });

        setPosts(postsData);
        console.log("postData",postsData)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);
  console.log(currentUserUid);
  console.log(currentUserName);

  const profile = ()=>{
    navigate("/profile");
  }
  
  return (
    <div>
      <nav className="fixed top-0 w-full p-2 font-bold text-2xl bg-orange-200">
    <div className="flex justify-between">
      <div className="">{currentUserName}</div>
      <div className="">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  </nav>

  <div className="text-gray-50 fixed top-16 w-full flex justify-center gap-4 text-2xl font-semibold">
    <MyModal />
    <button className="text-gray-50" onClick={profile}>Profile</button>
  </div>
    <ul className="container w-96 mx-auto mt-28 ">
      {posts.map((post, index) => ( 
      <Card post={post} index={index} currentUserUid={currentUserUid} />

      ))}
    </ul>
  </div>

  );
};


const Card=({post,index,currentUserUid})=>{
  const [isLike,setIsLike]=useState(false);
  const [likeCount, setLikeCount] = useState(post.like.length);

  const likePost=()=>{
    setIsLike(!isLike)

  }
  return(
    <li key={index} className="mb-5">
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
      <img src={post.pictureURL} alt="Post" className="h-full w-full object-cover rounded-lg" />
      <p className="text-lg mt-2 ">{post.text}</p>
      <button onClick={likePost}  
      className={`mt-2  ${isLike ? 'text-red-500' : 'text-gray-400'}`}
      ><FaHeart/></button>
      {/* <p>{isLike ? "1" : "0"}</p> */}
    </div>
  </li>
  )
}

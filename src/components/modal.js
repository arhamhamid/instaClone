import React from "react";
import "../pages/main.css";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { auth, db, storage } from "../config";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { FaFile } from "react-icons/fa";
import { useAppContext } from "../appContext";

export const MyModal = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const { currentUserUid, currentUserName } = useAppContext();

  const postCollection = collection(db, "posts");

  const post = async () => {
    try {
      if (selectedFile) {
        const imageRef = ref(storage, "images/" + selectedFile.name);
        await uploadBytes(imageRef, selectedFile);

        const pictureURL = await getDownloadURL(imageRef);

        const postData = {
          text: caption,
          senderId: currentUserUid,
          Name: currentUserName,
          pictureURL: pictureURL,
          like: [],
        };

        await addDoc(postCollection, postData);

        alert("Posted !");
        setCaption("");
        setSelectedFile(null);
      } else {
        alert("Please select a product picture.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button onClick={openModal} className="">
        Post
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "400px", // Define the maximum width of the modal content
          },
        }}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
        <input
          type="file"
          style={{ display: "none" }}
          id="fileInput"
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
          }}
        />
        <label
          className="labelFile cursor-pointer text-blue-500 hover:text-blue-700"
          htmlFor="fileInput"
        >
          <FaFile className="icon" />
        </label>
        <input
          type="text"
          onChange={(e) => setCaption(e.target.value)}
          className="block w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Caption"
        />
        <button
          onClick={post}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Post
        </button>
      </Modal>
    </div>
  );
};

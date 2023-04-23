import React, { useState, useEffect, useRef } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/firebase/firebase-config";

const useFirebaseImage = (setValue, getValues, uploadFunc = "", func = "") => {
  const [image, setImage] = useState();
  const [progress, setProgress] = useState();
  const [run, setRun] = useState(false);
  const nodeRef = useRef();
  const handleUploadImage = (e) => {
    const fileList = e.target.files;
    const file = fileList[0];
    const storageRef = ref(storage, "images/" + file.name);
    // upload file to cloud storage
    const uploadTask = uploadBytesResumable(storageRef, file);

    // follow process upload file to cloud storage
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setRun(true);
        setImage();
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
        }
      },
      (error) => {
        setRun(false);
        setProgress();
      },
      () => {
        const imagePrev = getValues("image");
        if (imagePrev) {
          const desertRef = ref(storage, `images/${imagePrev}`);
          deleteObject(desertRef);
        }
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValue("image", file.name);
          setImage(downloadURL);
          uploadFunc && uploadFunc(file.name, downloadURL);
        });
      }
    );
  };
  const handleDeleteImage = () => {
    if (getValues("image")) {
      const desertRef = ref(storage, `images/${getValues("image")}`);
      deleteObject(desertRef);
    }
    setImage();
    setRun(true);
    setProgress();
    setValue("image", "");
    nodeRef.current.value = "";
    func && func();
    setRun(false);
  };
  useEffect(() => {
    if (progress == "100") {
      setRun(false);
    }
  }, [progress]);
  // useEffect(() => {
  //   return () => {
  //     const imageName = getValues("image");
  //     console.log("imageName", imageName);
  //     if (imageName) {
  //       const desertRef = ref(storage, `images/${imageName}`);
  //       deleteObject(desertRef);
  //     }
  //   };
  // }, []);
  return {
    image,
    setImage,
    setRun,
    setProgress,
    progress,
    run,
    nodeRef,
    handleUploadImage,
    handleDeleteImage,
  };
};

export default useFirebaseImage;

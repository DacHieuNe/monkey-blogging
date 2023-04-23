import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "@/components/Button";
import { Field, FieldCheckboxes } from "@/components/Field";
import { InputMain } from "@/modules/Input";
import { Label } from "@/components/Label";
import { Radio } from "@/components/Radio";
import { Dropdown } from "@/components/Dropdown";
import { UploadImage } from "@/components/UploadImage";
import { Toggle, ToggleV2 } from "@/components/Toggle";
import useFirebaseImage from "@/hooks/useFirebaseImage";
import { slugify, postStatus } from "@/utils/constant";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import { Loading } from "@/components/Loading";
import { DashboardHeading } from "@/modules/Dashboard";

const PostAddNewStyles = styled.div``;

// uploadTask.on(
//   "state_changed",
//   (snapshot) => {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log("Upload is " + progress + "% done");
//     switch (snapshot.state) {
//       case "paused":
//         console.log("Upload is paused");
//         break;
//       case "running":
//         console.log("Upload is running");
//         break;
//     }
//   },
//   (error) => {
//     // A full list of error codes is available at
//     // https://firebase.google.com/docs/storage/web/handle-errors
//     switch (error.code) {
//       case "storage/unauthorized":
//         // User doesn't have permission to access the object
//         break;
//       case "storage/canceled":
//         // User canceled the upload
//         break;

//       // ...

//       case "storage/unknown":
//         // Unknown error occurred, inspect error.serverResponse
//         break;
//     }
//   },
//   () => {
//     // Upload completed successfully, now we can get the download URL
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log("File available at", downloadURL);
//     });
//   }
// );

const PostAddNew = () => {
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 1,
      category: "",
      image: "",
      hot: false,
    },
  });
  const { userInfo } = useAuth();
  const [user, setUser] = useState({});
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const {
    image,
    setImage,
    run,
    setRun,
    progress,
    setProgress,
    nodeRef,
    handleUploadImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  const handleSubmitForm = async (data) => {
    const cloneData = { ...data };
    cloneData.status = +cloneData.status;
    cloneData.slug = slugify(cloneData.slug || cloneData.title);
    cloneData["image_link"] = image || "";
    const colRef = collection(db, "posts");
    const snapshot = await getDocs(colRef);
    await addDoc(colRef, {
      ...cloneData,
      users: user,
      order: snapshot.size,
      createdAt: serverTimestamp(),
    });

    nodeRef.current.value = null;
    setImage();
    setRun(false);
    setProgress();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done");
        reset({
          title: "",
          slug: "",
          category: "",
          image: "",
          status: 1,
          hot: false,
        });
        setCategoryName("");
        toast.success("Create post success ! 🦄", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }, 700);
    });
  };
  useEffect(() => {
    const result = [];
    const getData = async () => {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      onSnapshot(q, (docs) => {
        const results = [];
        docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategories(results);
      });
    };
    getData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (userInfo == 1) return;
      const docRef = doc(db, "users", userInfo.uid);

      const docData = await getDoc(docRef);
      setUser({
        id: docData.id,
        ...docData.data(),
      });
    };
    fetchData();
  }, [userInfo.uid]);
  return (
    <PostAddNewStyles>
      <DashboardHeading title="Add post" desc="Add new post"></DashboardHeading>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="form-layout">
          <Field>
            <Label>Title</Label>
            <InputMain
              control={control}
              placeholder="Enter your title"
              name="title"
            ></InputMain>
          </Field>
          <Field>
            <Label>Slug</Label>
            <InputMain
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></InputMain>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <UploadImage
              refer={nodeRef}
              run={run}
              progress={progress}
              image={image}
              onChange={handleUploadImage}
              onDelete={handleDeleteImage}
            />
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={categoryName || "Please select an option"}
              >
                <Dropdown.List>
                  {Array.isArray(categories) &&
                    categories.length > 0 &&
                    categories.map((item) => (
                      <Dropdown.Option
                        onClick={() => {
                          setValue("category", item);
                          setCategoryName(item.name);
                        }}
                        key={item.id}
                      >
                        {item.name}
                      </Dropdown.Option>
                    ))}
                </Dropdown.List>
              </Dropdown.Select>
            </Dropdown>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot}
              onClick={() => {
                setValue("hot", !watchHot);
              }}
            />
          </Field>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={watchStatus == postStatus.APPROVED}
                // onClick={() => setValue("status", postStatus.APPROVED)}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus == postStatus.PENDING}
                // onClick={() => setValue("status", postStatus.PENDING)}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus == postStatus.REJECT}
                // onClick={() => setValue("status", postStatus.REJECT)}
                value={postStatus.REJECT}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="min-w-[200px] mx-auto"
        >
          {/* <Loading borderSize="5px" /> */}
          {isSubmitting ? <Loading borderSize="4px" /> : "Add new post"}
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;

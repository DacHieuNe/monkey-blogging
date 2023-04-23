import React, { useEffect, useState, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import ImageUploader from "quill-image-uploader";
import { Navigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
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
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import useAuth from "@/hooks/useAuth";
import { Loading } from "@/components/Loading";
import { DashboardHeading } from "@/modules/Dashboard";
import { NotFound } from "@/pages/NotFound";
import { imgbbAPI } from "@/config/apiConfig";
import axios from "axios";
Quill.register("modules/imageUploader", ImageUploader);

const PostEditStyles = styled.div``;
const PostEdit = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");
  if (!postId) return <Navigate to="/manage/posts" replace />;
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
  const [content, setContent] = useState("");
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  const handleDeleteImageLink = async () => {
    const docRef = doc(db, "posts", postId);

    await updateDoc(docRef, {
      image: "",
      image_link: "",
    });
  };
  const handleUploadImageLink = async (imageName, imageLink) => {
    const docRef = doc(db, "posts", postId);

    await updateDoc(docRef, {
      image: imageName,
      image_link: imageLink,
    });
  };
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
  } = useFirebaseImage(
    setValue,
    getValues,
    handleUploadImageLink,
    handleDeleteImageLink
  );
  const handleSubmitForm = async (data) => {
    const cloneData = { ...data };
    cloneData.status = +cloneData.status;
    cloneData.slug = slugify(cloneData.slug || cloneData.title);
    cloneData["image_link"] = image || "";
    const docRef = doc(db, "posts", postId);

    await updateDoc(docRef, {
      ...cloneData,
      content,
      users: user,
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
        toast.success("Updated post success ! 🦄", {
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
    const fetchData = async () => {
      const docRef = doc(db, "posts", postId);
      const docData = await getDoc(docRef);
      reset({
        ...docData.data(),
      });
      setContent(docData.data().content);
      setCategoryName(docData.data().category.name);
      setImage(docData.data()["image_link"]);
    };
    fetchData();
  }, []);
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
    const fetchDataUser = async () => {
      const docRef = doc(db, "posts", postId);

      const docData = await getDoc(docRef);
      const docId = docData.data().users.id;

      const docRefNext = doc(db, "users", docId);
      const docDataNext = await getDoc(docRefNext);

      setUser({
        id: docDataNext.id,
        ...docDataNext.data(),
      });
    };
    fetchDataUser();
  }, []);
  return (
    <PostEditStyles>
      <DashboardHeading
        title="Update Post"
        desc={`Update post id: ${postId}`}
      ></DashboardHeading>
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
        <div className="flex">
          <Field className="w-full">
            <div className="w-full entry-content">
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>
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
          {isSubmitting ? <Loading borderSize="4px" /> : "Update Post"}
        </Button>
      </form>
    </PostEditStyles>
  );
};

export default PostEdit;

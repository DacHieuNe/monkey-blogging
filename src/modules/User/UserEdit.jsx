import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/Button";
import { Radio } from "@/components/Radio";
import { Field, FieldCheckboxes } from "@/components/Field";
import { InputMain } from "@/modules/Input";
import { Label } from "@/components/Label";
import { DashboardHeading } from "@/modules/Dashboard";
import {
  userStatus,
  userRole,
  categoryStatus,
  slugify,
} from "@/utils/constant";
import { Loading } from "@/components/Loading";
import { toast } from "react-toastify";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { UploadImage } from "@/components/UploadImage";
import useFirebaseImage from "@/hooks/useFirebaseImage";
import { Textarea } from "@/components/Textarea";

const UserEdit = () => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      image: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const id = searchParams.get("id");
  const handleDeleteImageLink = async () => {
    const docRef = doc(db, "users", id);

    await updateDoc(docRef, {
      image: "",
      image_link: "",
    });
  };
  const handleUploadImageLink = async (imageName, imageLink) => {
    const docRef = doc(db, "users", id);

    await updateDoc(docRef, {
      image: imageName,
      image_link: imageLink,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", id);
      const docData = await getDoc(docRef);
      reset({
        ...docData.data(),
      });
      setImage(docData.data()["image_link"]);
    };
    fetchData();
  }, []);
  const {
    image,
    setImage,
    setRun,
    setProgress,
    progress,
    run,
    nodeRef,
    handleDeleteImage,
    handleUploadImage,
  } = useFirebaseImage(
    setValue,
    getValues,
    handleUploadImageLink,
    handleDeleteImageLink
  );
  const handleSubmitForm = async (data) => {
    const cloneData = { ...data };
    cloneData.status = +cloneData.status;
    cloneData.role = +cloneData.role;
    cloneData.username = slugify(cloneData?.username || cloneData?.fullname);
    cloneData["image_link"] = image;

    nodeRef.current.value = null;
    setRun(false);
    setImage();
    setProgress();
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, {
      ...cloneData,
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        toast.success("Update info success ! 🦄", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        reset({
          fullname: "",
          username: "",
          email: "",
          password: "",
          image: "",
          status: userStatus.ACTIVE,
          role: userRole.USER,
        });
        resolve("done");
      }, 1000);
    });
  };
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc={`Update user id: ${id}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="max-w-[300px] mx-auto">
          <Field>
            <UploadImage
              refer={nodeRef}
              run={run}
              progress={progress}
              image={image}
              onChange={handleUploadImage}
              onDelete={handleDeleteImage}
              labelClassName="!rounded-full"
              removeClassName="top-[30px] right-[10px]"
              imageClassName="!rounded-full"
              progressClassName="!bottom-1/2 !-left-[60%] rotate-90"
            />
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <InputMain
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></InputMain>
          </Field>
          <Field>
            <Label>Username</Label>
            <InputMain
              name="username"
              placeholder="Enter your username"
              control={control}
            ></InputMain>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <InputMain
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></InputMain>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputMain
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
              autoComplete="new-password"
            ></InputMain>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={+watchRole === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Textarea
              setValue={setValue}
              placeholder="Message ... "
              name="description"
              control={control}
            />
          </Field>
        </div>
        <Button
          disabled={isSubmitting}
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
        >
          {isSubmitting ? <Loading borderSize="5px" /> : "Update user"}
        </Button>
      </form>
    </div>
  );
};

export default UserEdit;

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/Button";
import { Radio } from "@/components/Radio";
import { Field, FieldCheckboxes } from "@/components/Field";
import { InputMain } from "@/modules/Input";
import { Label } from "@/components/Label";
import { DashboardHeading } from "@/modules/Dashboard";
import { UploadImage } from "@/components/UploadImage";
import { userStatus, userRole } from "@/utils/constant";
import useFirebaseImage from "@/hooks/useFirebaseImage";
import { slugify } from "@/utils/constant";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase/firebase-config";
import { toast } from "react-toastify";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Loading } from "@/components/Loading";
import { Textarea } from "@/components/Textarea";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      image: "",
      description: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
    },
  });
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
  } = useFirebaseImage(setValue, getValues);
  const handleSubmitForm = async (data) => {
    const cloneData = { ...data };
    cloneData.status = +cloneData.status;
    cloneData.role = +cloneData.role;
    cloneData.username = slugify(cloneData.username || cloneData.fullname);
    cloneData["image_link"] = image || "";

    const { fullname, email, password } = cloneData;
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { user } = userCredential;

        toast.success("Add user success !", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        await updateProfile(auth.currentUser, {
          displayName: fullname,
        });
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, {
          ...cloneData,
          createdAt: serverTimestamp(),
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Email already exists on the system", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });

    nodeRef.current.value = null;
    setImage();
    setRun(false);
    setProgress();

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done");
        reset({
          fullname: "",
          username: "",
          email: "",
          password: "",
          image: "",
          description: "",
          status: userStatus.ACTIVE,
          role: userRole.USER,
        });
        // toast.success("Create post success ! 🦄", {
        //   position: "top-right",
        //   autoClose: 500,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "dark",
        // });
      }, 700);
    });
  };
  const watchStatus = watch("status");
  const watchRole = watch("role");
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
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
          {isSubmitting ? <Loading borderSize="5px" /> : "Add new user"}
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;

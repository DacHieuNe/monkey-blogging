import React, { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Label } from "@/components/Label";
import { InputMain, InputPassword } from "@/modules/Input";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { auth, db } from "@/firebase/firebase-config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Authen } from "@/components/Authen";
import useAuth from "@/hooks/useAuth";
import { useNavigate, NavLink } from "react-router-dom";
import { slugify } from "@/utils/constant";

const SignUp = (props) => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [count, setCount] = useState(0);
  const schema = yup.object().shape({
    fullname: yup.string().required("Please enter your full name"),
    email: yup.string().required("Please enter your email"),
    password: yup
      .string()
      .min(6, "Please password must be greater than or equal 6 characters")
      .required("Please enter your password"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (data) => {
    const { fullname, email, password } = data;
    try {
      setCount(count + 1);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Register success 🦄", {
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
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname,
        username: slugify(fullname),
        email,
        image: "",
        image_link:
          "https://images.unsplash.com/photo-1682113158631-dee509ef98ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
        password,
        status: 1,
        role: 3,
      });
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("check");
          navigate("/");
        }, 500);
      });
    } catch (error) {
      toast.error("Register failed !", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    return "";
  };
  useEffect(() => {
    if (count < 2 && userInfo != null && typeof userInfo != "number") {
      navigate("/");
    }
    setCount(count + 1);
  }, [userInfo]);
  useEffect(() => {
    let dataError = Object.values(errors);
    if (dataError.length > 0) {
      toast.error(`${dataError[0]?.message}`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [errors]);
  return (
    <>
      {(count > 2 || userInfo == null) && (
        <Authen>
          <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
            <Field>
              <Label htmlFor="fullname">Fullname:</Label>
              <InputMain
                control={control}
                name="fullname"
                placeholder="Enter your fullname"
                type="text"
              />
            </Field>
            <Field>
              <Label htmlFor="email">Email address: </Label>
              <InputMain
                control={control}
                name="email"
                placeholder="Enter your email address"
                type="email"
              />
            </Field>
            <Field>
              <Label htmlFor="password">Password: </Label>
              <InputPassword
                control={control}
                name="password"
                placeholder="Enter your password"
              />
            </Field>
            <div className="form-btn">
              <Button
                type="submit"
                className="btn-size-primary"
                // style={{
                //   minWidth: "200px",
                // }}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loading borderSize="4px" /> : "Sign Up"}
              </Button>
            </div>
          </form>
          <h3 className="authen-check">
            Nếu đã có tài khoản , hãy <NavLink to="/sign-in">Đăng nhập</NavLink>
          </h3>
        </Authen>
      )}
    </>
  );
};

SignUp.propTypes = {};

export default SignUp;

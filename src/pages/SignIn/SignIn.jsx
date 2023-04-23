import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import PropTypes from "prop-types";
import { Label } from "@/components/Label";
import { InputMain, InputPassword } from "@/modules/Input";
import { Field } from "@/components/Field";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { auth } from "@/firebase/firebase-config";
import { Authen } from "@/components/Authen";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const SignIn = (props) => {
  const schema = yup.object().shape({
    email: yup.string().required("Please enter your email"),
    password: yup
      .string()
      .min(6, "Please password must be greater than or equal 6 characters")
      .required("Please enter your password"),
  });
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [count, setCount] = useState(0);
  const handleSubmitForm = async (data) => {
    const { email, password } = data;
    const uploadData = async () => {
      await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          toast.success("Login success 🦄", {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve("ok");
              navigate("/");
            }, 1500);
          });
        })
        .catch((errors) => {
          toast.error("Email or password invalid", {
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
    };
    await uploadData();
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
      {(count >= 2 || userInfo == null) && (
        <Authen>
          <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
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
                style={{
                  minWidth: "200px",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loading borderSize="4px" /> : "Sign In"}
              </Button>
            </div>
          </form>
          <h3 className="authen-check">
            Nếu chưa có tài khoản , hãy <NavLink to="/sign-up">Đăng ký</NavLink>
          </h3>
        </Authen>
      )}
    </>
  );
};

SignIn.propTypes = {};

export default SignIn;

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { UploadImage } from "@/components/UploadImage";
import { InputMain } from "@/modules/Input";
import { Label } from "@/components/Label";
import { DashboardHeading } from "@/modules/Dashboard";

const UserProfile = () => {
  const { control } = useForm({
    mode: "onChange",
  });
  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form>
        <div className="text-center mb-10">
          <UploadImage className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"></UploadImage>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <InputMain
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></InputMain>
          </Field>
          <Field>
            <Label>Username</Label>
            <InputMain
              control={control}
              name="username"
              placeholder="Enter your username"
            ></InputMain>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <InputMain
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></InputMain>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <InputMain
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></InputMain>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <InputMain
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></InputMain>
          </Field>
          <Field></Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>New Password</Label>
            <InputMain
              control={control}
              name="password"
              type="password"
              placeholder="Enter your password"
            ></InputMain>
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <InputMain
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
            ></InputMain>
          </Field>
        </div>
        <Button kind="primary" className="mx-auto w-[200px]">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;

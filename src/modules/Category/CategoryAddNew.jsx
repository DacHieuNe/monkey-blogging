import React from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/Button";
import { Radio } from "@/components/Radio";
import { Field } from "@/components/Field";
import { InputMain } from "@/modules/Input";
import { Label } from "@/components/Label";
import { DashboardHeading } from "@/modules/Dashboard";
import { categoryStatus, slugify } from "@/utils/constant";
import { Loading } from "@/components/Loading";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";

const CategoryAddNew = () => {
  const {
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
    },
  });
  const searchParams = useSearchParams();
  const watchStatus = watch("status");
  const handleSubmitForm = async (data) => {
    const cloneData = { ...data };
    cloneData.status = +cloneData.status;
    cloneData.slug = slugify(cloneData?.slug || cloneData?.name);
    console.log("data", cloneData);

    const colRef = collection(db, "categories");
    const snapshot = await getDocs(colRef);

    const results = [];
    snapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log("results", results);
    await addDoc(colRef, {
      ...cloneData,
      order: snapshot.docs.length,
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        toast.success("Create category success ! 🦄", {
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
          name: "",
          slug: "",
          status: 1,
        });
        resolve("done");
      }, 1000);
    });
  };
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <InputMain
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></InputMain>
          </Field>
          <Field>
            <Label>Slug</Label>
            <InputMain
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></InputMain>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={watchStatus == categoryStatus.APPROVE}
                value={categoryStatus.APPROVE}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus == categoryStatus.UNAPPROVE}
                value={categoryStatus.UNAPPROVE}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          disabled={isSubmitting}
          type="submit"
          kind="primary"
          className="min-w-[200px] mx-auto"
        >
          {isSubmitting ? <Loading /> : "Add new category"}
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;

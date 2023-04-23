import React, { useState } from "react";
import PropTypes from "prop-types";
import InputMain from "./InputMain";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputPassword = ({ control, name, ...props }) => {
  const [typePassword, setTypePassword] = useState(true);
  return (
    <>
      <InputMain
        control={control}
        name={name}
        type={typePassword ? "password" : "text"}
        onClickIcon={() => setTypePassword(!typePassword)}
        {...props}
      >
        {typePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </InputMain>
    </>
  );
};

InputPassword.propTypes = {};

export default InputPassword;

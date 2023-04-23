import React, { useState } from "react";
import { useController } from "react-hook-form";

const ToggleV2 = (props) => {
  //   const { on, onClick, ...rest } = props;
  const { name, control } = props;
  const { field } = useController({
    control,
    name,
    defaultValue: false,
  });
  const handleOnChange = (e) => {
    setValue(e.target.checked);
  };
  const [value, setValue] = useState(false);
  return (
    <label>
      <input
        type="checkbox"
        checked={value}
        // onClick={onClick}
        className="hidden-input"
        // onChange={() => {}}
        onChange={handleOnChange}
      />
      <div
        className={`inline-block w-[100px] h-[52px] relative cursor-pointer rounded-full p-1 transition-all ${
          value ? "bg-purple-500" : "bg-gray-300"
        }`}
        // {...rest}
      >
        <span
          className={`transition-all w-11 h-11 bg-white rounded-full inline-block ${
            value ? "translate-x-[48px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

export default ToggleV2;

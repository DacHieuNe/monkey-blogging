import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LabelStyle = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.grayLight};
  cursor: pointer;
`;
// specialization component ()
const UploadImage = ({
  refer,
  run,
  progress,
  image,
  onChange,
  onDelete,
  labelClassName = "",
  removeClassName = "",
  imageClassName = "",
  progressClassName = "",
}) => {
  return (
    <div className="relative w-full group">
      {!run && image && (
        <button
          onClick={onDelete}
          className={`absolute z-[6] top-0 right-0 w-[50px] h-[50px] rounded-full bg-white text-red-500 opacity-0 invisible -translate-x-1/2 translate-y-1/2 ${removeClassName} group-hover:opacity-100 group-hover:visible`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="inline-block w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      )}
      <LabelStyle disabled={run} className={labelClassName}>
        <input
          ref={refer}
          type="file"
          className="hidden-input"
          onChange={onChange}
        />
        {!run && (
          <div className="absolute z-[5] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              className="w-[50px] h-[50px] object-cover"
              src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png"
              alt="image"
            />
          </div>
        )}
        {image && (
          <div className="absolute inset-0 z-[4]">
            <img
              src={image}
              alt="image-u"
              className={`w-full h-full object-cover ${imageClassName}`}
            />
          </div>
        )}
        {run && (
          <div className="relative z-[6] w-[50px] h-[50px] rounded-full border-solid border-4 border-white border-t-transparent  animate-spin"></div>
        )}
        {run && (
          <div
            className={`absolute bottom-0 left-0 z-[6] w-0 h-[4px] bg-green-400 transition-all ${progressClassName}`}
            style={{
              width: `${progress}%`,
              // width: `100%`,
            }}
          ></div>
        )}
      </LabelStyle>
    </div>
  );
};

UploadImage.propTypes = {};

export default UploadImage;

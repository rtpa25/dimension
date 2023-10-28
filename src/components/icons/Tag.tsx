import { type FC } from "react";

interface TagProps {
  strokeColor?: string;
}

const Tag: FC<TagProps> = ({ strokeColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_1_35)">
        <path
          d="M5.66667 6.33333C6.03486 6.33333 6.33333 6.03486 6.33333 5.66667C6.33333 5.29848 6.03486 5 5.66667 5C5.29848 5 5 5.29848 5 5.66667C5 6.03486 5.29848 6.33333 5.66667 6.33333Z"
          fill={"#94989E"}
          stroke={strokeColor ?? "#94989E"}
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.66663 4.66666V7.23933C2.66663 7.59733 2.80863 7.94066 3.06196 8.194L8.47263 13.6047C8.59799 13.73 8.74682 13.8295 8.91062 13.8974C9.07443 13.9652 9.24999 14.0001 9.42729 14.0001C9.60459 14.0001 9.78016 13.9652 9.94396 13.8974C10.1078 13.8295 10.2566 13.73 10.382 13.6047L13.6046 10.382C13.73 10.2566 13.8295 10.1078 13.8973 9.944C13.9652 9.7802 14.0001 9.60463 14.0001 9.42733C14.0001 9.25003 13.9652 9.07446 13.8973 8.91066C13.8295 8.74686 13.73 8.59803 13.6046 8.47266L8.19329 3.062C7.94025 2.809 7.59712 2.6668 7.23929 2.66666H4.66663C4.13619 2.66666 3.62749 2.87738 3.25241 3.25245C2.87734 3.62752 2.66663 4.13623 2.66663 4.66666Z"
          stroke={strokeColor ?? "#94989E"}
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_35">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Tag;

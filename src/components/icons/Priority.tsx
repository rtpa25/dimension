import { type FC } from "react";

interface PriorityProps {
  strokeColor?: string;
}

const Priority: FC<PriorityProps> = ({ strokeColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_1_49)">
        <path
          d="M3.33331 9.33334H12.6666V3.33334H3.33331V14"
          stroke={strokeColor ?? "#94989E"}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_49">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Priority;

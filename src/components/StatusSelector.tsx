import React, { type FC } from "react";
import { Status } from "~/utils/constants";
import { Ellipse } from "./icons";
import Combobox from "./ui/combobox";

interface StatusSelectorProps {
  onSelect: (value: string) => void;
  value?: string;
}

const StatusSelector: FC<StatusSelectorProps> = ({ onSelect, value }) => {
  return (
    <Combobox
      options={Object.values(Status).map((status) => {
        return {
          label: (
            <div className="flex items-center justify-start gap-1">
              <Ellipse />
              <p className="text-xs text-[#94989E]">{status}</p>
            </div>
          ),
          value: status,
        };
      })}
      onSelect={onSelect}
      initialButtonText={
        <div className="flex items-center gap-1">
          <Ellipse />
          <p className="text-xs text-[#94989E]">Todo</p>
        </div>
      }
      currentSingleOption={value}
    />
  );
};

export default StatusSelector;

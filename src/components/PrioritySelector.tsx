import { Priority as PriorityEnum } from "~/utils/constants";
import { Priority } from "./icons";
import Combobox from "./ui/combobox";
import { type FC } from "react";

interface PrioritySelectorProps {
  onSelect: (value: string) => void;
  value?: string;
}

const PrioritySelector: FC<PrioritySelectorProps> = ({ onSelect, value }) => {
  return (
    <Combobox
      options={Object.values(PriorityEnum).map((priority) => {
        return {
          label: (
            <div className="flex items-center gap-1">
              <Priority />
              <p className="text-xs text-[#94989E]">{priority}</p>
            </div>
          ),
          value: priority,
        };
      })}
      onSelect={onSelect}
      initialButtonText={
        <div className="flex items-center gap-1">
          <Priority />
          <p className="text-xs text-[#94989E]">Priority</p>
        </div>
      }
      currentSingleOption={value}
    />
  );
};

export default PrioritySelector;

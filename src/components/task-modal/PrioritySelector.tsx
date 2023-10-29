import { Priority as PriorityEnum } from "~/utils/constants";
import { Priority } from "../icons";
import Combobox from "../ui/combobox";
import { type FC } from "react";

interface PrioritySelectorProps {
  onSelect: (value: string) => void;
  value?: string;
}

const PrioritySelector: FC<PrioritySelectorProps> = ({ onSelect, value }) => {
  return (
    <Combobox
      options={Object.values(PriorityEnum).map((priority) => {
        let icon;
        switch (priority) {
          case PriorityEnum.URGENT:
            icon = <Priority strokeColor="#ff4f4f" />;
            break;
          case PriorityEnum.HIGH:
            icon = <Priority strokeColor="#f2913d" />;
            break;
          case PriorityEnum.MEDIUM:
            icon = <Priority strokeColor="#ffc42f" />;
            break;
          case PriorityEnum.LOW:
            icon = <Priority strokeColor="#28e29e" />;
            break;
          default:
            break;
        }
        return {
          label: (
            <div className="flex items-center gap-1">
              {icon}
              <p className="text-xs font-light text-text-default">{priority}</p>
            </div>
          ),
          value: priority,
        };
      })}
      onSelect={onSelect}
      initialButtonText={
        <div className="flex items-center gap-1">
          <Priority />
          <p className="text-xs font-light text-text-default">Priority</p>
        </div>
      }
      currentSingleOption={value}
    />
  );
};

export default PrioritySelector;

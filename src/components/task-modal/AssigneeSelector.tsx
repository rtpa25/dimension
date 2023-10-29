import { type FC } from "react";
import { UserNames } from "~/utils/constants";
import { Avatar } from "../icons";
import Combobox from "../ui/combobox";

interface AssigneeSelectorProps {
  onSelect: (value: string) => void;
  value?: string[];
}

const AssigneeSelector: FC<AssigneeSelectorProps> = ({ onSelect, value }) => {
  return (
    <Combobox
      options={Object.values(UserNames).map((assignee) => {
        return {
          label: (
            <div className="flex items-center gap-1 rounded-lg py-1.5">
              <Avatar />
              <p className="text-xs text-text-default">{assignee}</p>
            </div>
          ),
          value: assignee,
        };
      })}
      isMultiSelect={true}
      onSelect={onSelect}
      initialButtonText={
        <div className="flex items-center gap-1">
          <Avatar />
          <p className="text-xs font-light text-text-default">Assignee</p>
        </div>
      }
      currentMultipleOptions={value}
    />
  );
};

export default AssigneeSelector;

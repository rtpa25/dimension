import { Tag as TagEnum } from "~/utils/constants";
import Combobox from "./ui/combobox";
import { Tag } from "./icons";
import { type FC } from "react";

interface TagsSelectorProps {
  onSelect: (value: string) => void;
  value?: string[];
}

const TagsSelector: FC<TagsSelectorProps> = ({ onSelect, value }) => {
  return (
    <Combobox
      options={Object.values(TagEnum).map((tag) => {
        return {
          label: (
            <div className="flex items-center gap-1">
              <Tag />
              <p className="text-xs text-[#94989E]">{tag}</p>
            </div>
          ),
          value: tag,
        };
      })}
      isMultiSelect={true}
      onSelect={onSelect}
      initialButtonText={
        <div className="flex items-center gap-1">
          <Tag />
          <p className="text-xs text-[#94989E]">Tags</p>
        </div>
      }
      currentMultipleOptions={value}
    />
  );
};

export default TagsSelector;

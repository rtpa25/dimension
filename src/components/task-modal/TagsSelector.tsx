import { Tag as TagEnum } from "~/utils/constants";
import Combobox from "../ui/combobox";
import { Tag } from "../icons";
import { type FC } from "react";
import { getTagIcons } from "~/lib/ui-helper";

interface TagsSelectorProps {
  onSelect: (value: string) => void;
  value?: string[];
}

const TagsSelector: FC<TagsSelectorProps> = ({ onSelect, value }) => {
  return (
    <Combobox
      options={Object.values(TagEnum).map((tag) => {
        const icon = getTagIcons(tag);
        return {
          label: (
            <div className="flex items-center gap-1">
              {icon}
              <p className="text-text-default text-xs">{tag}</p>
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
          <p className="text-text-default text-xs">Tags</p>
        </div>
      }
      currentMultipleOptions={value}
    />
  );
};

export default TagsSelector;
import { Project as ProjectEnum } from "~/utils/constants";
import { Project } from "../icons";
import Combobox from "../ui/combobox";
import { type FC } from "react";

interface ProjectSelectorProps {
  onSelect: (value: string) => void;
  value?: string;
}

const ProjectSelector: FC<ProjectSelectorProps> = ({ onSelect, value }) => {
  return (
    <Combobox
      options={Object.values(ProjectEnum).map((project) => {
        return {
          label: (
            <div className="flex items-center gap-1">
              <Project />
              <p className="text-text-default text-xs">{project}</p>
            </div>
          ),
          value: project,
        };
      })}
      onSelect={onSelect}
      initialButtonText={
        <div className="flex items-center gap-1">
          <Project />
          <p className="text-text-default text-xs">Project</p>
        </div>
      }
      currentSingleOption={value}
    />
  );
};

export default ProjectSelector;

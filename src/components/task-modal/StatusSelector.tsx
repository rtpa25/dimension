import React, { type FC } from "react";
import { Status } from "~/utils/constants";
import { Ellipse } from "../icons";
import Combobox from "../ui/combobox";
import { AlertCircle, CheckCircle2, Loader2, XCircle } from "lucide-react";

interface StatusSelectorProps {
  onSelect: (value: string) => void;
  value?: string;
}

const StatusSelector: FC<StatusSelectorProps> = ({ onSelect, value }) => {
  return (
    <Combobox
      options={Object.values(Status).map((status) => {
        let icon;
        switch (status) {
          case Status.TODO:
            icon = <Ellipse />;
            break;
          case Status.IN_PROGRESS:
            icon = <Loader2 className="h-4 w-4 text-yellow-500" />;
            break;
          case Status.DONE:
            icon = <CheckCircle2 className="h-4 w-4 text-green-500" />;
            break;
          case Status.BLOCKED:
            icon = <AlertCircle className="h-4 w-4 text-red-500" />;
            break;
          case Status.CANCELLED:
            icon = <XCircle className="h-4 w-4 text-gray-500" />;
            break;
          default:
            break;
        }
        return {
          label: (
            <div className="flex items-center justify-start gap-1">
              {icon}
              <p className="text-text-default text-xs">{status}</p>
            </div>
          ),
          value: status,
        };
      })}
      onSelect={onSelect}
      initialButtonText={
        <div className="flex items-center gap-1">
          <Ellipse />
          <p className="text-text-default text-xs">Todo</p>
        </div>
      }
      currentSingleOption={value}
    />
  );
};

export default StatusSelector;

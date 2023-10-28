import { Check } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

interface ComboBoxProps {
  options: {
    value: string;
    label: React.ReactNode;
  }[];
  initialButtonText: React.ReactNode;
  onSelect?: (value: string) => void;
  currentMultipleOptions?: string[];
  currentSingleOption?: string;
  isMultiSelect?: boolean;
}

const Combobox: React.FC<ComboBoxProps> = ({
  initialButtonText,
  options,
  onSelect,
  currentMultipleOptions = [],
  currentSingleOption,
  isMultiSelect = false,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          size={"sm"}
          aria-expanded={open}
          className="w-fit justify-between rounded-lg px-3"
        >
          {currentSingleOption
            ? options.find((option) => option.value === currentSingleOption)
                ?.label
            : currentMultipleOptions.length > 0
            ? options.find(
                (option) => option.value === currentMultipleOptions[0],
              )?.label
            : initialButtonText}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="font- w-[200px] p-0"
        style={{
          fontFamily: "inherit",
        }}
      >
        <Command>
          <CommandInput placeholder="Search Option..." />
          <CommandEmpty>
            <p className="text-sm text-[#94989E]">No options found</p>
          </CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  if (!isMultiSelect) setOpen(false);
                  onSelect?.(option.value);
                }}
              >
                {currentMultipleOptions.length > 0 && (
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-gray-500",
                      currentMultipleOptions.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                )}

                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;

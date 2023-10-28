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
  isMultiSelect?: boolean;
}

const Combobox: React.FC<ComboBoxProps> = ({
  initialButtonText,
  options,
  onSelect,
  isMultiSelect = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [singleSelectValue, setSingleSelectValue] = React.useState("");
  const [multiSelectValues, setMultiSelectValues] = React.useState<string[]>(
    [],
  );

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
          {singleSelectValue
            ? options.find((option) => option.value === singleSelectValue)
                ?.label
            : multiSelectValues.length > 0
            ? options.find((option) => option.value === multiSelectValues[0])
                ?.label
            : initialButtonText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Option..." />
          <CommandEmpty>No Option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  if (isMultiSelect) {
                    if (multiSelectValues.includes(option.value)) {
                      setMultiSelectValues(
                        multiSelectValues.filter(
                          (value) => value !== option.value,
                        ),
                      );
                    } else {
                      setMultiSelectValues([
                        ...multiSelectValues,
                        option.value,
                      ]);
                    }

                    onSelect?.(option.value);
                  } else {
                    console.log("single select", option.value);

                    setSingleSelectValue(option.value);
                    onSelect?.(option.value);
                    setOpen(false);
                  }
                }}
              >
                {multiSelectValues.length > 0 && (
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      multiSelectValues.includes(option.value)
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

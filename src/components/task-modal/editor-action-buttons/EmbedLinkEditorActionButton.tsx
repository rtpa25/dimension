import { type Editor } from "@tiptap/react";
import React, { type FC } from "react";
import { useForm } from "react-hook-form";
import { Link } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { gtWalsheim } from "~/styles/fonts";

interface EmbedLinkEditorActionButtonProps {
  editor: Editor | null;
}

const EmbedLinkEditorActionButton: FC<EmbedLinkEditorActionButtonProps> = ({
  editor,
}) => {
  const { watch, setValue, reset } = useForm<{
    link: string;
  }>({
    defaultValues: {
      link: "",
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={`${editor?.isActive("link") ? "bg-[#533BE520]" : ""}`}
        >
          <Link />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-xl" style={gtWalsheim.style}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-[#6C6F75]">Insert Link</h4>
            <p className="text-xs text-text-default/80">
              Select any text and click.
            </p>
          </div>
          <form
            className="grid gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              editor
                ?.chain()
                .focus()
                .unsetLink()
                .setLink({
                  href: watch("link"),
                  target: "_blank",
                  rel: "noopener noreferrer",
                })
                .run();
              reset();
            }}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="link" className="text-gray-500">
                Link
              </Label>
              <div className="flex gap-2">
                <Input
                  id="link"
                  defaultValue="100%"
                  value={watch("link")}
                  onChange={(e) => {
                    setValue("link", e.target.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  className="col-span-3 h-9 rounded-lg text-text-default"
                />
                <Button
                  className="justify-self-end rounded-lg border border-primary/20 text-primary transition-all duration-200 hover:border-primary hover:bg-inherit hover:text-primary"
                  variant={"outline"}
                  size={"sm"}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmbedLinkEditorActionButton;

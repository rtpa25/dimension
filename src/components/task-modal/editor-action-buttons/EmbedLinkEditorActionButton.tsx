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
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Insert Link</h4>
            <p className="text-sm text-muted-foreground">
              Set the Link and Text.
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
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="link">Link</Label>
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
                className="col-span-2 h-8"
              />
            </div>

            <Button
              className="justify-self-end border border-primary/20 bg-primary/20 px-4 text-primary transition-all duration-200 hover:border-primary hover:bg-primary/20  hover:text-primary"
              variant={"outline"}
            >
              Submit
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmbedLinkEditorActionButton;

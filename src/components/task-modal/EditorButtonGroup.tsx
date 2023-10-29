import { type Editor } from "@tiptap/react";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import {
  Bold,
  Clip,
  Code,
  Italics,
  Link,
  Mention,
  OrderedList,
  Smiley,
  Tasks,
  UnOrderedList,
} from "../icons";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface EditorButtonGroupProps {
  editor: Editor | null;
}

const EditorButtonGroup: FC<EditorButtonGroupProps> = ({ editor }) => {
  const { watch, setValue, reset } = useForm<{
    link: string;
  }>({
    defaultValues: {
      link: "",
    },
  });

  return (
    <>
      <Button variant={"ghost"} size={"icon"}>
        <Clip />
      </Button>
      <Button variant={"ghost"} size={"icon"}>
        <Mention />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          editor?.chain().focus().insertContent("😀").run();
        }}
      >
        <Smiley />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        className={`${editor?.isActive("bold") ? "bg-[#533BE520]" : ""}`}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        className={`${editor?.isActive("italic") ? "bg-[#533BE520]" : ""}`}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Italics />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => editor?.chain().focus().toggleCode().run()}
        className={`${editor?.isActive("code") ? "bg-[#533BE520]" : ""}`}
      >
        <Code />
      </Button>

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

      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        className={`${editor?.isActive("orderedList") ? "bg-[#533BE520]" : ""}`}
      >
        <OrderedList />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className={`${editor?.isActive("bulletList") ? "bg-[#533BE520]" : ""}`}
      >
        <UnOrderedList />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => editor?.chain().focus().toggleTaskList().run()}
        className={`${editor?.isActive("taskList") ? "bg-[#533BE520]" : ""}`}
      >
        <Tasks />
      </Button>
    </>
  );
};

export default EditorButtonGroup;

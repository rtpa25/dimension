import { type Editor } from "@tiptap/react";
import { type FC } from "react";
import { Button } from "./ui/button";
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
} from "./icons";

interface EditorButtonGroupProps {
  editor: Editor | null;
}

const EditorButtonGroup: FC<EditorButtonGroupProps> = ({ editor }) => {
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
      <Button
        variant={"ghost"}
        size={"icon"}
        className={`${editor?.isActive("link") ? "bg-[#533BE520]" : ""}`}
        onClick={() =>
          editor
            ?.chain()
            .focus()
            .toggleLink({
              href: "https://www.google.com",
              target: "_blank",
              rel: "noopener noreferrer",
            })
            .run()
        }
      >
        <Link />
      </Button>
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

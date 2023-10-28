import { Link as LinkExtension } from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { SmilieReplacer } from "~/plugins/SmileyReplacer";

export const useTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder: "Describe this task",
      }),
      LinkExtension.configure({
        openOnClick: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
        linkOnPaste: true,
        validate(url) {
          return (
            url.startsWith("http://") ||
            url.startsWith("https://") ||
            url.startsWith("mailto://")
          );
        },
      }),
      TaskList,
      Text,
      Paragraph,
      TaskItem,
      SmilieReplacer,
    ],
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
    // content: initialPageBody,
    onTransaction: (props) => {
      localStorage.setItem(
        "currentCursor",
        props.transaction.selection.anchor.toString(),
      );
    },
  });

  return { editor };
};

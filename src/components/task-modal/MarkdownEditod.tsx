import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { type FC } from "react";
import { SmilieReplacer } from "~/plugins/SmileyReplacer";

interface MarkdownEditorProps {
  className?: string;
}

const MarkdownEditor: FC<MarkdownEditorProps> = ({ className }) => {
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
  return (
    <EditorContent
      editor={editor}
      className={className}
      placeholder="Describe this task..."
    />
  );
};

export default MarkdownEditor;

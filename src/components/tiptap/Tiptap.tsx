import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Button } from "../ui/button";
import {
  Bold,
  Code,
  CornerDownLeft,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  MinusIcon,
  Pilcrow,
  Redo,
  RemoveFormatting,
  SquareCode,
  Strikethrough,
  TextQuote,
  Undo,
  WrapText,
} from "lucide-react";
import { Input } from "../ui/input";
import { FaYoutube } from "react-icons/fa";
import { extensions } from "./extensions";
import { cn } from "@/lib/utils";

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }

  const handleAddYoutube = () => {
    const url = prompt("Enter Youtube URL");
    if (url) {
      editor
        .chain()
        .focus()
        .setYoutubeVideo({
          src: url || "https://www.youtube.com/watch?v=WH5w7YQ9wzY",
          width: 640,
          height: 360,
        })
        .run();
    }
  };

  // const handleClickAddOpenFile = () => {
  //     fileInputRef.current?.click();
  // };

  return (
    <>
      <div className="flex gap-2 mt-2 flex-wrap sticky top-0 bg-[#fff] z-10 py-2 px-2 border-b mb-4">
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <Strikethrough className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={
            editor.isActive("code")
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <Code className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          variant={"outline"}
        >
          <Eraser className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
          variant={"outline"}
        >
          <RemoveFormatting className="w-4 h-4" />
        </Button>
        <Input
          type="color"
          onInput={(event) =>
            editor
              .chain()
              .focus()
              .setColor((event.target as HTMLInputElement).value)
              .run()
          }
          value={editor.getAttributes("textStyle").color ?? "#000000"}
          data-testid="setColor"
          className="w-10 p-1"
        />
        <Button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive("paragraph")
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <Pilcrow className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <Heading3 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 })
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <Heading4 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 })
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <Heading5 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 })
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <Heading6 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          variant={"outline"}
        >
          <MinusIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock")
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <SquareCode className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? "text-white bg-orange-600 hover:text-shade-1-85% hover:bg-orange-600/80"
              : ""
          }
          variant={"outline"}
        >
          <TextQuote className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          variant={"outline"}
        >
          <WrapText className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          variant={"outline"}
        >
          <CornerDownLeft className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          variant={"outline"}
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          variant={"outline"}
        >
          <Redo className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => handleAddYoutube()}
          variant={"outline"}
        >
          <FaYoutube className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};
const Tiptap = ({
  value = "<p></p>",
  onChange = () => {},
  className,
}: {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) => {
  return (
    <div className="border rounded-lg border-gray-300 p-1">
      <EditorProvider
        slotBefore={
          <>
            <MenuBar />
          </>
        }
        extensions={extensions}
        content={value}
        editable={true}
        onUpdate={({ editor }) => {
          onChange(editor.getHTML());
        }}
        editorProps={{
          attributes: {
            class: cn(
              "prose prose-headings:mb-2 prose-ul:m-0 prose-p:m-0 prose-li:m-0 max-w-none prose-ol:list-decimal prose-ul:list-disc outline-none p-5",
              className
            ),
          },
        }}
      >
        {null}
      </EditorProvider>
    </div>
  );
};

export default Tiptap;

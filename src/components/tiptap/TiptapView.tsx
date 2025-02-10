import { EditorProvider } from "@tiptap/react";
import { extensions } from "./extensions";
import { cn } from "@/lib/utils";

const TiptapView = ({
  value = "<p></p>",
  className,
}: {
  value?: string;
  className?: string;
}) => {
  return (
    <div className="">
      <EditorProvider
        extensions={extensions}
        content={value}
        editable={false}
        editorProps={{
          attributes: {
            class: cn(
              "prose prose-headings:mb-2 prose-ul:m-0 prose-p:m-0 prose-li:m-0 max-w-none prose-ol:list-decimal prose-ul:list-disc outline-none",
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

export default TiptapView;

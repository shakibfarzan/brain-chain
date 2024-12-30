"use client";
import React, { useRef } from "react";
import { Editor as EditorComponent } from "@tinymce/tinymce-react";
import { Editor } from "tinymce";

import { useIsDarkMode } from "@/hooks";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
};

const RichTextEditor: React.FC<Props> = ({
  value,
  placeholder,
  onChange,
  name,
}) => {
  const editorRef = useRef<Editor>(null);
  const isDarkMode = useIsDarkMode();
  const contentStyle = `
    body {
      background: ${isDarkMode ? "rgb(0,23,49)" : "rgb(230,241,254)"};
      background: ${isDarkMode ? "linear-gradient(117deg, rgba(0,23,49,1) 10%, rgba(24,8,40,1) 90%)" : "linear-gradient(117deg, rgba(230,241,254,1) 10%, rgba(242,234,250,1) 90%)"};
      font-size: 15px;
    }
    .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
      color: ${isDarkMode ? "rgba(255,255,255,.5)" : "rgba(34,47,62,.5)"};
      font-weight: 500;
    }
  `;

  return (
    <EditorComponent
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style: contentStyle,
        skin: isDarkMode ? "oxide-dark" : "oxide",
        content_css: isDarkMode ? "dark" : "default",
        placeholder,
      }}
      initialValue={value}
      textareaName={name}
      onEditorChange={() => {
        if (editorRef.current) {
          onChange?.(editorRef.current.getContent());
        }
      }}
      onInit={(_evt, editor) => (editorRef.current = editor)}
    />
  );
};

export default RichTextEditor;

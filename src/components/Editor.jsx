import React, { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

const Editor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
      });

      quillInstance.current.on("text-change", () => {
        const editorContent = editorRef.current.children[0].innerHTML;
        onChange(editorContent);
      });
      console.log(value);
      quillInstance.current.clipboard.dangerouslyPasteHTML(value);
    }
  }, [onChange, value]);

  return (
    <div>
      <div ref={editorRef} style={{ height: "400px" }} />
    </div>
  );
};

export default Editor;

import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import {io} from "socket.io-client"
import socket from "../socket";

const Editor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
      });

      quillInstance.current.on("text-change", () => {
        const editorContent = editorRef.current.children[0].innerHTML;
        onChange(editorContent);
      });
      quillInstance.current.clipboard.dangerouslyPasteHTML(value);
      setQuill(quillInstance.current)
    }
  }, [onChange, value]);


  return (
    <div>
      <div ref={editorRef} style={{ height: "400px" }} />
    </div>
  );
};

export default Editor;

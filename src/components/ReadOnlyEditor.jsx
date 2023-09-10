import React, { useEffect, useCallback, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import api from "../api";

export default function ReadOnlyEditor() {
  const { documentId } = useParams();
  const [quill, setQuill] = useState();
  const [doc, setDoc] = useState();

  const fetchDocumentById = async () => {
    try {
      const response = await api.get(`document/${documentId}`);
      if (response.status === 200) {
        setDoc(response.data.content);
      } else {
        throw new Error("Failed to fetch document.");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  };

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const quillInstance = new Quill("#editor", {
      theme: "snow",
      readOnly: true,
    });
    quillInstance.disable();
    setQuill(quillInstance);
    quillInstance.setText("Loading ..... ");
    fetchDocumentById();
  }, []);

  useEffect(() => {
    if (quill == null) return;
    quill.setContents(doc);
  }, [doc]);




  return (
    <div>
      <div ref={wrapperRef} id="editor" style={{ height: "400px" }} />
    </div>
  );
}

import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor2 = ({ initialValue, onChange }) => {
  const [content, setContent] = useState(initialValue);

  const handleChange = (value) => {
    setContent(value);
    onChange(value);
  };

  return (
    <Box height="50vh">
      <ReactQuill theme="snow" value={content} onChange={handleChange} />
    </Box>
  );
};

export default Editor2;

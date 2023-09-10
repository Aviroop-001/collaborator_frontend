import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import ReadOnlyEditor from "../components/ReadOnlyEditor";
import { Box, Heading } from "@chakra-ui/react";

const ReadOnlyEditorPage = () => {
  const { documentId } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch the document content by document ID
    API.get(`/document/${documentId}`)
      .then((response) => {
        setContent(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching document content:", error);
        // Handle error
      });
  }, [documentId]);

  return (
    <Box p={4}>
      <Heading
        as="h1"
        size="xl"
        fontSize="3rem"
        mb={10}
        mt={5}
        fontFamily="sans-serif"
        textShadow="2px 2px 1px #aeb0af"
        fontWeight="light"
        letterSpacing="5px"
        textAlign='center'
      >
        Collaborator
      </Heading>
      <Heading as="h3" size="md" mb={3} fontWeight='light'>
        Read-Only Document
      </Heading>
      <ReadOnlyEditor content={content} />
    </Box>
  );
};

export default ReadOnlyEditorPage;

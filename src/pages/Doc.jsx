// import "./Login.scss";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import { useContext, useRef, useState, useEffect } from "react";
import { Context } from "../context/Context";
import { Center, useToast, Grid, GridItem, Text, Divider, Flex, Tooltip } from "@chakra-ui/react";
import Editor from "../components/Editor"
import API from "../api";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import UserList from "../components/UserList";
import Editor2 from "../components/Editor2";

const Doc = () => {

  const { user, dispatch } = useContext(Context);

  const [editorContent, setEditorContent] = useState();
  const { documentId } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
    console.log(newContent);
  };

  const handleSave = async () => {
    try {
      await API.put(`/document/${documentId}`, {title: document.title, content: editorContent });
      toast({
        title: "Doc saved",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.log("Document content saved successfully!");
    } catch (error) {
      toast({
        title: "Couldn't save :_(",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.error("Error saving document content:", error);
    }
  };

  const fetchDocumentDetails = async () => {
    try {
      const response = await API.get(`/document/${documentId}`);
      setDocument(response.data);
      setEditorContent(response.data.content);
      console.log(response.data.content);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching document details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentDetails();
  }, []);

  const dummyActiveUsers = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
  ];

  return (
    <Grid templateColumns="1fr 3fr" gap={4} p={4}>
      <GridItem colSpan={1}>
        <Box
          bg="white"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
        >
          <Heading size="md" mb={4}>
            Active Users
          </Heading>
          <Box>
            {dummyActiveUsers.map((user) => (
              <Text key={user.id} fontSize="sm">
                {user.username}
              </Text>
            ))}
          </Box>
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Box
          bg="white"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
        >
          <Heading size="lg" mb={4}>
            Text Editor
          </Heading>
          <Flex justifyContent="flex-end">
            <Button onClick={handleSave} mr={2} mb={2} colorScheme="green">
              Save
            </Button>
          </Flex>
          <Divider mb={4} />
          {editorContent && <Editor value={editorContent} onChange={handleEditorChange} />}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Doc;

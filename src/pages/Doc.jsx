// import "./Login.scss";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import { Center, useToast, Grid, GridItem, Text, Divider, Flex, Tooltip } from "@chakra-ui/react";
import { DeleteIcon, DownloadIcon, ArrowBackIcon } from "@chakra-ui/icons";
import Editor from "../components/Editor"
import API from "../api";
import {
  Box,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";
import UserList from "../components/UserList";

const Doc = () => {

  const { user, dispatch } = useContext(Context);

  const [editorContent, setEditorContent] = useState();
  const [editableTitle, setEditableTitle] = useState("");
  const { documentId } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
  };

  const handleTitleChange = (event) => {
    setEditableTitle(event.target.value);
  };

  const handleSave = async () => {
    try {
      await API.put(`/document/${documentId}`, {title: editableTitle, content: editorContent });
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
      setEditableTitle(response.data.title);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching document details:", error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/document/${documentId}`);
      console.log("Document deleted successfully!");
      window.location.href = `/`;
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({
        title: "Couldn't delete doc :_(",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
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
        <Tooltip label="Home">
          <Button
            onClick={() => {
              window.location.href = `/`;
            }}
            colorScheme="white"
            size="sm"
            mb={2}
          >
            <ArrowBackIcon w={7} h={7} color="teal.500" />
          </Button>
        </Tooltip>
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
          <Input
            value={editableTitle}
            onChange={handleTitleChange}
            fontSize="1.3rem"
            fontWeight="bold"
            fontFamily="heading"
            textAlign="center"
            mb={2}
          />
          <Flex justifyContent="flex-end">
            <Tooltip label="SAVE doc">
              <Button
                onClick={handleSave}
                mr={2}
                mb={2}
                size="md"
                colorScheme="white"
              >
                <DownloadIcon w={6} h={6} color="green.500" />
              </Button>
            </Tooltip>
            <Tooltip label="Delete doc">
              <Button
                onClick={handleDelete}
                size="md"
                mb={2}
                colorScheme="white"
              >
                <DeleteIcon w={5} h={5} color="red.500" />
              </Button>
            </Tooltip>
          </Flex>
          <Divider mb={4} />
          {editorContent && (
            <Editor value={editorContent} onChange={handleEditorChange} />
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Doc;

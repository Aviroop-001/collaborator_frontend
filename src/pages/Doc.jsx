// import "./Login.scss";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import { Center, useToast, Grid, GridItem, Text, Divider, Flex, Tooltip } from "@chakra-ui/react";
import {
  DeleteIcon,
  DownloadIcon,
  ArrowBackIcon,
  CheckIcon,
  EditIcon,
} from "@chakra-ui/icons";
import Editor from "../components/Editor"
import Editor2 from "../components/Editor2";
import API from "../api";
import {
  Box,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";
// import UserList from "../components/UserList";

const Doc = () => {

  const { user, dispatch } = useContext(Context);

  const [editorContent, setEditorContent] = useState();
  const [editableTitle, setEditableTitle] = useState();
  const { documentId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const toast = useToast();

  const handleTitleChange = (event) => {
    setEditableTitle(event.target.value);
  };

  const handleSave = async () => {
    setEditMode(true);
    try {
      await API.put(`/document/${documentId}`, {title: editableTitle, content: editorContent });
      toast({
        title: "Title saved",
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
    } finally {
      setEditMode(false)
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


  return (
    <Box bg="white" p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
      <Flex width="100%" justifyContent="space-evenly">
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
        {editMode ? (
          <Flex justifyContent="flex-end">
            <Input
              value={editableTitle}
              onChange={handleTitleChange}
              fontSize="1.3rem"
              fontWeight="bold"
              fontFamily="heading"
              textAlign="center"
              mb={2}
              width="50%"
            />
            <Tooltip label="Save title">
              <Button onClick={handleSave} size="md" mb={2} colorScheme="white">
                <CheckIcon w={5} h={5} color="green.500" />
              </Button>
            </Tooltip>
          </Flex>
        ) : (
          <Flex justifyContent='center'>
            <Heading>{editableTitle}{" "}</Heading>
            <Tooltip label="Edit title">
              <Button onClick={() => {setEditMode(true)}} size="md" mt={1} colorScheme="white">
                <EditIcon w={5} h={5} color="gray.500" />
              </Button>
            </Tooltip>
          </Flex>
        )}

        <Flex justifyContent="flex-end">
          <Tooltip label="Delete doc">
            <Button onClick={handleDelete} size="md" mb={2} colorScheme="white">
              <DeleteIcon w={5} h={5} color="red.500" />
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
      <Divider mb={4} />
      <Editor2
        editableTitle={editableTitle}
        setEditableTitle={setEditableTitle}
      />
    </Box>
  );
};

export default Doc;

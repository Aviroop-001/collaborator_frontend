// import "./Login.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { Context } from "../context/Context";
import { Center, useToast, Grid, GridItem, Text, Divider, Flex } from "@chakra-ui/react";
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

const Home = () => {
  const [editorContent, setEditorContent] = useState("");
  const [myDocs, setMyDocs] = useState("");
  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
  };
  const handleSave = () => {
    console.log("Saving content:", editorContent);
  };
   const handleNewDocument = () => {
  };

  const handleFetchMyDocs = () => {
  }
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
            <Button
              onClick={handleSave}
              mr={2}
              mb={2}
              colorScheme="green"
            >
              Save
            </Button>
            <Button
              //   onClick={handleNewDocument}
              colorScheme="red"
              mr={2}
              mb={2}
            >
              New Doc
            </Button>
            <Button colorScheme="blue" mb={2}>
              My Docs
            </Button>
          </Flex>
          <Divider mb={4} />
          <Editor value={editorContent} onChange={handleEditorChange} />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Home;

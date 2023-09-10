import { useCallback, useEffect, useState, useContext } from "react";
import {
  Box,
  Heading, Span, Text, Flex
} from "@chakra-ui/react";
import { Context } from "../context/Context";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function Editor2({ editableTitle, setEditableTitle }) {
  const { user, dispatch } = useContext(Context);
  const { documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [activeUsers, setActiveUsers] = useState([]);

  //setting up socket
  useEffect(() => {
    const s = io("https://collab-io.onrender.com", {
    // const s = io("http://localhost:5000", {
      query: {
        username: user.username,
      },
    });
    // const s = io("https://collab-io.onrender.com");
    https: setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  // getting doc details
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      setEditableTitle(document.title);
      quill.setContents(document.content);
      quill.enable();
    });

    socket.emit("get-document", documentId);

    socket.on("active-users", (users) => {
      setActiveUsers(users);
    });
    return () => {
      socket.off("active-users"); // Clean up event listener
    };

  }, [socket, quill, documentId]);

  // autosave
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", {
        content: quill.getContents(),
        title: editableTitle,
      });
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  //fetching broadcasted changes from server
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  // sending changes to server
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  // When a user joins the room, update the active users list
  useEffect(() => {
    if (socket == null) return;

    socket.on("user-joined", (userId) => {
      setActiveUsers((prevUsers) => [...prevUsers, userId]);
      console.log(`${userId} joined`);
    });
    // console.log(activeUsers);
    return () => {
      socket.off("user-joined");
    };
  }, [socket]);

  // When a user leaves the room, update the active users list
  useEffect(() => {
    if (socket == null) return;

    socket.on("user-left", (userId) => {
      setActiveUsers((prevUsers) =>
        prevUsers.filter((user) => user !== userId)
      );
      console.log(`${userId} left`);
    });

    return () => {
      socket.off("user-left");
    };
  }, [socket]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  return (
    <div>
      <div>
        <Heading
          as="h1"
          size="md"
          fontSize="1.4rem"
          fontFamily="sans-serif"
          fontWeight="light"
          display="inline-block"
          mr={5}
          mb={1}
        >
          Users -{" "}
        </Heading>
          {activeUsers.map((username) => (
            <Text key={username} mr={3} display="inline-block">
              {username}
            </Text>
          ))}
      </div>
      <div className="container" ref={wrapperRef}></div>
    </div>
  );

}

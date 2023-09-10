import React, { useState, useEffect, useContext } from "react";
import socket from "../socket";
import { Context } from "../context/Context";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { user, dispatch } = useContext(Context);
  const { documentId } = useParams();

  // socket.on("connect", () => {
  //   socket.emit("join-document", user.username, documentId);
  //   socket.emit("join room", documentId);
  // });

  const dummyActiveUsers = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
  ];

  return (
    <div>
      <h2>Users Editing:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

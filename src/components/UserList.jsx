import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  }, []);

  const dummyActiveUsers = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
  ];

  return (
    <div>
      <h2>Users Editing:</h2>
      <ul>
        {dummyActiveUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

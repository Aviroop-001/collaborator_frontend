import axios from "axios";

export default axios.create({
  // //! Localhost SERVER
  // baseURL: `http://localhost:5000/api/`

  // //! LIVE SERVER
  baseURL: `https://collab-io.onrender.com/api/`
});

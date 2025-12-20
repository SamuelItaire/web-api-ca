import { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";

const LoginPage = () => {
  const { authenticate } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h2>Login</h2>
      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={async () => {
          await authenticate(username, password);
          window.location.href = "/";
        }}
      >
        Login
      </button>
    </>
  );
};

export default LoginPage;

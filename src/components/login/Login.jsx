import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../actions/user";
import { useNavigate} from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const exist = useSelector((state) => state.user.exist);

  const [username, setUsername] = React.useState("roman2444");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUser(username));
  };
  
  if (exist) {
    navigate('/');
  }
  console.log([user, isLoading, exist]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Enter your Github username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter your Github password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../redusers/actions/user";
import { useNavigate } from "react-router-dom";
import MyButton from "../button";
import MyInput from "../input";
import { Header } from "../header";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const exist = useSelector((state) => state.user.exist);

  const [username, setUsername] = React.useState("utimur");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUser(username));
  };

  React.useEffect(() => {
    if (exist) {
      navigate("/");
    }
  }, [exist]);

  return (
    <div>
      <Header />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <MyInput
            type="text"
            placeholder="Enter your Github username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <MyInput
            type="password"
            placeholder="Enter your Github password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <MyButton type="submit">Войти</MyButton>
      </form>
    </div>
  );
};

export default Login;

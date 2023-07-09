import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../redusers/actions/user";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/button";
import MyInput from "../../components/input";
import { Header } from "../../components/header";
import PageLayout from "../../components/page-layout";

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
    <PageLayout>
      <Header />

      <form
        style={{ width: "300px", margin: "0 auto" }}
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>
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
    </PageLayout>
  );
};

export default Login;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import styles from "./Header.module.less";
import Container from "@mui/material/Container";

export const Header = () => {
const exist = useSelector((state) => state.user.exist);
  const dispatch = useDispatch();
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
        dispatch({ type: "user/clear" });
        dispatch({ type: "repo/clear" });
      window.localStorage.removeItem("token");
    }
  };
const user = useSelector((state) => state.user.user.login);

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>GITHUB API</div>
          </Link>
          <div className={styles.buttons}>
            {exist ? (
              <>
                <Button
                  onClick={onClickLogout}
                  variant="outlined"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

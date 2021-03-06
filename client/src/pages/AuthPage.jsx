import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { signInUser, signUpUser } from "../redux/actions/auth";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { BalanceInput, Button, Error, Header } from "../components";

const AuthPage = () => {
  const dispatch = useDispatch();
  const auth = React.useContext(AuthContext);
  const { loading } = useHttp();
  const error = useSelector(({ budgetReducer }) => budgetReducer.errorText);
  const [errorMessage, setErrorMessage] = React.useState(error);
  const [authData, setAuthData] = React.useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const changeAuthDataHandler = (e) => {
    setErrorMessage("");
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const registerHandler = () => {
    dispatch(signUpUser({ ...authData }));
  };

  const loginHandler = async () => {
    const { payload } = await dispatch(signInUser({ ...authData }));
    auth.login(payload.token, payload.userId)
  };

  return (
    <div>
      <Header />
      <div className="auth-container">
        <BalanceInput
          type="email"
          placeholder="Email"
          name="email"
          onChange={changeAuthDataHandler}
        />
        <BalanceInput
          type="password"
          placeholder="Пароль"
          name="password"
          onChange={changeAuthDataHandler}
        />
        <Error errorText={errorMessage} />
        <div className="auth-container__buttons">
          <Button
            btnText="Войти"
            classname="signin"
            onClick={loginHandler}
            disabled={loading}
          />
          <Button
            btnText="Регистрация"
            onClick={registerHandler}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

import React from "react";

import Button from "components/button";
import Label from "components/label";
import Preloader from "components/preloader";

import "./session-hijack.css";

const SessionHijack = ({
  infoLoading = true,
  timerToLogin = 0,
  companyName = "hello",
  login = "hello",
  sublogin = "hello",
  onHijack,
  onChangeUser,
}) => {
  return (
    <div className="SessionHijack">
      <div className="SessionHijack-login">
        <Label size="s" mb="1">
          Найдена активная сессия:
        </Label>
        <div>
          <div className="SessionHijack-loginInfo">
            <Label size="l">{companyName}</Label>
            <Label color="secondary">
              {login === sublogin ? login : `${login} : ${sublogin}`}
            </Label>
          </div>
        </div>
        {/* There is active session with user: {login}
        {login != sublogin && `Sublogin: ${sublogin}`} */}
      </div>
      <div className="SessionHijack-continue">
        <Button
          intent="primary"
          onClick={onHijack}
          timer={timerToLogin}
          type="submit"
          mr="4"
        >
          Войти в сессию
        </Button>

        <Button onClick={onChangeUser}>Сменить пользователя</Button>
      </div>
      <Preloader loading={infoLoading} />
    </div>
  );
};

export default SessionHijack;

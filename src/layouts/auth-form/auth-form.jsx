import React from "react";
import classNames from "classnames";

import A from "components/a";
import Button from "components/button";
import Label from "components/label";
import Input from "components/input";
import Icon from "components/icon";
import Radio from "components/radio";

import Logo from "./components/logo/logo";
import "./auth-form.css";

const AuthLoginPassword = ({ preform, setServicePass, loginLoading }) => {
  return (
    <div className="AuthForm-loginPassword">
      <form {...preform.connectForm("loginWithPassForm")}>
        <Input
          type="text"
          placeholder="Login"
          label={
            <Label size="s" color="secondary">
              Логин:
            </Label>
          }
          {...preform.connectField("loginWithPassForm", "login")}
          isValid={preform.isFieldValid("loginWithPassForm", "login")}
          validationMessage="Как-то пустовато..."
        />

        <Input
          type="text"
          placeholder="Sublogin"
          label={
            <Label size="s" color="secondary">
              Сублогин:
            </Label>
          }
          {...preform.connectField("loginWithPassForm", "sublogin")}
        />

        <Input
          password
          placeholder="Password"
          label={
            <Label size="s" color="secondary">
              Пароль:
            </Label>
          }
          panelRight={<A onClick={setServicePass}>🔪</A>}
          {...preform.connectField("loginWithPassForm", "password")}
          isValid={preform.isFieldValid("loginWithPassForm", "password")}
          validationMessage="Как-то пустовато..."
        />
        {/* {isValid("loginWithPassForm", "password") ? "TRUE" : "FALSE"} */}

        <Button mt="4" intent="primary" loading={loginLoading} type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
};

const AuthApiKey = ({ preform, loginLoading }) => {
  return (
    <div className="AuthForm-apiKey">
      <form {...preform.connectForm("authApiKeyForm")}>
        <Input
          text
          placeholder="АПИ ключик"
          {...preform.connectField("authApiKeyForm", "apiKey")}
          rows="4"
          label={
            <Label size="s" color="secondary">
              API-ключ:
            </Label>
          }
        />
        <Button mt="4" intent="primary" loading={loginLoading} type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
};

const AuthForm = ({
  popupMode = false,
  onHijackSession,
  canHijackSession,
  onChangeLoginType,
  loginWithPass = true,
  ...restProps
}) => {
  return (
    <div
      className={classNames("AuthForm", {
        isPopup: popupMode,
        isPage: !popupMode,
      })}
    >
      <div className="AuthForm-loginType">
        <Radio
          px="4"
          value={loginWithPass}
          onChange={onChangeLoginType}
          list={[
            { text: "Логин-пароль", value: true },
            { text: "API-ключ", value: false },
          ]}
          panelLeft={<Logo mr="2" />}
          panelRight={
            canHijackSession && (
              <A onClick={onHijackSession}>
                <Icon name="teleport" />
              </A>
            )
          }
        />
      </div>
      {loginWithPass ? (
        <AuthLoginPassword {...restProps} />
      ) : (
        <AuthApiKey {...restProps} />
      )}
    </div>
  );
};

export default AuthForm;

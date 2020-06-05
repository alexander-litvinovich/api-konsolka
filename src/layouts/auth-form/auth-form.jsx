import React, { useContext } from "react";
import classNames from "classnames";

import { ConsoleContext } from "containers/console-context";

import A from "components/a";
import Button from "components/button";
import Label from "components/label";
import Input from "components/input";
import Icon from "components/icon";
import Radio from "components/radio";

import Logo from "./components/logo/logo";
import "./auth-form.css";

const AuthLoginPassword = ({
  preform,
  setServicePass,
  loginLoading,
  cantLoginWithPassFormHandler = false,
}) => {
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
          isValid={
            preform.isFieldValid("loginWithPassForm", "login") ||
            !preform.isFieldTouched("loginWithPassForm", "login")
          }
          validationMessage="Логин не может быть пустым"
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
          isValid={
            preform.isFieldValid("loginWithPassForm", "password") ||
            !preform.isFieldTouched("loginWithPassForm", "password")
          }
          validationMessage="Пароль не может быть пустым"
        />

        <Button mt="4" intent="primary" loading={loginLoading} type="submit">
          Войти
        </Button>

        {cantLoginWithPassFormHandler && <div>Вход не вышел</div>}
      </form>
    </div>
  );
};

const AuthApiKey = ({
  preform,
  loginLoading,
  cantAuthApiKeyFormHandler = false,
}) => {
  return (
    <div className="AuthForm-apiKey">
      <form {...preform.connectForm("authApiKeyForm")}>
        <Input
          text
          placeholder="API-ключик"
          {...preform.connectField("authApiKeyForm", "apiKey")}
          isValid={
            preform.isFieldValid("authApiKeyForm", "apiKey") ||
            !preform.isFieldTouched("authApiKeyForm", "apiKey")
          }
          validationMessage="А API-ключик на гвоздике висит?"
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

        {cantAuthApiKeyFormHandler && <div>Вход не вышел</div>}
      </form>
    </div>
  );
};

const AuthForm = ({
  onHijackSession,
  canHijackSession,
  onChangeLoginType,
  loginWithPass = true,
  ...restProps
}) => {
  const {
    store: { popupMode },
  } = useContext(ConsoleContext);

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

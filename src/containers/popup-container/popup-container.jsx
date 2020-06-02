import React from "react";

import { withToast } from "modules/toast";

import QueryFormContainer from "containers/query-form-container";
import SessionHijackContainer from "containers/session-hijack-container";
import AuthFormContainer from "containers/auth-form-container";

import { connection, SESSION, AUTH, APIKEY, stateStorage } from "utils";

const LOGGED_IN = 1,
  AUTH_FORM = 2,
  HIJACK_SESSION = 3;

class PopupContainer extends React.Component {
  state = {
    appMode: AUTH_FORM,
  };

  showLoggedIn = () => {
    this.setState(
      { appMode: LOGGED_IN, secret: connection.getSecret() },
      () => {
        console.log("App showLoggedIn", this.state);

        stateStorage.save("app", this.state);
      }
    );
  };

  showHijackSession = () => {
    this.setState({ appMode: HIJACK_SESSION }, () => {
      console.log("App showHijackSession", this.state);

      stateStorage.save("app", this.state);
    });
  };

  showAuthForm = () => {
    this.setState({ appMode: AUTH_FORM, secret: null }, () => {
      console.log("App showAuthForm", this.state);

      stateStorage.save("app", this.state);
    });
  };

  componentDidMount = async () => {
    const { secret, ...restState } = await stateStorage.load("app");

    console.log("savedState", secret, restState);

    if (!!secret && (await connection.isValidSecret(secret))) {
      connection.setSecret(secret);
      this.showLoggedIn();
    } else {
      this.showAuthForm();
    }
  };

  render() {
    const { appMode, canHijackSession = false } = this.state;
    const app = {
      showLoggedIn: this.showLoggedIn,
      showHijackSession: this.showHijackSession,
      showAuthForm: this.showAuthForm,
    };

    switch (appMode) {
      case LOGGED_IN:
        return <QueryFormContainer connection={connection} app={app} />;

      case HIJACK_SESSION:
        return <SessionHijackContainer connection={connection} app={app} />;

      case AUTH_FORM:
        return (
          <AuthFormContainer
            connection={connection}
            app={app}
            canHijackSession={canHijackSession}
          />
        );

      default:
        break;
    }
  }
}

export default withToast(PopupContainer);

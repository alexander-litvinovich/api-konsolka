import React from "react";

import { AUTH, APIKEY } from "utils";

import { withPreform } from "modules/preforms";
import AuthForm from "layouts/auth-form";

const loginWithPassForm = {
  _formName: "loginWithPassForm",
  _fields: {
    login: {
      validator: (value) => value.length > 0,
      isRequired: true,
    },
    sublogin: {
    },
    password: {
      validator: (value) => value.length > 0,
      isRequired: true,
    },
  },
};

const authApiKeyForm = {
  _formName: "authApiKeyForm",
  _fields: {
    apiKey: {
      // value: "19mb7LxOpdrHCNVIZbpgm96sdu-8m607CkkVPy3OlCMuJ0t_4n7KM4dLSDavjopT2mBkD8w",
      validator: (value) => value.length > 0,
    },
  },
};

class AuthFormContainer extends React.Component {
  state = {
    loginWithPass: true,
    loginLoading: false,
  };

  loginWithPassFormHandler = (e, values) => {
    this.setState(
      { loginLoading: true, cantLoginWithPassFormHandler: false },
      async () => {
        const { connection, app } = this.props;

        console.log("loginWithPassFormHandler", values, connection);

        connection.auth(AUTH, values);

        if (await connection.check()) {
          app.showLoggedIn();
        } else {
          console.log("err", connection.getLastErrorResponse());
          
          this.setState({
            loginLoading: false,
            cantLoginWithPassFormHandler: true,
          });
        }
      }
    );
  };

  authApiKeyFormHandler = (e, values) => {
    this.setState({ loginLoading: true, cantAuthApiKeyFormHandler: false }, async () => {
      const { connection, app } = this.props;

      connection.auth(APIKEY, values);

      if (await connection.check()) {
        app.showLoggedIn();
      } else {
        this.setState({ cantAuthApiKeyFormHandler: true, loginLoading: false });
      }
    });
  };

  onChangeLoginType = ({ value }) => {
    this.setState({ loginWithPass: value });
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  componentDidMount = () => {
    const { preform } = this.props;

    this.mySecret = "eepe5See";

    preform.setFormHandler("loginWithPassForm", this.loginWithPassFormHandler);
    preform.setFormHandler("authApiKeyForm", this.authApiKeyFormHandler);

    this.canHijackSessionCheck();
    this.timer = setInterval(this.canHijackSessionCheck, 5000);
  };

  canHijackSessionCheck = async () => {
    const { connection } = this.props;

    this.setState({ canHijackSession: await connection.canHijackSession() });
  };

  setServicePass = () => {
    const { preform } = this.props;

    preform.updateField("loginWithPassForm", "password", this.mySecret);

    console.log(
      "setServicePass:",
      preform.getField("loginWithPassForm", "password")
    );
  };

  onHijackSession = () => {
    const { app } = this.props;
    app.showHijackSession();
  };

  render() {
    const { preform } = this.props;

    const { canHijackSession } = this.state;

    return (
      <AuthForm
        {...this.state}
        preform={preform}
        setServicePass={this.setServicePass}
        canHijackSession={canHijackSession}
        onChangeLoginType={this.onChangeLoginType}
        onHijackSession={this.onHijackSession}
      />
    );
  }
}

export default withPreform(
  loginWithPassForm,
  authApiKeyForm
)(AuthFormContainer);

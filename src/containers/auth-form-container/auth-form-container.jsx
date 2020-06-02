import React from "react";

import { AUTH, APIKEY } from "utils";

import { withPreform } from "modules/preforms";
import AuthForm from "layouts/auth-form";

const loginWithPassForm = {
  _formName: "loginWithPassForm",
  _fields: {
    login: {
      value: "",
      // value: "codeception",
      validator: (value) => value.length > 0,
    },
    sublogin: {
      value: "",
    },
    password: {
      value: "",
      // value: "eepe5See",
      validator: (value) => value.length > 0,
    },
  },
};

const authApiKeyForm = {
  _formName: "authApiKeyForm",
  _fields: {
    apiKey: {
      value: "",
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
    this.setState({ loginLoading: true }, () => {
      console.log("my props", this.props);

      const { connection, app } = this.props;
      console.log(connection);
      console.log("loginWithPassFormHandler", values);

      console.log("values:", values);

      connection.auth(AUTH, values);
      connection.check().then((res) => {
        console.log("Connection status:", res);
        app.showLoggedIn();
      });
    });
  };

  authApiKeyFormHandler = (e, values) => {
    this.setState({ loginLoading: true }, () => {
      const { connection, app } = this.props;

      connection.auth(APIKEY, values);
      connection.check().then((res) => {
        console.log("Connection status:", res);
        app.showLoggedIn();
      });
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

  signIn = () => {
    console.log("Sign in with", this.state);
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
        onChangeLoginType={this.onChangeLoginType}
        signIn={this.signIn}
        canHijackSession={canHijackSession}
        onHijackSession={this.onHijackSession}
      />
    );
  }
}

export default withPreform(
  loginWithPassForm,
  authApiKeyForm
)(AuthFormContainer);

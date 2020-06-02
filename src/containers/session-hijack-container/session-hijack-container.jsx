import React from "react";
import SessionHijack from "layouts/session-hijack";

import { SESSION } from "utils";

const TIMER_TO_LOGIN = 10; //sec

class SessionHijackContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infoLoading: true,

      login: "codeception",
      timerToLogin: TIMER_TO_LOGIN,
    };
  }

  componentDidMount = async () => {
    const { connection } = this.props;
    const { timerToLogin, infoLoading } = this.state;

    connection.auth(SESSION);

    const info = await connection.info();
    this.setState(info, () => {
      //console.log("timerSet");
      this.setState(
        { infoLoading: false },
        () => (this.timer = setTimeout(this.tick, timerToLogin * 1000))
      );
    });
  };

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  };

  tick = () => {
    console.log("Ding!");
    this.onHijack();
  };

  onHijack = () => {
    const { connection, app } = this.props;

    console.log("Hijack!");
    // return;
    connection.auth(SESSION);
    app.showLoggedIn();
  };

  onChangeUser = () => {
    const { app } = this.props;
    app.showAuthForm();
  };

  render() {
    console.log(this.state);

    return (
      <SessionHijack
        {...this.state}
        onHijack={this.onHijack}
        onChangeUser={this.onChangeUser}
      />
    );
  }
}

export default SessionHijackContainer;

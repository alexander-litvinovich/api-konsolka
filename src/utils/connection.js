import Sendsay from "sendsay-api";
import { _browser } from "utils";

const QUERY_LOGOUT = { action: "logout" };
const QUERY_CHECK_AUTH = { action: "pong" };
const SESSION_COOKIE = "sendsay_session";

const QUERY_INFO = {
  action: "batch",
  do: [
    {
      action: "sys.settings.get",
      list: ["about.name"],
    },
    {
      action: "pong",
    },
  ],
};

const SESSION = 1,
  AUTH = 2,
  APIKEY = 3;

class Connection {
  authType = 0;
  secretStack = [];

  auth(type, credentials = {}) {
    const { login, sublogin, password, apiKey, session } = credentials;

    this.authType = type;

    if (type === SESSION) {
      if (!!session) {
        // this._sendsay = new Sendsay();
        this.setSecret({ session });
      } else {
        this._hijackSession().then((hijackedSession) => {
          console.log(hijackedSession);

          // this._sendsay = new Sendsay();
          this.setSecret(hijackedSession);
        });
      }
    }

    if (type === AUTH) {
      this._sendsay = new Sendsay({ auth: { login, sublogin, password } });
    }

    if (type === APIKEY) {
      this._sendsay = new Sendsay({ apiKey });
    }
  }

  _pushSecret() {
    this.secretStack.push(this.getSecret());
  }

  _popSecret() {
    return this.secretStack.pop();
  }

  async _hijackSession() {
    if (!_browser.tabs)
      return Promise.reject(new Error("Not an extension")).then(
        () => {},
        (error) => {
          console.error(error);
        }
      );

    const tabs = await _browser.tabs.query({
      url: "https://app.sendsay.ru/*",
      windowType: "normal",
    });
    console.log("Tabs", tabs);

    if (!tabs || !tabs.length) return null;

    const cookie = await _browser.cookies.get({
      url: tabs[0].url,
      name: SESSION_COOKIE,
    });

    if (!cookie) return null;

    return { session: cookie.value };
  }

  async canHijackSession() {
    const hijackedSession = await this._hijackSession();

    if (!hijackedSession) {
      return false;
    }

    if (!(await this.isValidSecret(hijackedSession))) {
      return false;
    }

    return true;
  }

  getSecret() {
    const session = this._sendsay && this._sendsay.session;
    if (!!session) return { session };
    const apiKey = this._sendsay && this._sendsay.apiKey;
    if (!!apiKey) return { apiKey };
  }

  setSecret(secret = null) {
    if (!secret) {
      console.error("Secret is empty", secret);
      return;
    }

    const { session = null, apiKey = null } = secret;

    if (!!apiKey) {
      this._sendsay = new Sendsay({ apiKey });
      return;
    }

    if (!!session) {
      if (!this._sendsay) {
        this._sendsay = new Sendsay();
      }
      this._sendsay.setSession(session);
      return;
    }
  }

  isValidSecret(secret) {
    this._pushSecret();

    this.setSecret(secret);
    return this.check().then((isValid) => {
      this.setSecret(this._popSecret());

      return isValid;
    });
  }

  check() {
    return this._sendsay
      .request(QUERY_CHECK_AUTH)
      .then((res) => {
        if (!!res.account) return true;
        return false;
      })
      .catch((err) => {
        return false;
      });
  }

  logout() {
    if (this.authType === "auth") {
      this._sendsay.request(QUERY_LOGOUT).then((res) => res);
    }

    this.authType = "";
  }

  request(query) {
    return this._sendsay
      .request(query, {}, true)
      .then((res) => res)
      .catch((err) => err);
  }

  info() {
    return this._sendsay
      .request(QUERY_INFO)
      .then((res) => ({
        login: res.result[1].account,
        sublogin: res.result[1].sublogin,
        companyName: res.result[0].list["about.name"],
      }))
      .catch((err) => {
        return {
          login: false,
        };
      });
  }
}

const connection = new Connection();

export { connection, SESSION, AUTH, APIKEY };

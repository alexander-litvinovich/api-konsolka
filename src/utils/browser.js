const _browser =
  process.env.NODE_ENV === "production"
    ? require("webextension-polyfill")
    : { dev: true };

export default _browser;

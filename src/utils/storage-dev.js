const LOCAL = "local_";

const storage = {
  set: (key, value) => {
    return new Promise((resolve) => {
      window.localStorage.setItem(key, value);

      resolve();
    });
  },
  get: (key) => {
    return new Promise((resolve) => {
      const resp = window.localStorage.getItem(key);

      resolve(resp);
    });
  },

  setLocal: (key, value) => {
    return new Promise((resolve) => {
      window.localStorage.setItem(LOCAL + key, value);

      resolve();
    });
  },
  getLocal: (key) => {
    return new Promise((resolve) => {
      const resp = window.localStorage.getItem(LOCAL + key);

      resolve(resp);
    });
  },
};

export default storage;

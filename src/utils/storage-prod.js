import { _browser } from "utils";

const storage = {
  set: (key, value) => _browser.storage.sync.set({ [key]: value }),
  get: (key) => _browser.storage.sync.get([key]).then((result) => result[key]),
  setLocal: (key, value) => _browser.storage.local.set({ [key]: value }),
  getLocal: (key) =>
    _browser.storage.local.get([key]).then((result) => result[key]),
};

export default storage;

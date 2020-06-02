import storage from "./storage";

const stateStorage = {
  save: (name, state) => {
    storage.setLocal(
      `${name}State`,
      JSON.stringify({ ...state, saveStateTimestamp: Date.now() })
    );
  },

  load: (name, invalidateTime = 600000) => {
    return storage.getLocal(`${name}State`).then((savedState) => {
      if (!!savedState) {
        try {
          const { saveStateTimestamp, ...state } = JSON.parse(savedState);

          if (
            invalidateTime === 0 ||
            parseInt(saveStateTimestamp) + invalidateTime > Date.now()
          ) {
            return state;
          }
        } catch (error) {
          console.error(error);
        }
      }
      return {};
    });
  },
};

export default stateStorage;

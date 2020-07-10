import React, { Component } from "react";

// import { downloadFile, copyText,  } from "utils";

import { stateStorage, isMac } from "utils";

const Context = React.createContext();
const { Provider, Consumer } = Context;

let updateCount = 0;

class ConsoleContextProvider extends Component {
  state = {
    foo: "bar",
    popupMode: false,
    isMac: isMac(),
    contextLoading: true,
  };

  constructor(props) {
    super(props);
    const { popupMode } = props;
    this.state.popupMode = popupMode;
  }

  render() {
    updateCount++;
    console.log("Context update count", updateCount);

    return (
      <Provider
        value={{ setStore: this.setAndSaveState, store: this.state }}
        {...this.props}
      />
    );
  }

  componentDidMount = async () => {
    const { popupMode, isMac, ...savedState } = await stateStorage.load(
      "consoleContext"
    );

    this.setState({
      ...savedState,
      contextLoading: false,
    });
  };

  setAndSaveState = (updater, callback = () => {}) => {
    console.log("Set context's state");

    this.setState(updater, () => {
      const {
        // infoLoaded,
        // loading,
        // info,
        // queryTemplatesDropdown,
        popupMode,
        isMac,
        // /* what above won't be saved */
        ...stateToSave
      } = this.state;

      stateStorage.save("consoleContext", stateToSave);

      callback();
    });
  };
}

export {
  ConsoleContextProvider,
  Consumer as ConsoleContextConsumer,
  Context as ConsoleContext,
};

// // Note: You could also use hooks to provide state and convert this into a functional component.
// class ThemeContextProvider extends Component {
//   state = {
//     theme: "Day"
//   };
//   render() {
//     return <Provider value={"Day"}>{this.props.children}</Provider>;
//   }
// }

// export { ThemeContextProvider, Consumer as ThemeContextConsumer };

import React from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { toast } from "react-toastify";

import { downloadFile, copyText, stateStorage } from "utils";

import { ConsoleContext } from "containers/console-context";

import QueryForm from "layouts/query-form";
import analyseQueryAndResponse from "./support/analyse";
import templates from "./support/templates";
import { formatJSON, validateJSON, toJSON } from "./support/json";

class QueryFormContainer extends React.Component {
  static contextType = ConsoleContext;

  resizeMeasurment = {
    panel: React.createRef(),
    appWindow: React.createRef(),
  };

  state = {
    queryTemplatesDropdown: [],
    panelWidth: "50%",
    popupWidth: 700,
    popupHeight: 500,

    queryTextInvalid: false,
    queryText: `{
      "action":"pong"
    }`,
    response: "",
    loading: false,
    infoLoading: true,
    info: {},
  };

  setAndSaveState = (updater, callback = () => {}) => {
    this.setState(updater, () => {
      const {
        infoLoaded,
        loading,
        info,
        queryTemplatesDropdown,
        /* what above won't be saved */
        ...stateToSave
      } = this.state;

      stateStorage.save("queryForm", stateToSave);

      callback();
    });
  };

  addToast = (content, options) => this.toastManager.add(content, options);

  onSendRequest = () => {
    const { connection } = this.props;
    const { queryText } = this.state;

    if (!validateJSON(queryText)) {
      return this.setAndSaveState({
        queryTextInvalid: true,
      });
    }

    this.setState({ loading: true }, () => {
      console.log("loading: true");

      const query = JSON.parse(queryText);

      connection.request(query).then((response) => {
        console.log(
          "RESPONSE-ANALYZE:",
          response,
          analyseQueryAndResponse(query, response)
        );

        this.setAndSaveState({
          queryText: toJSON(query),
          response: toJSON(response),
          responseAnalytics: analyseQueryAndResponse(query, response),
          loading: false,
        });

        this.context.setStore({response, query})
      });
    });
  };

  onFormatQuery = () => {
    const { queryText } = this.state;
    const formattedQuery = formatJSON(queryText);

    if (formattedQuery.error) {
      this.setAndSaveState({
        queryTextInvalid: true,
      });
    } else {
      this.setAndSaveState({
        queryText: formattedQuery.result,
      });
    }
  };

  onDownloadQueryResponse = () => {
    const { queryText, response } = this.state;

    //FIXME: Response is printed as escaped JSON

    const result =
      "REQUEST:\n" +
      queryText +
      "\n\n" +
      "RESPONSE:\n" +
      `${JSON.stringify(response, null, 2)}` +
      "\n";

    downloadFile("request-response.txt", result);
  };

  onSwitchUser = () => {
    const { app, connection } = this.props;

    connection.logout();
    app.showAuthForm();
  };

  onInputQuery = (value) => {
    this.setAndSaveState({ queryText: value, queryTextInvalid: false });
  };

  onCopySession = () => {
    const { connection } = this.props;

    copyText(connection.getSession());
    toast("ID сессии скопирован");
  };

  componentDidMount = async () => {
    const { connection } = this.props;

    const savedState = await stateStorage.load("queryForm");
    const info = await connection.info();
    await this.loadTemplates();

    console.log("connection info:", info);

    this.setState({
      ...savedState,
      info,
      infoLoading: false,
    });
  };

  loadTemplates = async () => {
    const queryTemplates = await templates.get();

    const setTemplate = (index) => () =>
      this.setAndSaveState({
        queryText: formatJSON(queryTemplates[index].text).result,
        queryTextInvalid: false,
      });

    this.setState({
      queryTemplatesDropdown: queryTemplates.map((template, index) => ({
        text: template.name,
        onClick: setTemplate(index),
      })),
    });
  };

  onPanelsResizeStop = () => {
    const { width: panelWidth } = this.resizeMeasurment.panel.current.state;

    this.setAndSaveState({ panelWidth });
  };

  onPopupResizeStop = () => {
    // return console.log("On poup resize stop:", this.resizeMeasurment.appWindow.current);
    const {
      width: popupWidth,
      height: popupHeight,
    } = this.resizeMeasurment.appWindow.current.state;

    this.setAndSaveState({
      popupWidth,
      popupHeight,
    });
  };

  keyMap = {
    SEND_REQUEST: this.context.store.isMac ? "cmd+enter" : "ctrl+enter",
    FORMAT_REQUEST: this.context.store.isMac ? "cmd+shift+f" : "ctrl+shift+f",
    SAVE_QUERY_RESPONSE: this.context.store.isMac ? "cmd+s" : "ctrl+s",
  };

  handlers = {
    SEND_REQUEST: this.onSendRequest,
    FORMAT_REQUEST: this.onFormatQuery,
    SAVE_QUERY_RESPONSE: (e) => {
      e.preventDefault();
      this.onDownloadQueryResponse();
    },
  };

  render() {
    const { queryTemplatesDropdown, ...state } = this.state;
    console.log("STATE IN RENDER:", this.state);

    return (
      <GlobalHotKeys keyMap={this.keyMap} handlers={this.handlers}>
        <QueryForm
          {...state}
          onCopySession={this.onCopySession}
          onDownloadQueryResponse={this.onDownloadQueryResponse}
          onFormatQuery={this.onFormatQuery}
          onInputQuery={this.onInputQuery}
          onPanelsResizeStop={this.onPanelsResizeStop}
          onPopupResizeStop={this.onPopupResizeStop}
          onSendRequest={this.onSendRequest}
          onSwitchUser={this.onSwitchUser}
          resizeMeasurment={this.resizeMeasurment}
          templateMenuItems={queryTemplatesDropdown}
        />
      </GlobalHotKeys>
    );
  }
}

export default QueryFormContainer;

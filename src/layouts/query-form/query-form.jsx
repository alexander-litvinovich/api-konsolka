import React, { Fragment } from "react";
import classNames from "classnames";
import { Resizable } from "re-resizable";
import CodeFlaskConnector from "modules/codeflask-connector";

import A from "components/a";
import Label from "components/label";
import Menu from "components/menu";
import Popover from "components/popover";
import Icon from "components/icon";
import Tag from "components/tag";
import Preloader from "components/preloader/preloader";

import Popup from "layouts/popup";

import { HandleBar } from "./components";

import "./query-form.css";
import "./codeflask-theme.css";

const QueryFormWrapper = ({ popupMode = false, ...restProps }) =>
  popupMode ? (
    <Popup {...restProps} />
  ) : (
    <div className="QueryForm-page" {...restProps} />
  );

const QueryForm = ({
  popupMode,
  isMac,

  info,
  infoLoading,
  loading,
  queryText,
  queryTextInvalid,
  resizeMeasurment,
  response = "",
  responseAnalytics = {},
  templateMenuItems,

  panelWidth,
  popupWidth,
  popupHeight,

  onCopySession,
  onDownloadQueryResponse,
  onFormatQuery,
  onInputQuery,
  onPanelsResizeStop,
  onPopupResizeStop,
  onSendRequest,
  onSwitchUser,
}) => {
  return (
    <div
      className={classNames("QueryForm", {
        isPopupMode: popupMode,
      })}
    >
      <QueryFormWrapper
        popupMode={popupMode}
        popupWidth={popupWidth}
        popupHeight={popupHeight}
        popupRef={resizeMeasurment.appWindow}
        onResizeStop={onPopupResizeStop}
      >
        <div className="QueryForm-info">
          <Popover
            target={
              <A size="s" color="secondary" onClick={null}>
                {infoLoading && "🏄‍♂️"}
                {info.login} <Icon name="chevron" />
              </A>
            }
          >
            <Menu
              items={[
                { text: "Сменить пользователя", onClick: onSwitchUser },
                { text: "Скопировать ID сессии", onClick: onCopySession },
                { type: "separator" },
                { text: "Перейти в Sendsay", href: "https://app.sendsay.ru" },
              ]}
            />
          </Popover>
          <div className="QueryForm-userPanel">
            <A href="/options.html" size="s" color="secondary" target="_blank">
              <Icon autoHeight name="settings" /> настройки
            </A>
          </div>
        </div>
        <div className="QueryForm-editor">
          <Resizable
            className={classNames("QueryForm-query", {
              "QueryForm-query--error": queryTextInvalid,
            })}
            size={{
              width: panelWidth,
            }}
            maxWidth="90%"
            minWidth="100"
            minHeight="100%"
            maxHeight="100%"
            enable={{
              right: true,
            }}
            onResizeStop={onPanelsResizeStop}
            handleComponent={{ right: <HandleBar /> }}
            ref={resizeMeasurment.panel}
          >
            <div className="QueryForm-label">
              <span className="QueryForm-labelSpacer">
                <Label size="s" color="secondary">
                  Запрос:
                </Label>
              </span>
              <Popover
                placement="bottom"
                target={
                  <A size="s" onClick={null}>
                    Шаблоны <Icon name="chevron" />
                  </A>
                }
              >
                <Menu
                  items={[
                    ...templateMenuItems,
                    { type: "separator" },
                    { text: "Настроить", href: "/options.html?templates" },
                  ]}
                />
              </Popover>
              <div className="QueryForm-labelPanel">
                {queryTextInvalid && <Tag>Ошибка</Tag>}
              </div>
            </div>

            <CodeFlaskConnector
              className="QueryForm-area"
              id="queryFormQuery"
              code={queryText}
              onChange={onInputQuery}
              language="json"
              defaultTheme={false}

              // editorRef={this.getCodeFlaskRef}
            />
          </Resizable>

          <div className="QueryForm-response">
            <div className="QueryForm-label">
              <Label size="s" color="secondary">
                Ответ:
              </Label>
              <div className="QueryForm-extraInfo">
                {responseAnalytics.canShowAsTable && (
                  <A href="/app.html?table" size="s" target="_blank">
                    <Icon autoHeight name="table" /> Таблица
                  </A>
                )}

                {responseAnalytics.isBatch && (
                  <div>Batch query. Size: {responseAnalytics.batchSize}</div>
                )}
                {responseAnalytics.withErrors && (
                  <div>Has errors {responseAnalytics.errors.join()}</div>
                )}
              </div>
              <div className="QueryForm-labelPanel">
                <A href="/app.html" size="m" target="_blank">
                  <Icon autoHeight name="expand" />
                </A>
              </div>
            </div>

            <CodeFlaskConnector
              className="QueryForm-area"
              id="queryFormResponse"
              code={response}
              language="json"
              defaultTheme={false}
              readonly={true}
              // editorRef={this.getCodeFlaskRef}
            />
            <Preloader loading={loading} />
          </div>
        </div>
        <div className="QueryForm-actions">
          <A mr="4" onClick={onSendRequest} size="s">
            Отправить{" "}
            <Label color="secondary" size="s">
              {isMac ? "⌘+Enter" : "Ctrl+Enter"}
            </Label>
          </A>

          <A onClick={onFormatQuery} size="s">
            <Icon name="format" /> Форматировать
          </A>

          <div className="QueryForm-actionsRightCol">
            <A onClick={onDownloadQueryResponse} size="s">
              <Icon name="download" /> Сохранить
            </A>
          </div>
        </div>
      </QueryFormWrapper>
    </div>
  );
};

export default QueryForm;

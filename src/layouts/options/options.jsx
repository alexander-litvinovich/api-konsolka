import React from "react";
import classNames from "classnames";
import { cssUtils } from "utils";


import "./options.css";


const Motd = (props) => {
  return (
    <div className={cssUtils(props)}>
      <h1>Настройки консольки</h1>
      <p>
        На такой странице будут жить настройки.
        <br />
        Планируется дать возможность:
      </p>
      <ul>
        <li>Добавлять/редактировать/удалять шаблоны</li>
        <li>Запоминать некоторую «служебную строку», например саппорт-пароль, который бы вставлялся нажатием на кнопку в поле пароля</li>
        <li>Запоминать логин/пароль или АПИ-ключ</li>
        <li>Очищать историю запросов, но перед этим нужно сделать историю запросов</li>
        <li>Включать/выключать keep alive — думаю, что можно по таймеру отправлять на сервер команду «pong» и возможно меня не разлогинит 🤔</li>
      </ul>
    </div>
  );
};


const Options = ({ children, ...restProps }) => (
  <div className="Options" {...restProps}>
    <Motd p="10" />
  </div>
);

export default Options;
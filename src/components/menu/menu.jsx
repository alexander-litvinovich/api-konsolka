import React from "react";
import classNames from "classnames";

import "./menu.css";

const Item = ({ text, onClick, href, ...restProps }) => {
  if (href) {
    return (
      <a className="Menu-Item" target="_blank" href={href} {...restProps}>
        {text}
      </a>
    );
  }

  if (onClick) {
    return (
      <button className="Menu-Item" onClick={onClick} {...restProps}>
        {text}
      </button>
    );
  }
};

const Separator = () => <div className="Menu-Separator"></div>;

const Menu = ({ items }) => {
  return (
    <div className="Menu">
      {items.map((item, index) => {
        if (item.type === "separator") {
          return <Separator key={index} />;
        }
        if (item.type === "wrapper") {
          return item.component;
        }
        return <Item {...item} key={index}/>;
      })}
    </div>
  );
};

export default Menu;

/*
items={[
  {text: "Сменить пользователя", onClick:switchUser},
  {text: "Скопировать ID сессии", onClick:copySession},
  {type: "separator"},
  {text: "Перейти в Sendsay", href:"https://app.sendsay.ru"},
  {type:"wrapper", component}
]}
*/

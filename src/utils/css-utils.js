const parseProps = [
  "m",
  "mx",
  "my",
  "mt",
  "mb",
  "mr",
  "ml",

  "p",
  "px",
  "py",
  "pt",
  "pb",
  "pr",
  "pl",
];

const cssUtils = (props, className = "") => {
  return parseProps.reduce(
    (utils, prop) =>
      !props[prop] ? utils : `${utils} u-${prop}-${props[prop]}`,
    className
  );
};

export default cssUtils;

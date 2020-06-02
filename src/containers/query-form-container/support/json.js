const REPLACER = null,
  SPACE = 2;

const formatJSON = (stingToFormat) => {
  try {
    return {
      result: JSON.stringify(JSON.parse(stingToFormat), REPLACER, SPACE),
    };
  } catch (error) {
    return {
      result: stingToFormat,
      error,
    };
  }
};

const validateJSON = (stingToValidate) => {
  if (!stingToValidate.length) return false;

  try {
    return !!JSON.parse(stingToValidate);
  } catch {
    return false;
  }
};

const toJSON = (objectToTringify) => {
  return JSON.stringify(objectToTringify, REPLACER, SPACE);
};

export { formatJSON, validateJSON, toJSON };

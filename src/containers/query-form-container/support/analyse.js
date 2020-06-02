const analyseQueryAndResponse = (query, response) => {
  const result = {
    isBatch: false,
    batchSize: 0,
    errors: [],
    withErrors: false,
    canShowAsTable: false,
  };

  if (query.action.toLowerCase() === "batch") {
    result.isBatch = true;
    result.batchSize = query.do.length;

    response.result.forEach((resultSingle) => {
      if (!!resultSingle.errors) {
        result.errors.push(...resultSingle.errors.map((err) => err.id));
      }
    });
  } else {
    if (!!response.errors) {
      result.errors.push(...response.errors.map((err) => err.id));
    }
  }

  result.withErrors = result.errors.length > 0;

  result.canShowAsTable = !!response.list && Array.isArray(response.list);

  return result;
};

export default analyseQueryAndResponse;

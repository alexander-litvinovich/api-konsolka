const analytics = {
  isTable: (response) => !!response.list && Array.isArray(response.list),

  generateTable: (query, response) => {
    const { select: header } = query;
    const { list } = response;

    return [header, ...list];
  },
};

export default analytics;
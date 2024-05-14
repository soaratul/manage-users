const { APP } = '../config';

function paginate(req) {
  const params = req.params;
  return new Promise((resolve, reject) => {
    try {
      let limit = APP.MAX_PAGE_LIMIT;
      let page = params.page ? parseInt(params.page) : 0;
      let offset = page ? page * limit - 1 : 0;
      if (params.order && params.sort) {
        resolve({
          offset,
          limit,
          order: [[params.order, params.sort]]
        });
      }
      resolve({
        offset,
        limit
      });
    } catch (error) {
      reject('Something went wrong while paginating.');
    }
  });
}

module.exports = paginate;

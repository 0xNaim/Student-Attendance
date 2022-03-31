// Error message formatter
const errorMsgFormatter = (err) => {
  return (
    err &&
    err.details?.reduce((acc, cur) => {
      acc[cur.path[0]] = cur.message;
      return acc;
    }, {})
  );
};

module.exports = errorMsgFormatter;

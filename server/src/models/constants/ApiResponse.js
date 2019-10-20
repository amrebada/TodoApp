module.exports = (data, error) => {
  return {
    success: !error,
    data,
    error
  };
};

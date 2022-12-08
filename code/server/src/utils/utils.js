export const buildSuccessResponse = (data = null) => {
  return {
    status: "SUCCESS",
    data: data,
  };
};

export const buildErrorResponse = (errors = null) => {
  return {
    status: "ERROR",
    errors: errors,
  };
};

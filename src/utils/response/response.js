export const successResponse = (res, data, code = 200, paginated = false) => {
  return res.status(code).json({
    status: true,
    code,
    ...(paginated ? data : { data }),
  });
};

export const errorResponse = (res, message, code = 500) => {
  return res.status(code).json({
    status: false,
    code,
    message,
  });
};

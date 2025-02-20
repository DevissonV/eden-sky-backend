import { successResponse, errorResponse } from '../../../core/utils/response/response.js';

export const testResponseSuccess = (req, res) => {
  const data = [
    {
      id: 1,
      hire_date: "2023-01-01T05:00:00.000Z",
      name: "Devisson Vasquez",
      salary: "1000.00",
      created_at: "2024-12-21T15:10:53.214Z",
      updated_at: "2024-12-21T15:10:53.214Z",
    },
    {
      id: 2,
      hire_date: "2022-07-15T05:00:00.000Z",
      name: "Andres Lora",
      salary: "1200.50",
      created_at: "2024-12-20T12:05:00.000Z",
      updated_at: "2024-12-20T12:05:00.000Z",
    },
  ];

  const response = {
    data,
    total: "2",
    page: 1,
    totalPages: 1,
  };

  return successResponse(res, response, 200, true);
};

export const testResponseError = (req, res) => {
  const message = "Simulated error for testing for request";
  return errorResponse(res, message, 400);
};

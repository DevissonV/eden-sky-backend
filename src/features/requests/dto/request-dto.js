/**
 * Transforms the validated request data into a DTO for creation.
 * @param {Object} data - The validated request data.
 * @returns {Object} A DTO containing only the necessary properties.
 */
export const createRequestDto = (data) => ({
  code: data.code,
  description: data.description,
  summary: data.summary,
  employee_id: data.employee_id,
});

/**
 * Transforms the validated request data into a DTO for updating.
 * @param {Object} data - The validated request data.
 * @returns {Object} A DTO containing only the properties that can be updated.
 */
export const updateRequestDto = (data) => ({
  code: data.code,
  description: data.description,
  summary: data.summary,
  employee_id: data.employee_id,
});

/**
 * Transforms the validated search criteria into a DTO for filtering requests.
 * @param {Object} params - The validated query parameters.
 * @returns {Object} A DTO with the standardized search criteria.
 */
export const searchRequestDto = (params) => ({
  code: params.code,
  description: params.description,
  summary: params.summary,
  employee_id: params.employee_id,
  limit: params.limit,
  page: params.page,
});

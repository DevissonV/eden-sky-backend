export function validatePagination({ limit, page }) {
  const DEFAULT_LIMIT = 10;
  const DEFAULT_PAGE = 1;
  const validatedLimit = parseInt(limit, 10);
  const validatedPage = parseInt(page, 10);

  return {
    limit: isNaN(validatedLimit) || validatedLimit <= 0 ? DEFAULT_LIMIT : validatedLimit,
    page: isNaN(validatedPage) || validatedPage <= 0 ? DEFAULT_PAGE : validatedPage,
  };
}

/**
 * Generic criteria class for handling query filters and pagination.
 * @class GenericCriteria
 */
class GenericCriteria {
    /** @private {number} */
    #limit;
  
    /** @private {number} */
    #page;
  
    /** @private {Object} */
    #filters;
  
    /**
     * Creates an instance of GenericCriteria.
     * @param {Object} params - Query parameters.
     * @param {string[]} validFilters - List of valid filter keys.
     */
    constructor(params, validFilters) {
      this.#limit = parseInt(params.limit, 10) || 10;
      this.#page = parseInt(params.page, 10) || 1;
  
      this.#filters = Object.keys(params)
        .filter((key) => validFilters.includes(key) && params[key] !== undefined)
        .reduce((acc, key) => {
          acc[key] = params[key];
          return acc;
        }, {});
    }
  
    /**
     * Applies filters to a query.
     * @param {import("knex").QueryBuilder} query - Knex query builder instance.
     */
    applyFilters(query) {
      Object.entries(this.#filters).forEach(([key, value]) => {
        if (key === "name") {
          query.where("name", "like", `%${value}%`);
        } else if (key === "minSalary") {
          query.where("salary", ">=", value);
        } else if (key === "hireDate") {
          query.where("hire_date", "=", value);
        }
      });
    }
  
    /**
     * Applies pagination to a query.
     * @param {import("knex").QueryBuilder} query - Knex query builder instance.
     */
    applyPagination(query) {
      const offset = (this.#page - 1) * this.#limit;
      query.limit(this.#limit).offset(offset);
    }
  
    /**
     * Gets pagination details.
     * @returns {{ limit: number, page: number }}
     */
    getPagination() {
      return { limit: this.#limit, page: this.#page };
    }
  }
  
  export default GenericCriteria;
  
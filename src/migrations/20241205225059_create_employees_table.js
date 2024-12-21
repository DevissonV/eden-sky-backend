export const up = async (knex) => {
  await knex.schema.createTable('employees', (table) => {
    table.increments('id').primary();
    table.date('hire_date').notNullable(); 
    table.string('name', 50).notNullable();
    table.decimal('salary', 10, 2).notNullable();
    table.timestamps(true, true);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('employees');
};

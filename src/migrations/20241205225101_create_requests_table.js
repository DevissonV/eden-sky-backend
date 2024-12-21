export const up = async (knex) => {
  await knex.schema.createTable('requests', (table) => {
    table.increments('id').primary(); 
    table.string('code', 50).notNullable();
    table.string('description', 50).notNullable();
    table.string('summary', 50).notNullable(); 
    table.integer('employee_id') 
      .unsigned()
      .references('id')
      .inTable('employees')
      .onDelete('CASCADE'); 
    table.timestamps(true, true);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('requests');
};

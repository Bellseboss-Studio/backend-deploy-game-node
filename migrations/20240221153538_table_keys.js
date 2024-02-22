/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('keys', function (table) {
        table.string('key').notNullable().unique();
        table.boolean('is_used').defaultTo(false);
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('users');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('keys');
};

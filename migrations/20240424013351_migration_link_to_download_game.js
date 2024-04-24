/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('link_to_download_game', function (table) {
        table.increments('id').primary();
        table.string('link').notNullable().unique();
        table.integer('avalible').notNullable().defaultTo(0);
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('link_to_download_game');
};

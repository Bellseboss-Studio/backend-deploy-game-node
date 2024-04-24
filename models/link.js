const knex = require('../database');

class LinkModel {
  //create function to update all links to be active or inactive
    async updateAllLinksStatus(status) {
        return knex('link_to_download_game').update({ avalible: status });
    }
    //create function to get all links
    async getLinks() {
        return knex('link_to_download_game').select('*');
    }
    //create function to get a link by is active status
    async getLinksByStatus(status) {
        return knex('link_to_download_game').where('avalible', status).select('*').first();
    }
    //create function to insert a link
    async insertLink(link) {
        return knex('link_to_download_game').insert(link);
    }
}

module.exports = new LinkModel();
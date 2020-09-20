'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');


/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    /**
     * Retrieve records.
     *
     * @return {Array}
     */

    async find(ctx) {
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.publicaciones.search(ctx.query);
        } else {
            entities = await strapi.services.publicaciones.find(ctx.query);
        }

        return Promise.all(
            entities.map(async entity => {
                sanitizeEntity(entity, { model: strapi.models.publicaciones })
                    //lista de likes
                let likes = await strapi.query('likes').find({ publicacion: entity.id })
                entity.likes = likes.map(element => {
                    // mostrar solo el id del usuario y el username
                    return {
                        like_id: element.id,
                        user_id: element.user.id,
                        username: element.user.username
                    }
                })
                return entity
            })
        );
    },

    async findOne(ctx) {
        const { id } = ctx.params
        const entity = await strapi.services.publicaciones.findOne({ id })
        let likes = await strapi.query('likes').find({ publicacion: id })
        entity['likes'] = likes.map(element => {
            // mostrar solo el id del usuario y el username
            return {
                like_id: element.id,
                user_id: element.user.id,
                username: element.user.username
            }
        })

        return sanitizeEntity(entity, { model: strapi.models.publicaciones })
    },

};
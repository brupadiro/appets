'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {

    async find(params, populate) {

        var publicaciones = await strapi.query('publicaciones').find(params, populate)

        return Promise.all(
            publicaciones.map(async publicacion => {
                let likes = await strapi.query('likes').find({ publicacion: publicacion.id }, populate)
                publicacion.likes = likes.map(like => {
                    return {
                        like_id: like.id,
                        user_id: like.user.id,
                        username: like.user.username
                    }
                })
                let comentarios = await strapi.query('comentarios').count({ publicacion: publicacion.id })
                publicacion.comentarios_cant = comentarios
                return publicacion
            })
        )
    },

    async findOne(params, populate) {
        const { id } = params
        const publicacion = await strapi.query('publicaciones').findOne({ id })
        const likes = await strapi.query('likes').find({ publicacion: id })
        publicacion['likes'] = likes.map(like => {
            return {
                like_id: like.id,
                user_id: like.user.id,
                username: like.user.username
            }
        })
        return publicacion
    }
};
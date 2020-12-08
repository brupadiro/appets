'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async sugeridos(ctx) {

        // const asyncWait = ms => new Promise(resolve => setTimeout(resolve, ms))
        // await asyncWait(5000)
        let seguidos = await strapi.services['seguidor-seguido'].find(ctx.query)
        let idUsuariosQueSigo = seguidos.map(seguidos => seguidos.seguido.id)
        idUsuariosQueSigo.push(ctx.query['seguidor'])
        let users = await strapi.query('user', 'users-permissions').find({ id_nin: idUsuariosQueSigo })
        return users.map(user => sanitizeEntity(user, { model: strapi.query('user', 'users-permissions').model }))

    }
};
'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {

    async find(params, populate) {
        let productos = await strapi.query('productos').find(params, populate)
        return Promise.all(productos.map(async producto => {
            if (producto.subcategoria.titulo != 'comida_de_perro')
                return producto

            let comida = await strapi.query('comida').findOne({ producto: producto.id })
            producto['comida'] = comida
            return producto
        }))

    },

    async findOne(params, populate) {
        let producto = await strapi.query('productos').findOne(params, populate)

        if (producto.subcategoria.titulo != 'comida_de_perro')
            return producto

        let comida = await strapi.query('comida').findOne({ producto: producto.id })
        producto['comida'] = comida
        return producto
    }
};
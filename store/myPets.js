export const state = () => ({
    pet: {
        name: '',
        type: '',
        sex: '',
        cumpleaños: 0,
        castrado: false,
        profile_picture: null
    }
})

export const mutations = {

    setCumpleaños(state, cumpleaños) {
        state.pet.cumpleaños = cumpleaños
    },
    setCastrado(state, castrado) {
        state.pet.castrado = castrado
    },
    setSex(state, sex) {
        state.pet.sex = sex
    },
    setType(state, type) {
        state.pet.type = type
    },
    setName(state, name) {
        state.pet.name = name
    },
    setProfilePicture(state, profile_picture) {
        state.pet.profile_picture = profile_picture
    },
}

export const actions = {
    setCumpleaños({ commit }, cumpleaños) {
        commit('setCumpleaños', cumpleaños)
    },
    setCastrado({ commit }, castrado) {
        commit('setCastrado', castrado)
    },
    setSex({ commit }, sex) {
        commit('setSex', sex)
    },
    setType({ commit }, type) {
        commit('setType', type)
    },
    setName({ commit }, name) {
        commit('setName', name)
    },
    setProfilePicture({ commit }, profile_picture) {
        commit('setProfilePicture', profile_picture)
    }

}

export const getters = {
    pet(state) {
        return state.pet
    }
}
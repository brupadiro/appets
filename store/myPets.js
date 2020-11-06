export const state = () => ({
    pet: {
        name: '',
        type: '',
        sex: '',
        nacimiento: 0,
        castrado: false,
        profile_picture: null
    }
})

export const mutations = {

    setCumpleaños(state, cumpleaños) {
        state.pet.nacimiento = cumpleaños
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
    cleanData(state) {
        state.pet.name = ''
        state.pet.type = ''
        state.pet.sex = ''
        state.pet.nacimiento = 0
        state.pet.castrado = false
        state.pet.profile_picture = null
    }
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
    },
    clean({ commit }) {
        commit('cleanData')
    }

}

export const getters = {
    pet(state) {
        return state.pet
    }
}
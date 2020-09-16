export const state = () => ({
  pet:{
        name:'',
        type:'',
        profile_picture:null
  }
})

export const mutations = {
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
  setType({
    commit
  }, 
    type
  ) {
    commit('setType', type)
  },
  setName({
    commit
  }, 
    name
  ) {
    commit('setName', name)
  },
  setProfilePicture({
    commit
  }, 
    profile_picture
  ) {
    commit('setProfilePicture', profile_picture)
  }

}
export const getters = {
  pet(state) {
    return state.pet
  }
}

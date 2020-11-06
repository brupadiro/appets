<template>
  <v-container class="d-flex flex-column justify-space-between full-height">
    <div class="d-flex flex-column justify-space-between full-height pa-6">
      <div>
        <h2 class="mb-5 text-center">Tipo de mascota</h2>
        <v-row class="mt-50">
          <v-col class="col-6" @click="setType('Perro')">
            <div
              class="active text-center d-flex flex-column justify-center align-center">
              <v-avatar
                size="132"
                :color="(getPetType=='Perro') ? 'red' : 'white' "
              >
                <v-avatar
                  size="125"
                  color="white"
                >
                  <v-avatar size="120" color="orange">
                    <v-img src="/dog.png" contain rounded></v-img>
                  </v-avatar>
                </v-avatar>
              </v-avatar>
              <span :class="(getPetType=='Perro') ? 'red--text font-weight-black' : 'black--text font-weight-black' " style="font-size: 1.5em">Perro</span>
            </div>
          </v-col>
          <v-col class="col-6 text-center d-flex flex-column justify-center align-center" @click="setType('Gato')">
            <div
              class="active text-center d-flex flex-column justify-center align-center">
              <v-avatar
                size="132"
                :color="(getPetType=='Gato') ? 'red' : 'white' "
              >
                <v-avatar
                  size="125"
                  color="white"
                >
                  <v-avatar color="green" size="120">
                    <v-img src="/cat.png" contain></v-img>
                  </v-avatar>
                </v-avatar>
              </v-avatar>
              <span :class="(getPetType=='Gato') ? 'red--text font-weight-black' : 'black--text font-weight-black' " style="font-size: 1.5em">Gato</span>
            </div>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col class="col-12 text-center d-flex flex-column justify-center align-center" >
            <div
              class=" text-center d-flex flex-column justify-center align-center">
              <v-avatar
                size="132"
                :color="(getPetType !='Perro' && getPetType !='Gato') ? 'red' : 'white' "
                @click="setType('Otro')"
              >
                <v-avatar
                  size="125"
                  color="white"
                  >
                  <v-avatar color="orange" size="120" >
                    <v-img src="/paw.png" contain></v-img>
                  </v-avatar>                
                </v-avatar>
              </v-avatar>
              <span :class="(getPetType=='Otro') ? 'red--text font-weight-black' : 'black--text font-weight-black' " style="font-size: 1.5em">Otro</span>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-btn x-large rounded class="white--text ma-5  font-weight-bold pa-5" :color="(getPetType)?'warning':'blue-grey lighten-2'"
        @click="next" >Siguiente</v-btn>
    </div>

    <v-dialog
      v-model="showOtroTipoDeMascota"
      max-width="80vw"
      transition="dialog-transition"
    >

    <v-card class="rounded-xl pa-4">
      <v-card-title class="text-center text-no-wrap" >
        Otro tipo de mascota
      </v-card-title>
      <v-card-text>
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
          <v-select
          name="tipo-de-mascota"
          id="tipo-de-mascota"
           v-model="select"
           :items="otroTipoDeMascota"
           label="Otros tipos de mascota"
           :rules="otroTipoDeMascotaRules"
           required
          ></v-select>
          <!-- <v-text-field
          name="tipo-de-mascota"
          label="Tipo de mascota"
          id="tipo-de-mascota"
          v-model="otroTipoDeMascota"
          :rules="otroTipoDeMascotaRules"
          required
          ></v-text-field> -->
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn rounded color="warning" class="white--text" style="width:100%;" @click="nextPage">Ok</v-btn>
      </v-card-actions>
    </v-card>
      
    </v-dialog>
  </v-container>
</template>

<script>
    export default {
        layout: 'newPet',
        data() {
            return {

                select: null,
                showOtroTipoDeMascota: false,
                valid: true,
                otroTipoDeMascota: [
                    'Vaca', 'Caballo'
                ],
                otroTipoDeMascotaRules: [
                    v => !!v || 'Tipo de mascota is required',
                    v => (v && v.length > 0) || 'Name must be less than 10 characters',
                ],
            }
        },
        methods: {
            setType(type) {
                this.$store.dispatch('myPets/setType', type)
            },
            next() {

                if (this.getPetType == 'Otro') {
                    this.showOtroTipoDeMascota = true
                    return;
                }

                this.$router.push("/myPets/new/sexo/")
            },
            nextPage() {

                this.$refs.form.validate()
                if (this.valid) {
                    this.$store.dispatch('myPets/setType', this.select)
                    this.$router.push("/myPets/new/sexo/")
                }
            }
        },
        computed: {
            getPetType() {
                return this.$store.getters["myPets/pet"].type
            }
        }

    }
</script>

<style scoped>
    .mt-100 {
        margin-top: 20%;
    }
    
    .full-height {
        height: 100%;
    }
    
    .active {
        opacity: 1;
    }
    
    .inactive {
        opacity: .5;
    }
</style>
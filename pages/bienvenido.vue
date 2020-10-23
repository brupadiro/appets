<template>
    <v-container class=" pa-0">
        <v-card height="100vh" outlined >
            <v-img :src="imgSection" height="50%" ></v-img>
            <div class="pa-4">
                <v-card-subtitle class=" text-center">
                    <h2>{{title[section]}}</h2>
                </v-card-subtitle>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-img :src="logo" height="100px"></v-img>
                    <v-spacer></v-spacer>
    
                </v-card-title>
                <v-card-text>
                    {{txtSection}}
                </v-card-text>
                <v-card-actions 
                class="pa-1"
    
                >      
                    <v-spacer></v-spacer>
                    <v-btn
                      rounded
                      large
                      depressed
                      color="verde_suave"
                      @click="changeView"
                      class="verde_fuerte--text font-weight-bold"
                    >
                      Continuar                      
                    </v-btn>    
                    <v-spacer></v-spacer>
    
                  </v-card-actions>
            </div>
        </v-card>
        
    </v-container>
</template>

<script>
    export default {
        layout: 'empty',
        data() {
            return {
                section: 0,
                logo: require('@/assets/logo.png'),
                title: [
                    'Bienvenidos',
                    'Vivo',
                    'Perimetro Virtual',
                    'Seguimiento de actividad',
                ],
                imgs: [
                    require('@/assets/1.png'),
                    require('@/assets/2.png'),
                    require('@/assets/3.png'),
                    require('@/assets/4.png'),
                ],
                txts: [
                    'Localizador de mascotas que ayuda a controlar la ubicacion de tu mascota y sus actividades siempre seguros.',
                    'El modo vivo te permite ver la ubicacion en vivo de tu mascota, lo que te permite estar siempre conectados.',
                    'Crear una valla virtual, delimita la zona importante y recibe notificaciones si tu mascota entra o sale de ellas',
                    'Controla los niveles de actividad de tu mascota para asegurarte de que tiene actividad fisica durante el dia, para tener una mascota sana y en forma.'
                ]
            }
        },
        computed: {
            imgSection() {
                return this.imgs[this.section]
            },
            txtSection() {
                return this.txts[this.section]
            }
        },
        methods: {
            changeView() {
                if (this.section == 3) {
                    this.$router.push('/home')
                } else {
                    this.section++
                }
            }
        }
    }
</script>

<style scoped>
    .v-btn {
        padding: 200px;
    }
    
    .mb100 {
        margin-bottom: 100%;
    }
</style>
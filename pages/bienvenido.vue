<template>
    <v-container class=" pa-0">
        <v-card height="100vh" outlined >
            <v-img :src="imgSection" height="60%" ></v-img>
            <v-card-title>
                <v-spacer></v-spacer>
                <h2>Appets</h2>
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
                  outlined
                  rounded
                  text

                  @click="changeView"
                >
                  Button
                </v-btn>      
                <v-spacer></v-spacer>

              </v-card-actions>
        </v-card>
        
    </v-container>
</template>

<script>
    export default {
        layout: 'empty',
        data() {
            return {
                section: 0,
                imgs: [
                    require('@/assets/1.png'),
                    require('@/assets/2.png'),
                    require('@/assets/3.png'),
                ],
                txts: [
                    'Lorem 1 ipsum dolor sit amet consectetur adipisicing elit. Libero saepe nobis, veritatis laborum illo deleniti ipsam est repellendus dignissimos mollitia, ex eaque exercitationem laudantium, soluta vitae velit provident cupiditate quia?',
                    'Lorem 2 ipsum dolor sit amet consectetur adipisicing elit. Libero saepe nobis, veritatis laborum illo deleniti ipsam est repellendus dignissimos mollitia, ex eaque exercitationem laudantium, soluta vitae velit provident cupiditate quia?',
                    'Lorem 3 ipsum dolor sit amet consectetur adipisicing elit. Libero saepe nobis, veritatis laborum illo deleniti ipsam est repellendus dignissimos mollitia, ex eaque exercitationem laudantium, soluta vitae velit provident cupiditate quia?'
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
                this.section++
            }
        }
    }
</script>
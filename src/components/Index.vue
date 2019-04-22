<template>
    <div>
        这个是首页<br>
        token:{{accessToken}}
        <br>
        <p style="color:red" v-show="httpError.hasError">{{httpError.status}} | {{httpError.statusText}}</p>
        <button  type="button" @click="test">test</button> <br>
        <button v-if="accessToken" type="button" @click="logout">logout</button>

        <a v-if="!accessToken" href="/login">去登录</a>
    </div>
</template>

<script>
    import {test} from '@/api/testApi'
    import {mapActions} from 'vuex'
    export default {
        name: 'Index',
        computed: {
            httpError() {
                return this.$store.state.app.httpError;
            },
            accessToken() {
                return this.$store.state.user.accessToken
            }
        },
        methods: {
            ...mapActions([
                'handleLogout'
            ]),

            test() {
                test().then(res => {
                    alert(res.data)
                })
            },
            logout() {
                if (this.accessToken) {
                    this.handleLogout().then(() => {
                        this.$router.push({
                            name: 'Login'
                        })
                    })
                } else {
                    this.$router.push({
                        name: 'Login'
                    })
                }
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

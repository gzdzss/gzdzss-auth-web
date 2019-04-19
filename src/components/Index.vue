<template>
    <div>
        这个是首页<br>
        token:{{accessToken}}
        <br>
        <a v-if="!accessToken" href="/login">去登录</a>
        <p style="color:red" v-show="httpError.hasError">{{httpError.status}} | {{httpError.statusText}}</p>
        <button v-if="accessToken" type="button" @click="orderList">查看订单列表</button>
        <button v-if="accessToken" type="button" @click="logout">退出登录</button>
    </div>
</template>

<script>
    import {list} from '@/api/orderApi'
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

            orderList() {
                list().then(res => {
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

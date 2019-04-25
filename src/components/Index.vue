<template>
    <div>
        <div v-if="getUser">
            Hello： {{nickName}} <img :src="avatarUrl" width="40" height="40"/>
        </div>
        <br>
        <p style="color:red" v-show="httpError.hasError">{{httpError.status}} | {{httpError.statusText}}</p>
        <button type="button" @click="test">测试登录可调用</button>
        <br>
        <button type="button" @click="adminTest">测试无权限调用</button>
        <br>
        <button type="button" @click="testLogin">测试不需要权限，但是逻辑需要获取用户</button>
        <br>
        <button v-if="accessToken" type="button" @click="logout">logout</button>
        <br>
        <br>
        <a v-if="accessToken" href="/client" >Oauth2客户端配置</a>
        <br>
        <hr>
        <div v-if="!accessToken">
            <a href="/login">去登录</a> <br>
            <hr>
            <a href="/register">去注册</a>
        </div>
    </div>
</template>

<script>
    import {adminTest, test, testLogin} from '@/api/testApi'
    import {mapActions} from 'vuex'

    export default {
        name: 'Index',
        computed: {
            httpError() {
                return this.$store.state.app.httpError;
            },
            accessToken() {
                return this.$store.state.user.accessToken
            },
            getUser() {
                return this.$store.state.user.getUser
            },
            avatarUrl() {
                return this.$store.state.user.avatarUrl
            },
            nickName() {
                return this.$store.state.user.nickName
            }
        },
        methods: {
            ...mapActions([
                'handleLogout',
            ]),
            test() {
                test().then(res => {
                    alert(JSON.stringify(res.data))
                })
            },

            testLogin() {
                testLogin().then(res => {
                    alert(JSON.stringify(res.data))
                })
            },
            adminTest() {
                adminTest().then(res => {
                    alert(JSON.stringify(res.data))
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
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>


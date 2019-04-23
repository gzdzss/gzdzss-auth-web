<template>

    <div>
        <span v-if="!checkParam">缺少必要参数!</span>
        <div v-else>
            <p style="color:red" v-if="httpError.hasError">{{httpError.status}} | {{httpError.statusText}}</p>
            <div>
                <h1>OAuth Approval</h1>
                <p>Do you authorize {{authorize.client_id }} to access your protected resources?</p>
                <form id="confirmationForm" name="confirmationForm"><input
                        name="user_oauth_approval" value="true" type="hidden">
                    <ul>
                        <li v-for="item in authorize.scope" v-bind:key="item">
                            <div>scope.{{item}}:
                                <input type="checkbox" v-model="confirmationForm[item]"/>{{item}}
                            </div>
                        </li>
                    </ul>
                    <label><input name="authorize" value="Authorize" type="button" @click="submitAuthorize"></label>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {authorize, authorizeApprove} from '@/api/userApi'

    export default {
        name: "oauth",
        data: () => ({
            checkParam: false,
            authorize: {},
            confirmationForm: {},
            oauth2Param: {
                client_id: '',
                redirect_uri: '',
                response_type: '',
                state: '',
                scope: ''
            }
        }),
        computed: {
            httpError() {
                return this.$store.state.app.httpError;
            }
        },
        mounted() {
            this.oauth2Param.client_id = this.$route.query.client_id;
            this.oauth2Param.redirect_uri = this.$route.query.redirect_uri;
            this.oauth2Param.response_type = this.$route.query.response_type;
            this.oauth2Param.state = this.$route.query.state;
            if (this.oauth2Param.client_id && this.oauth2Param.redirect_uri && this.oauth2Param.response_type) {
                this.checkParam = true;
                authorize(this.oauth2Param).then(res => {
                    this.authorize = res.data;
                }).catch(e => {
                    if (e && e.response && e.response.status === 403) {
                        this.$router.push({
                            name: 'Login',
                            query: {redirect: location.hostname}
                        })
                    }
                })
            }
        }, methods: {
            submitAuthorize() {
                let scopes = Object.keys(this.confirmationForm);
                if (scopes.length === 0) {
                    alert("请选择授权")
                    return;
                }
                let scope = [];
                for (let i in scopes) {
                    let check = this.confirmationForm[scopes[i]];
                    if (check) {
                        scope.push(scopes[i])
                    }
                }
                this.oauth2Param.scope = scope;
                authorizeApprove(this.oauth2Param).then(res => {
                    let responseType = res.data.responseType;
                    let redirectUri = res.data.redirectUri;
                    let code = res.data.code;
                    if (responseType === 'code') {
                        window.location.href = redirectUri + "?code=" + code;
                    } else {
                        let token = res.data.access_token;
                        let token_type = res.data.token_type;
                        let expires_in = res.data.expires_in;
                        window.location.href = redirectUri + "?access_token=" + token + "&token_type=" + token_type + "&expires_in=" + expires_in;
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>
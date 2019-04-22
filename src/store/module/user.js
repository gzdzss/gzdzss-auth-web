import {login} from '@/api/userApi'
import {clearStorageToken, getStorageAccessToken, jointAccessToken, setStorageToken} from '@/util'

export default {
    state: {
        accessToken: getStorageAccessToken()
    },
    mutations: {
        setToken(state, payload) {
            setStorageToken(payload)
            state.accessToken = jointAccessToken(payload)
        },
        clearToken(state) {
            state.accessToken = ''
            clearStorageToken()
        }
    },
    actions: {
        handleLogin({commit}, {username, password}) {
            return new Promise((resolve, reject) => {
                login({username, password}).then(res => {
                    commit('setToken', res.data)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        handleLogout({commit}) {
            commit('clearToken')
        }
    }
}
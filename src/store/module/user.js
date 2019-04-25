import {login, logout, getUser} from '@/api/userApi'
import {clearStorageToken, getStorageAccessToken, jointAccessToken, setStorageToken} from '@/util'

export default {
    state: {
        accessToken: getStorageAccessToken(),
        nickName: '',
        avatarUrl: '',
        getUser: false
    },
    mutations: {
        setToken(state, payload) {
            setStorageToken(payload)
            state.accessToken = jointAccessToken(payload)
        },
        clearToken(state) {
            state.avatarUrl = '',
            state.nickName = '',
            state.accessToken = ''
            state.getuse = false,
            clearStorageToken()
        },
        setUser(state, payload) {
            state.getUser = true;
            state.nickName = payload.nickName;
            state.avatarUrl = payload.avatarUrl
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
        handleGetUser({state, commit}) {
            if (!state.getUser && state.accessToken) {
                return new Promise((resolve, reject) => {
                    getUser().then(res => {
                        commit('setUser', res.data)
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            }
        },
        handleLogout({commit}) {
            if (getStorageAccessToken() !== null) {
                return new Promise((resolve, reject) => {
                    logout().then(() => {
                        resolve()
                    }).catch(err => {
                        reject(err)
                    }).finally(()=>{
                        commit('clearToken')
                    })
                })
            }
        }
    }
}
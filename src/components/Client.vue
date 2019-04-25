<template>

    <div>
        <p style="color:red" v-show="httpError.hasError">{{httpError.status}} | {{httpError.statusText}}</p>
        <h1>客户端</h1>

        <hr>

        <ul>
            <li v-for="item in clients" v-bind:key="item"><a href="#" @click="getDetail(item)">{{item}}</a></li>
        </ul>

        <hr>

        <h2>新增客户端</h2>
        <form>
            clientId<input type="text" v-model="addForm.clientId"/>
            clientSecret<input v-model="addForm.clientSecret" type="text"/>
            callbackUrl<input v-model="addForm.callbackUrl" type="text"/>
            <button @click="addClient">add</button>
        </form>
    </div>
</template>

<script>
    import {detail, list, register} from "@/api/clientApi";

    export default {
        name: "Client",
        data: () => ({
            clients: [],
            addForm: {}
        }),
        computed: {
            httpError() {
                return this.$store.state.app.httpError;
            }
        },
        mounted() {
            this.getList()
        }, methods: {
            getList() {
                list().then(res => {
                    this.clients = res.data
                })
            },
            getDetail(id) {
                detail(id).then(res => {
                    alert(JSON.stringify(res.data))
                })
            },
            addClient() {
                register(this.addForm).then(() => {
                    this.addForm ={}
                    this.getList();
                })
            }
        }

    }
</script>

<style scoped>

</style>
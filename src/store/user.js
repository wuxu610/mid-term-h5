import { defineStore } from "pinia";
export const useUserStore = defineStore('uesr', {
    state: () => ({
        user: {
            "state": 1,
            "id": 0,
            "userName": "",
            "userType": "",
            "token": "",
            "binding": 0,
            "createTime": "",
            "updateTime": "",
            "email": ""
        }
    }),
    actions: {
        setUser(user) {
            this.user = user
        }
    }
})
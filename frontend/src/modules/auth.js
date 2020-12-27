import AuthApi from '@/api/auth.js'
import Crypto from 'crypto';
import store from '../store'
import router from '../router'

export default {
    async register(email, password, firstname, lastname) {
        try {
            const response = await AuthApi.register({
                email: email,
                password: Crypto.createHash("sha256").update(password).digest("hex"),
                firstname: firstname,
                lastname: lastname,
            });
    
            if(response.status >= 200 && response.status < 300) {
                console.log("User succesfully registered");
                this.login();
            }
        } catch (error) {
            console.log("Register failed");
            console.log(error);
        }
    },
    
    async login(email, password) {
        try {
            const response = await AuthApi.login({
                strategy: 'local',
                email: email,
                password: Crypto.createHash("sha256").update(password).digest("hex"),
            });
            
            store.dispatch("login", response.data);

            router.push('/')
        } catch (error) {
            console.log("Login failed");
            console.log(error);
        }
    },

    async logout() { 
        try {
            //await AuthApi.logout();
            console.log("User succesfully logged out");
    
            // Clear user in store
            store.dispatch("logout");
        } catch (error) {
            console.log("Logout failed");
            console.log(error);
        }
    },

    getUser() {
        return store.getters.getUser
    }
};
  
import Component from "vue-class-component";
import Vue from "vue";
import UserFormData from "@/interfaces/UserFormData";
import axios from "axios";
import { ApiUrl } from "@/Helpers";
import AuthResponse from "@/interfaces/AuthResponse";

declare interface LoginData {
    email: string;
    password: string;
}

@Component
export default class Login extends Vue {
    // Declared as component data
    step: number = 1;
    loginFormData: LoginData = {
        email: "",
        password: ""
    };
    snackLogin: boolean = false;
    registerFormData: UserFormData = {} as UserFormData;

    // Declared as component methods
    registerNewUser() {
        axios.post(ApiUrl([ 'auth', 'register' ]))
            .then((response) => {
                console.log(response);
                const tokenData = response.data as AuthResponse;
                localStorage.setItem("token", tokenData.access_token);

                this.snackLogin = true;
                setTimeout(() => {
                    this.$router.push("Home");
                }, 1000);

                this.$store.commit('setToken', tokenData.access_token);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    loginUser() {
        axios.post(ApiUrl(['auth', 'login']))
            .then((response) => {
                console.log(response);
                const tokenData = response.data as AuthResponse;
                localStorage.setItem("token", tokenData.access_token);

                this.snackLogin = true;
                setTimeout(() => {
                    this.$router.push("Home");
                }, 1000);

                this.$store.commit('setToken', tokenData.access_token);
            }).catch((error) => {
                console.error(error);
            });
    };

}
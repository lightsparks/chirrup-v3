import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { ApiUrl } from "@/Helpers";
import AuthResponse from "@/interfaces/AuthResponse";
import FormRules from "@/partials/FormRules";

declare interface LoginData {
    email: string;
    password: string;
}

@Component
export default class Login extends Vue {

    // Declared as component data
    formRules: {} = FormRules;
    snackLogin: boolean = false;
    snackRegistration: boolean = false;
    loginFormData: LoginData = {
        email: "",
        password: ""
    };

    // Declared as component methods
    loginUser() {
        axios.post("http://twitterclone-dev.tk/api/auth/login", this.loginFormData)
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

    gotoRegister() {
        this.$router.push("Register");
    };

}
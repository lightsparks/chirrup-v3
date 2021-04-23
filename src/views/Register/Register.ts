import Component from "vue-class-component";
import Vue from "vue";
import UserFormData from "@/interfaces/UserFormData";
import axios from "axios";
import { ApiUrl } from "@/Helpers";
import AuthResponse from "@/interfaces/AuthResponse";
import FormRules from "@/partials/FormRules";
import ApiConfig from "@/interfaces/ApiConfig";

@Component
export default class Register extends Vue {

    // Declared as component data
    // step: number = 1;
    formRules: {} = FormRules;
    snackRegistration: boolean = false;
    registerFormData: UserFormData = {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        pasword_confirmation: ""
    };
    snackRegisterError: boolean = false;
    snackRegisterErrorTxt: string = "One or more fields have an error. Please check and try again.";

    // Declared as component methods
    registerNewUser() {
        axios.post("http://twitterclone-dev.tk/api/auth/register", this.registerFormData)
            .then((response) => {
                console.log(response);
                this.snackRegistration = true;
                setTimeout(() => {
                    this.$router.push("Login");
                }, 1500);
            }).catch((error: any) => {
            console.log(error);
            this.snackRegisterError = true;
        });
    };

}
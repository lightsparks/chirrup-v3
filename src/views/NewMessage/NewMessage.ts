import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { ApiUrl } from "@/Helpers";
import AuthResponse from "@/interfaces/AuthResponse";
import FormRules from "@/partials/FormRules";

declare interface MessageData {
    message: {
        message: string;
    };
}

@Component
export default class NewMessage extends Vue {

    // Declared as component data
    message: MessageData = {
        message: {
            message: ""
        }
    };
    snackMessage: boolean = false;

    // Declared as component methods
    postMessage() {
        axios.post(ApiUrl(['messages', this.message, this.$store.state.apiconfig]))
            .then((response) => {
                console.log(response);
                this.snackMessage = true;
                setTimeout(() => {
                    this.$router.push("Home");
                }, 1000);
            }).catch(function (error: any) {
            console.log(error);
        });
    }
}
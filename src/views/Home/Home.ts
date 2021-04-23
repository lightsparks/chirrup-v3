import Vue from 'vue'
import Component from 'vue-class-component'
import {ApiUrl} from "@/Helpers";
import axios from "axios";
import AuthResponse from "@/interfaces/AuthResponse";

@Component
export default class Home extends Vue {

    // Declared as component data
    url: string = "http://twitterclone-dev.tk/";
    success: boolean = false;
    messages!: [];
    messagesError!: {};

    // Declared as mounted lifecycle hook
    mounted() {
        this.getMessages();
    }

    // Declared as component methods
    getMessages() {
        axios.get(ApiUrl(['auth', 'messages']))
            .then((response) => {
                /*console.log(response);*/
                this.messages = response.data;
            }).catch(error => {
                this.messagesError = error.response.data ? error.response.data : "";
                console.log(this.messagesError);
            });
    }
}


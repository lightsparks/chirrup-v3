import Vue from "vue";
import Component from "vue-class-component";
import axios, {AxiosRequestConfig} from "axios";
import { ApiUrl } from "@/Helpers";
import AuthResponse from "@/interfaces/AuthResponse";
import FormRules from "@/partials/FormRules";

declare interface SearchData {
    search_string: string
}

@Component
export default class FindFriends extends Vue {

    // Declared as component data
    formRules: {} = FormRules;
    url: string = "http://twitterclone-dev.tk/";
    success: boolean = false;
    loading: boolean = true;
    searchForm: SearchData = {
        search_string: ""
    };
    userList!: () => [];
    userListError!: {};
    snackConnect: boolean = false;
    message: string = "";

    // Declared as component methods
    searchUsers(url: string, config?: AxiosRequestConfig) {
        this.message = "";
        axios.get("http://twitterclone-dev.tk/api/users/find?search_string=" + this.searchForm.search_string, this.$store.state.apiconfig)
            .then((response) => {
                console.log(response);
                this.userList = response.data;
                if (this.userList.length === 0) {
                    this.message = "No match found! Try again?";
                }
            }).catch(error => {
            this.userListError = error.response.data ? error.response.data : "";
            console.log(this.userListError);
        });
    };

    makeConnection(itemID: number) {
        axios.post(ApiUrl(['friends', {user_id: itemID}, this.$store.state.apiconfig]))
            .then((response) => {
                console.log(response);
                this.snackConnect = true;
                setTimeout(() => {
                    this.$router.push("Friends");
                }, 1000);

            }).catch(error => {
            this.userListError = error.response.data ? error.response.data : "";
            console.log(this.userListError);
        });
    }
}
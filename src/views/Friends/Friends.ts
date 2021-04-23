import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { ApiUrl } from "@/Helpers";
import User from "@/interfaces/User";

@Component
export default class Friends extends Vue {

    //Declared as component method
    success: boolean = false;
    loading: boolean = true;
    friends: Array<User> = [];
    friendsError!: {};
    snackDestroy: boolean = false;

    // Declared as mounted lifecycle hook
    mounted() {
        this.getFriends();
    };

    //Declared as component methods
    getFriends() {
        axios.get(ApiUrl(['friends', this.$store.state.apiconfig]))
            .then((response) => {
                this.friends = response.data;
            }).catch(error => {
            this.friendsError = error.response.data ? error.response.data : "";
            console.log(this.friendsError);
        });
    };

    toSearchUser() {
        this.$router.push("FindFriends");
    };

    destroyConnection(itemID: number) {
        axios.delete(ApiUrl(['friends', {...this.$store.state.apiconfig, data: {user_id: itemID}}]))
            .then((response) => {
                console.log(response);
                this.snackDestroy = true;
                this.getFriends();

            }).catch(error => {
            const userListError = error.response.data ? error.response.data : "";
            console.log(userListError);
        });
    };
};

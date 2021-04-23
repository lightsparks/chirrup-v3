import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { ApiUrl } from "@/Helpers";
import User from "@/interfaces/User";

@Component
export default class Me extends Vue {

    //Declared as component methods
    success: boolean = false;
    loading: boolean = true;
    meData: User = {};
    meDataError!: {}

    //Declared as before lifecycle hook
    beforeMount() {
        this.getMe();
    };

    //Declared as component methods
    getMe() {
        axios.get(ApiUrl(['me', this.$store.state.apiconfig]))
            .then((response) => {
                /*console.log(response);*/
                this.meData = response.data;
            }).catch(error => {
            this.meDataError = error.response.data ? error.response.data : "";
            console.log(this.meDataError);
        });
    };

    toUpdateInfo() {
        this.$router.push('/UpdateUser');
    };
};

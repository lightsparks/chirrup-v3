import Vue from 'vue';
import Component from "vue-class-component";

@Component
export default class Logout extends Vue {

    // Declared as component data
    snackLogout: boolean = false;
    snackLogoutTxt: string = "User logged out!";

    // Declared as component methods
    cancelLogOut() {
        this.$router.push('Home');
    };
    logOut() {
        localStorage.removeItem('token');

        this.snackLogout = true;
        setTimeout(() => {
            this.$router.push('/');
        }, 1000);

        this.$store.commit('setToken', null);
    };

}

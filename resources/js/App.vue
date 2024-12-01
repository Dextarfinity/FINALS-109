<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import { supabase } from "@/supabaseClient"; // Import your Supabase client
export default {
  name: "App",
  mounted() {
    this.checkSession();
  },
  methods: {
    async checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        localStorage.setItem("access_token", session.access_token);
        this.$router.push("/homesec"); // Redirect to homesec if session exists
      }
    },
  },
};
</script>
<style scoped>
/* Global styles for App */
</style>

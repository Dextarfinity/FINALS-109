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

      // Prevent session redirect on recovery or specific routes
      const currentPath = window.location.pathname;

      // Exclude session check redirect for /updatepass or other recovery pages
      if (session && currentPath !== "/updatepass") {
        localStorage.setItem("access_token", session.access_token);
        this.$router.push("/homesec"); // Redirect to homesec only if not in recovery
      }
    },
  },
};
</script>
<style scoped>
/* Global styles for App */
</style>

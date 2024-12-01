<template>
  <button @click="handleLogout" class="logout-button">Logout</button>
</template>

<script>
import { supabase } from "../supabaseClient.js";
export default {
  methods: {
    async handleLogout() {
      try {
        // Sign out from Supabase
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        // Remove tokens from localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // Redirect to login page
        this.$router.push("/auth");
      } catch (error) {
        console.error("Logout failed:", error.message);
        alert(`Logout failed: ${error.message}`);
      }
    },
  },
};
</script>

<style scoped>
.logout-button {
  padding: 1px 10px;
  background-color: #f44336; /* Red background */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.logout-button:hover {
  background-color: #d32f2f; /* Darker red on hover */
}
</style>

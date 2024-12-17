import './bootstrap'; 
import '../css/app.css'; 
import { createApp } from 'vue'; 
import App from './App.vue'; 
import router from './router'; 
import '@fortawesome/fontawesome-free/css/all.css';
import { supabase } from "./supabaseClient";


(async () => {
  const url = new URL(window.location.href);
  const token = url.searchParams.get("token");
  const type = url.searchParams.get("type");

  if (token && type === "recovery") {
    console.log("Setting session from recovery token...");
    const { error } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: token,
    });

    if (error) {
      console.error("Failed to set session:", error.message);
    } else {
      console.log("Session set successfully from recovery token.");
      // Remove token from the URL after setting session
      window.history.replaceState({}, document.title, "/updatepass");
    }
  }

  createApp(App).use(router).mount("#app");
})();


router.beforeEach((to, from, next) => {
  // Show the loader
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.remove('hidden', 'fade-out');
  }
  next();
});

  router.afterEach(() => {
    // Hide the loader with a delay
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.classList.add('fade-out');
        loader.addEventListener('animationend', () => {
          loader.classList.add('hidden');
        });
      }
    }, 2500); // Adjust delay if necessary
  });
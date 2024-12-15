import { createRouter, createWebHistory } from "vue-router";
import Authentication from "@/views/auth.vue";
import Landing from "@/views/landing.vue";
import Home from "@/views/HomeSection.vue";
import Faq from "@/views/FAQsSection.vue";
import Setting from "@/views/SettingsSection.vue";
import Profile from "@/views/ProfileSection.vue";
import Administrator from "@/views/Admin.vue";
import { supabase } from "@/supabaseClient";
import ForgotPass from "@/views/ForgotPass.vue";
import UpdatePass from "@/views/UpdatePass.vue";

const routes = [
  { path: "/", name: "Landing", component: Landing },
  { path: "/auth", name: "Auth", component: Authentication },
  { path: "/homesec", name: "Home", component: Home, meta: { requiresAuth: true } },
  { path: "/forgotpass", name: "ForgotPass", component: ForgotPass },
  { path: "/updatepass", name: "UpdatePass", component: UpdatePass, meta: { requiresAuth: true } },
  { path: "/faqssec", name: "Faq", component: Faq, meta: { requiresAuth: true } },
  { path: "/settingsec", name: "Setting", component: Setting, meta: { requiresAuth: true } },
  { path: "/profilesec", name: "Profile", component: Profile, meta: { requiresAuth: true } },
  { path: "/adminsection", name: "Admin", component: Administrator, meta: { requiresAuth: true } }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("access_token");
  const isAuthenticated = !!token;

  console.log("Navigating to:", to.path);
  console.log("From route:", from.path);
  console.log("Is Authenticated:", isAuthenticated);
  console.log("Requires Auth:", to.meta.requiresAuth);

  // Check if the user is authenticated for protected routes
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log("Not authenticated. Redirecting to /auth.");
    return next("/auth");
  }

  // For authenticated users, verify their session
  if (isAuthenticated) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("Invalid session detected. Redirecting to /auth.");
        return next("/auth");
      }

      console.log("User session valid:", user);

      // Check if the user is an admin and redirect accordingly
      const { data: userInfo, error: userInfoError } = await supabase
        .from("users_info")
        .select("isAdmin")
        .eq("email", user.email)
        .maybeSingle();

      if (userInfoError) {
        console.error("Failed to fetch user info:", userInfoError.message);
        return next("/auth");
      }

      console.log("User info:", userInfo);

      // Redirect admin users to /adminsection if they're not already there
      if (userInfo?.isAdmin && to.path !== "/adminsection") {
        console.log("Redirecting admin user to /adminsection.");
        return next("/adminsection");
      }

      // Allow other authenticated users to proceed to their desired route
      console.log("Authenticated user allowed to navigate.");
    } catch (error) {
      console.error("Error during authentication check:", error.message);
      return next("/auth");
    }
  }

  // Default: Allow navigation
  console.log("Navigation allowed to:", to.path);
  next();
});


export default router;

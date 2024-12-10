<template>
  <div class="gradient font-space-mono">
    <!-- Navbar -->
    <nav class="bg-transparent shadow-lg fixed w-full z-10 hidden lg:flex xl:flex">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex w-full justify-between">
        <div class="flex-shrink-0 flex items-center">
          <!-- Logo or placeholder -->
        </div>
        <div class="space-x-8 mt-8 ml-auto flex text-white mb-2">
          <LogoutButton />
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
import "boxicons/css/boxicons.min.css";
import LogoutButton from "./logoutButton.vue";
export default {
  name: "MainBody",
  components: {
    LogoutButton,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
.font-space-mono {
  font-family: "Space Mono", monospace;
}
html,
body {
  overflow-x: hidden;
}
.footer-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: #0f172a; /* Slate 900 */
  backdrop-filter: blur(10px); /* Adjust the blur amount as needed */
  border-top: 1px solid rgba(255, 255, 255, 0.3); /* Optional: Add a subtle border */
  z-index: 10; /* Ensure it stays on top of other elements */
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  transition: background-color 0.3s ease; /* Smooth background transition */
}

/* Styles for the footer buttons */
.footer-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff; /* White color for dark mode */
  background: none;
  border: none;
  transition: transform 0.5s ease, color 0.5s ease; /* Transition for smooth effect */
}

.footer-button i {
  font-size: 24px;
  color: white;
}

/* Text styling */
.footer-button span {
  font-size: 12px;
  margin-top: 4px;
}

/* Hover and focus effects */
.footer-button:hover,
.footer-button:focus {
  color: #4fd1c5; /* Change text color on hover/focus */
  transform: scale(1.2) translateY(-5px); /* Scale and slightly move up */
  background-color: rgb(88, 78, 78);
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  width: 50px;
  height: 50px;
  z-index: 2;
}

.footer-button i:hover,
.footer-button i:focus {
  color: #4fd1c5; /* Change text color on hover/focus */
  transform: scale(1.1); /* Slightly increase size */
}

.footer-button:focus {
  outline: none; /* Remove default outline for focus */
  box-shadow: 0 0 0 3px rgba(79, 209, 197, 0.5); /* Add a subtle focus ring */
}

.footer-button i:focus {
  outline: none; /* Remove default outline for focus */
  box-shadow: 0 0 0 3px rgba(79, 209, 197, 0.5); /* Add a subtle focus ring */
}

.gradient {
  background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
}

/* Webkit Browsers */
::-webkit-scrollbar {
  width: 12px;
  height: 12px; /* for horizontal scrollbars */
}

.textsy textarea {
  resize: none;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 50px;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 50px; /* Circular border */
  border: 3px solid #f1f1f1; /* Adds space around thumb */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>

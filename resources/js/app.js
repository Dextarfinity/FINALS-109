import './bootstrap'; 
import '../css/app.css'; 
import { createApp } from 'vue'; 
import App from './App.vue'; 
import router from './router'; 
createApp(App).use(router).mount('#app'); 
import '@fortawesome/fontawesome-free/css/all.css';

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
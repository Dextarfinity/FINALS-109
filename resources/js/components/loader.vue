<template>
  <div>
    <div v-if="showLoader" class="loader" @animationend="handleAnimationEnd">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
      <div class="bar4"></div>
      <div class="bar5"></div>
      <div class="bar6"></div>
      <div class="bar7"></div>
      <div class="bar8"></div>
      <div class="bar9"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import "boxicons/css/boxicons.min.css";
export default {
  name: "Loader",
  data() {
    return {
      showLoader: true, // Show loader initially
    };
  },
  mounted() {
    setTimeout(() => {
      this.startFadeOut();
    }, 5000); // Wait 5 seconds before starting fade-out
  },
  methods: {
    startFadeOut() {
      const loader = document.querySelector(".loader");
      if (loader) {
        loader.style.animation = "fadeOut 5s forwards"; // Trigger fade-out animation
      }
    },
    handleAnimationEnd() {
      this.showLoader = false; // Hide loader after fade-out animation
    },
  },
};
</script>

<style scoped>
.loader {
  position: relative;
  width: 164px;
  height: 100px;
  margin: 50px auto;
  z-index: 9999;
}

.loader div {
  position: absolute;
  width: 10px;
  height: 30px;
  background-color: #ff6a00;
  border-radius: 5px;
  animation: loader_51899 1.5s ease-in-out infinite;
}

.loader .bar1 {
  left: 0px;
  animation-delay: 0s;
}

.loader .bar2 {
  left: 20px;
  animation-delay: 0.15s;
}

.loader .bar3 {
  left: 40px;
  animation-delay: 0.3s;
}

.loader .bar4 {
  left: 60px;
  animation-delay: 0.45s;
}

.loader .bar5 {
  left: 80px;
  animation-delay: 0.6s;
}

.loader .bar6 {
  left: 100px;
  animation-delay: 0.75s;
}

.loader .bar7 {
  left: 120px;
  animation-delay: 0.9s;
}

.loader .bar8 {
  left: 140px;
  animation-delay: 1.05s;
}

.loader .bar9 {
  left: 160px;
  animation-delay: 1.2s;
}

@keyframes loader_51899 {
  0% {
    height: 30px;
    transform: translate(0, 0);
  }
  50% {
    height: 70px;
    transform: translate(0, 35px);
  }
  100% {
    height: 30px;
    transform: translate(0, 0);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

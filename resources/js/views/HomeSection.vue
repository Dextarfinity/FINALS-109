<template>
  <Navbar />
  <div class="leading-normal tracking-normal text-white gradient">
    <section id="home" class="relative flex items-center justify-center min-h-screen">
      <!-- Background overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <!-- Content wrapper -->
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- Title -->
        <h1
          class="text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight lg:mb-4 animate-fade-in-down text-white"
        >
          HATID KITA
        </h1>

        <!-- Subtitle -->
        <h3
          class="text-xl sm:text-2xl lg:text-3xl font-bold lg:mb-4 animate-fade-in-up text-white"
        >
          A SYSTEM PROTOTYPE
        </h3>

        <!-- Terminal logs -->
        <div
          class="bg-black bg-opacity-75 text-green-400 p-4 rounded-lg shadow-lg font-mono text-xs sm:text-sm h-40 lg:w-2/3 w-full max-w-2xl mx-auto overflow-y-auto mb-4 text-left animate-fade-in"
        >
          <div v-for="(log, index) in terminalLogs" :key="index">
            <span class="text-green-400">$</span> {{ log }}
          </div>
        </div>

        <!-- Call Driver Button, From Select Location, To Select Location, Specific Location Input -->
        <div
          class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center items-center animate-fade-in-up"
        >
          <!-- Call Driver Button -->
          <button
            @click="callDriver"
            class="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <TruckIcon class="w-5 h-5 mr-2" />
            Call Driver
          </button>

          <!-- From Select Location Dropdown -->
          <select
            v-model="selectedLocation"
            class="w-full sm:w-auto px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">From: Select Location</option>
            <option v-for="location in locations" :key="location" :value="location">
              {{ location }}
            </option>
          </select>

          <!-- To Select Location Dropdown -->
          <select
            v-model="toLocation"
            class="w-full sm:w-auto px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">To: Select Location</option>
            <option v-for="location in locations" :key="location" :value="location">
              {{ location }}
            </option>
          </select>

          <!-- Specific Location Input -->
          <input
            v-model="specificLocation"
            type="text"
            placeholder="Specific location in CED"
            class="w-full sm:w-auto px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <!-- Driver Status -->
        <div
          :class="[
            statusColorClass,
            'mt-4 px-4 py-3 text-sm font-medium text-white rounded-lg text-center transition-all duration-500 ease-in-out inline-block',
          ]"
        >
          {{ driverStatus }}
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { TruckIcon } from "lucide-vue-next";

const terminalLogs = ref([
  "Welcome to Hatid Kita!",
  "System initialized...",
  "Ready for ride requests.",
]);

const driverStatus = ref("Idle");
const statusColors = {
  Idle: "bg-gray-500",
  "Finding a driver": "bg-yellow-500",
  "Driver is on the way": "bg-blue-500",
  "Driver has arrived": "bg-green-500",
};

const statusColorClass = computed(() => statusColors[driverStatus.value]);

const selectedLocation = ref("");
const toLocation = ref(""); // New reactive state for To location
const specificLocation = ref("");

const locations = [
  "CED",
  "NSB",
  "HOSTEL",
  "NEW ADMIN",
  "OSAS",
  "OLD CAS",
  "KINAADMAN",
  "LIBRARY",
  "CCIS",
  "CEGS",
  "VILLARES",
];

const callDriver = () => {
  if (!selectedLocation.value || !toLocation.value) {
    alert("Please select both From and To locations");
    return;
  }

  terminalLogs.value.push(
    `Requesting a driver from ${selectedLocation.value} to ${toLocation.value}${
      specificLocation.value ? ` - ${specificLocation.value}` : ""
    }...`
  );
  driverStatus.value = "Finding a driver";

  setTimeout(() => {
    terminalLogs.value.push("Driver found! ETA: Couple of minutes");
    driverStatus.value = "Waiting Driver to accept...";
  }, 3000);

  setTimeout(() => {
    terminalLogs.value.push("Driver has accepted your request");
    driverStatus.value = "Driver Accepted";
  }, 8000);
};
</script>

<script>
import Navbar from "@/components/body.vue";
export default {
  name: "HomeSection",
  components: {
    Navbar,
  },
};
</script>

<style scoped>
/* Fade-in and Slide animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-in-out;
}

.animate-fade-in-down {
  animation: fadeInDown 1s ease-in-out;
}
</style>

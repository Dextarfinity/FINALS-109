<template>
  <Navbar />
  <div class="leading-normal tracking-normal text-white gradient">
    <section
      id="admin"
      class="relative flex items-center justify-center"
      style="min-height: 100vh"
    >
      <!-- Background overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <div class="container max-w-5xl mx-auto m-4">
        <div class="w-full lg:mb-6">
          <div class="mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div class="flex flex-wrap">
          <!-- Right Column: Carousel -->
          <div class="w-full lg:w-1/2 p-6">
            <div
              class="lg:pt-10 relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
              <!-- Title -->
              <h1
                class="text-3xl md:text-5xl font-extrabold leading-tight mb-4 animate-fade-in-down text-white"
              >
                HATID KITA
              </h1>

              <!-- Subtitle -->
              <h3
                class="text-xl md:text-2xl font-bold mb-6 animate-fade-in-up text-white"
              >
                A SYSTEM PROTOTYPE
              </h3>

              <!-- Terminal logs -->
              <div
                class="bg-black bg-opacity-75 text-green-400 p-4 rounded-lg shadow-lg font-mono text-xs md:text-sm h-32 md:h-64 w-full max-w-2xl mx-auto overflow-y-auto lg:mb-4 text-left animate-fade-in"
              >
                <div v-for="(log, index) in terminalLogs" :key="index">
                  <span class="text-green-400">$</span> {{ log }}
                </div>
              </div>
            </div>
          </div>

          <!-- Left Column: Text Content -->
          <div
            class="w-full lg:w-1/2 p-6 text-start lg:mt-6 animate-fade-in-down mb-10"
            style="z-index: 2"
          >
            <!-- First Row: User Interface Description -->
            <div
              class="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden lg:mt-5 mb-5 lg:mb-0"
            >
              <div class="p-6 lg:p-8">
                <div>
                  <h4
                    class="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center animate-fade-in"
                  >
                    <Clock class="w-5 h-5 md:w-6 md:h-6 text-black mr-2" />
                    Requesting Rides
                  </h4>
                  <ul
                    class="space-y-2 md:space-y-3 overflow-y-auto max-h-28 md:max-h-32 animate-fade-in"
                  >
                    <li
                      v-for="ride in recentRides"
                      :key="ride.id"
                      class="bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-500"
                    >
                      <div class="flex justify-between items-center">
                        <span class="text-xs md:text-sm text-gray-600">{{
                          ride.date
                        }}</span>
                        <div class="flex items-center space-x-2">
                          <!-- Accept Button (Check Icon) -->
                          <button
                            class="bg-lime-500 animate-fade-in text-white p-1 rounded-full hover:bg-lime-600 transition duration-300"
                          >
                            <Check class="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                          <!-- Decline Button (X Icon) -->
                          <button
                            class="animate-fade-in bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-300"
                          >
                            <Ban class="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        </div>
                      </div>
                      <div class="mt-1 text-gray-800 flex items-center animate-fade-in">
                        <MapPin class="w-3 h-3 md:w-4 md:h-4 text-black mr-1" />
                        {{ ride.from }}
                        <ArrowRight class="w-3 h-3 md:w-4 md:h-4 text-black mx-1" />
                        {{ ride.to }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              class="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden lg:mt-5"
            >
              <div class="p-6 lg:p-8">
                <div>
                  <h4
                    class="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center"
                  >
                    <ClockIcon class="w-5 h-5 md:w-6 md:h-6 text-black mr-2" />
                    Recent Rides
                  </h4>
                  <ul class="space-y-2 md:space-y-3 overflow-y-auto max-h-28 md:max-h-32">
                    <li
                      v-for="ride in recentRides"
                      :key="ride.id"
                      class="bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-500"
                    >
                      <div class="flex justify-between items-center">
                        <span class="text-xs md:text-sm text-gray-600">{{
                          ride.date
                        }}</span>
                        <span class="text-xs md:text-sm font-medium text-lime-500">{{
                          ride.status
                        }}</span>
                      </div>
                      <div class="mt-1 text-gray-800 flex items-center">
                        <MapPinIcon class="w-3 h-3 md:w-4 md:h-4 text-black mr-1" />
                        {{ ride.from }}
                        <ArrowRightIcon class="w-3 h-3 md:w-4 md:h-4 text-black mx-1" />
                        {{ ride.to }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  Check,
  Ban,
  Clock,
  MapPin,
  ArrowRight,
  ClockIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "lucide-vue-next";

import { ref, computed } from "vue";
const user = ref({
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8900",
});

const avatarUrl = ref(null);

const recentRides = ref([
  { id: 1, date: "May 15, 2023", from: "CED", to: "HOSTEL" },
  { id: 2, date: "May 14, 2023", from: "LIBRARY", to: "CCIS" },
  {
    id: 3,
    date: "May 13, 2023",
    from: "NEW ADMIN",
    to: "KINAADMAN",
  },
  { id: 4, date: "May 14, 2023", from: "LIBRARY", to: "CCIS" },
  { id: 5, date: "May 14, 2023", from: "LIBRARY", to: "CCIS" },
]);

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
  if (!selectedLocation.value) {
    alert("Please select a location");
    return;
  }

  terminalLogs.value.push(
    `Requesting a driver for ${selectedLocation.value}${
      specificLocation.value ? ` - ${specificLocation.value}` : ""
    }...`
  );
  driverStatus.value = "Finding a driver";

  setTimeout(() => {
    terminalLogs.value.push("Driver found! ETA: 5 minutes");
    driverStatus.value = "Driver is on the way";
  }, 3000);

  setTimeout(() => {
    terminalLogs.value.push("Driver has arrived at your location");
    driverStatus.value = "Driver has arrived";
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

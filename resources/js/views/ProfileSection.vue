<template>
  <Navbar />
  <section
    id="profile"
    class="min-h-screen bg-gradient-to-r from-[#4a0e0e] via-[#3d2617] to-[#5e4d1f] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
  >
    <div class="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden lg:mt-5">
      <div class="bg-gray-100 p-8 relative">
        <!-- Decorative Pattern Background -->
        <div class="absolute inset-0 bg-opacity-50 bg-gray-200">
          <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1.6" fill="#a0aec0" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
        </div>

        <!-- Profile Content -->
        <div class="relative z-10">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            User Profile
          </h2>

          <!-- User Avatar -->
          <div class="flex flex-col items-center mb-6">
            <div class="mb-4">
              <div
                class="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-black shadow-lg bg-white"
              >
                <img
                  :src="avatarUrl || '/placeholder.svg?height=128&width=128'"
                  alt=""
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 class="text-xl md:text-2xl font-semibold text-gray-800">
              {{ user.name }}
            </h3>
            <p class="text-gray-600">{{ user.occupation }}</p>
          </div>

          <!-- Contact Information -->
          <div class="space-y-3 mb-6">
            <div class="flex items-center space-x-3 bg-white rounded-lg p-3 shadow">
              <MailIcon class="w-4 h-4 md:w-5 md:h-5 text-black" />
              <p class="text-gray-700">{{ user.email }}</p>
            </div>
            <div class="flex items-center space-x-3 bg-white rounded-lg p-3 shadow">
              <PhoneIcon class="w-4 h-4 md:w-5 md:h-5 text-black" />
              <p class="text-gray-700">{{ user.phone }}</p>
            </div>
            <div class="flex items-center space-x-3 bg-white rounded-lg p-3 shadow">
              <MailIcon class="w-4 h-4 md:w-5 md:h-5 text-black" />
              <p class="text-gray-700">{{ user.carsuEmail }}</p>
            </div>
            <div class="flex items-center space-x-3 bg-white rounded-lg p-3 shadow">
              <Hash class="w-4 h-4 md:w-5 md:h-5 text-black" />
              <p class="text-gray-700">{{ user.csuIdNumber }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Rides Section -->
      <div class="p-8">
        <div>
          <h4
            class="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center"
          >
            <ClockIcon class="w-5 h-5 md:w-6 md:h-6 text-black mr-2" />
            Recent Rides
          </h4>
          <ul class="space-y-3 overflow-y-auto max-h-32">
            <li
              v-for="ride in recentRides"
              :key="ride.id"
              class="bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-500"
            >
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">{{ ride.date }}</span>
                <span class="text-sm font-medium text-lime-500">{{ ride.status }}</span>
              </div>
              <div class="mt-1 text-gray-800 flex items-center">
                <MapPinIcon class="w-4 h-4 md:w-5 md:h-5 text-black mr-1" />
                {{ ride.from }}
                <ArrowRightIcon class="w-4 h-4 md:w-5 md:h-5 text-black mx-1" />
                {{ ride.to }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { supabase } from "../supabaseClient";
import { ref, onMounted } from "vue";
import {
  Hash,
  MailIcon,
  PhoneIcon,
  ClockIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "lucide-vue-next";
import Navbar from "@/components/body.vue"; // Import Navbar from components

// Reactive data for the user and UI
const user = ref({
  name: "",
  email: "",
  phone: "",
  carsuEmail: "",
  csuIdNumber: "",
  occupation: "",
});

const avatarUrl = ref(null);

const recentRides = ref([
  { id: 1, date: "May 15, 2023", from: "CED", to: "HOSTEL", status: "Completed" },
  { id: 2, date: "May 14, 2023", from: "LIBRARY", to: "CCIS", status: "Completed" },
  {
    id: 3,
    date: "May 13, 2023",
    from: "NEW ADMIN",
    to: "KINAADMAN",
    status: "Completed",
  },
  { id: 4, date: "May 14, 2023", from: "LIBRARY", to: "CCIS", status: "Completed" },
  { id: 5, date: "May 14, 2023", from: "LIBRARY", to: "CCIS", status: "Completed" },
]);

// Function to fetch user details
async function fetchUserDetails() {
  try {
    const {
      data: { user: loggedInUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("Error fetching user:", authError.message);
      return;
    }

    if (!loggedInUser) {
      console.error("No user is logged in");
      return;
    }

    const { data, error } = await supabase
      .from("users_info")
      .select("email, phone_number, fullname, csu_id_number, occupation, carsu_email")
      .eq("id", loggedInUser.id)
      .single();

    if (error) {
      console.error("Error fetching user details:", error.message);
      return;
    }

    if (data) {
      // Update user information
      user.value = {
        name: data.fullname, // Assuming "fullname" is a single property
        email: data.email,
        phone: data.phone_number, // Assuming "phone_number" contains the phone
        carsuEmail: data.carsu_email,
        csuIdNumber: data.csu_id_number,
        occupation: data.occupation,
      };
    } else {
      console.error("No data found for the user.");
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error.message);
  }
}

// Call the function when the component is mounted
onMounted(() => {
  fetchUserDetails();
});
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

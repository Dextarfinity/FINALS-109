<template>
  <Navbar />
  <section
    id="profile"
    class="min-h-screen bg-gradient-to-r from-[#4a0e0e] via-[#3d2617] to-[#5e4d1f] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
  >
    <div
      :class="[
        'transparency fixed top-5 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded shadow-lg transition-opacity duration-500',
        toastVisible ? 'opacity-100' : 'opacity-0',
        toastColor,
      ]"
      @transitionend="onTransitionEnd"
    >
      <span>{{ toastMessage }}</span>
    </div>
    <div
      class="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden lg:mt-5"
    >
      <div class="bg-gray-100 p-8 relative">
        <!-- Decorative Pattern Background -->
        <div class="absolute inset-0 bg-opacity-50 bg-gray-200">
          <svg
            class="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
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
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-circles)"
            />
          </svg>
        </div>

        <!-- Profile Content -->
        <div class="relative z-10">
          <h2
            class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center"
          >
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
            <div
              class="flex items-center space-x-3 bg-white rounded-lg p-3 shadow"
            >
              <MailIcon class="w-4 h-4 md:w-5 md:h-5 text-black" />
              <p class="text-gray-700">{{ user.email }}</p>
            </div>
            <div
              class="flex items-center space-x-3 bg-white rounded-lg p-3 shadow"
            >
              <PhoneIcon class="w-4 h-4 md:w-5 md:h-5 text-black" />
              <p class="text-gray-700">{{ user.phone }}</p>
            </div>
            <div
              class="flex items-center space-x-3 bg-white rounded-lg p-3 shadow"
            >
              <MailIcon class="w-4 h-4 md:w-5 md:h-5 text-black" />
              <p class="text-gray-700">{{ user.carsuEmail }}</p>
            </div>
            <div
              class="flex items-center space-x-3 bg-white rounded-lg p-3 shadow"
            >
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
                <span
                  class="text-sm font-medium"
                  :class="{
                    'text-yellow-500': ride.status === 'Pending',
                    'text-lime-500': ride.status === 'Completed',
                    'text-red-500': ride.status === 'Declined',
                  }"
                >
                  {{ ride.status }}
                </span>
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

// Toast handling function
const toastMessage = ref("");
const toastColor = ref("");
const toastVisible = ref(false);

const showToast = (message, type) => {
  toastMessage.value = message;
  toastColor.value =
    type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white";
  toastVisible.value = true;
  setTimeout(() => {
    hideToast();
  }, 3000);
};

const hideToast = () => {
  toastVisible.value = false;
};
// Reactive data for the user and UI
const user = ref({
  name: "",
  email: "",
  phone: "",
  carsuEmail: "",
  csuIdNumber: "",
  occupation: "",
});

// Avatar URLs using imported images
import avatar1 from "./images/avatars/avatar1.png";
import avatar2 from "./images/avatars/avatar2.png";
import avatar3 from "./images/avatars/avatar3.png";
import avatar4 from "./images/avatars/avatar4.png";
import avatar5 from "./images/avatars/avatar5.png";
import avatar6 from "./images/avatars/avatar6.png";
import avatar7 from "./images/avatars/avatar7.png";
import avatar8 from "./images/avatars/avatar8.png";
import avatar9 from "./images/avatars/avatar9.png";

const avatars = ref([
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
]);
const avatarUrl = ref(avatar1);
const recentRides = ref([]);

// Load avatar from localStorage
function fetchAvatarUrl() {
  const storedAvatar = localStorage.getItem("selectedAvatar");
  avatarUrl.value = storedAvatar || "/placeholder.svg?height=128&width=128"; // Default to placeholder
}

// Fetch user details and transactions on mount
onMounted(() => {
  fetchAvatarUrl();
  fetchUserDetails();
  fetchUserTransactions();
});

const fetchUserTransactions = async () => {
  try {
    // Step 1: Get the logged-in user's UUID
    const {
      data: { user: loggedInUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !loggedInUser) {
      console.error("Error fetching authenticated user:", authError?.message);
      showToast("Failed to identify user. Please log in.", "error");
      return;
    }

    // Step 2: Fetch the UUID from the `users_info` table
    const { data: userInfo, error: userInfoError } = await supabase
      .from("users_info")
      .select("id")
      .eq("email", loggedInUser.email)
      .single();

    if (userInfoError || !userInfo) {
      console.error("Error fetching user_info:", userInfoError?.message);
      showToast("User information not found. Please contact support.", "error");
      return;
    }

    const userInfoId = userInfo.id; // UUID of the user

    // Step 3: Fetch all matching user_transacts
    const { data: userTransacts, error: userTransactError } = await supabase
      .from("user_transacts")
      .select("id")
      .eq("users_info_id", userInfoId);

    if (userTransactError || !userTransacts || userTransacts.length === 0) {
      console.error(
        "Error fetching user_transacts:",
        userTransactError?.message
      );
      showToast(
        "User transactions not found. Please contact support.",
        "error"
      );
      return;
    }

    const userTransactIds = userTransacts.map((transact) => transact.id); // Collect IDs

    // Step 4: Fetch transactions for the user
    const { data: transactions, error: transactionError } = await supabase
      .from("transactions")
      .select(
        `
        created_at,
        isCompleted,
        admin_transactions (from_loc, to_loc)
      `
      )
      .in("users_transacts_id", userTransactIds) // Use the array of IDs
      .order("created_at", { ascending: false });

    if (transactionError) {
      console.error("Error fetching transactions:", transactionError.message);
      showToast("Failed to load recent rides. Please try again.", "error");
      return;
    }

    // Format data for display
    recentRides.value = transactions.map((transaction) => ({
      date: new Date(transaction.created_at).toLocaleString(),
      from: transaction.admin_transactions.from_loc,
      to: transaction.admin_transactions.to_loc,
      status:
        transaction.isCompleted === null
          ? "Pending"
          : transaction.isCompleted
          ? "Completed"
          : "Declined", // Adjusted to fit your red/yellow/green status logic
    }));
  } catch (err) {
    console.error("Unexpected error:", err);
    showToast("An unexpected error occurred. Please try again.", "error");
  }
};

// Fetch data on component mount
onMounted(fetchUserTransactions);
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
      .select(
        "email, phone_number, fullname, csu_id_number, occupation, carsu_email"
      )
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

<script>
import Navbar from "@/components/body.vue";

export default {
  name: "Profile",
  components: {
    Navbar,
  },
  methods: {
    showToast(message, type) {
      this.toastMessage = message;
      this.toastColor =
        type === "success"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white";
      this.toastVisible = true;
      setTimeout(() => {
        this.hideToast();
      }, 3000);
    },
    hideToast() {
      this.toastVisible = false;
    },
  },
};
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

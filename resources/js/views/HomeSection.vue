<template>
  <Navbar />
  <div class="leading-normal tracking-normal text-white gradient">
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
    <section
      id="home"
      class="relative flex items-center justify-center min-h-screen"
    >
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
            <option
              v-for="location in locations"
              :key="location"
              :value="location"
            >
              {{ location }}
            </option>
          </select>

          <!-- To Select Location Dropdown -->
          <select
            v-model="toLocation"
            class="w-full sm:w-auto px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">To: Select Location</option>
            <option
              v-for="location in locations"
              :key="location"
              :value="location"
            >
              {{ location }}
            </option>
          </select>

          <!-- Specific Location Input -->
          <input
            v-model="specificLocation"
            type="text"
            placeholder="Specific location"
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
import { supabase } from "../supabaseClient"; // supabase link

const terminalLogs = ref([
  "Welcome to Hatid Kita!",
  "System initialized...",
  "Ready for ride requests.",
]);

const driverStatus = ref("Idle");
const statusColors = {
  Idle: "bg-gray-500",
  "Finding a driver": "bg-yellow-500",
  "Waiting Driver to accept...": "bg-blue-500",
  "Driver Accepted": "bg-green-500",
  "Driver Declined": "bg-red-500",
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

const isCallDriverDisabled = ref(false); // Reactive state to track button disable status

const callDriver = async () => {
  // Check for cooldown before making a request
  if (isCallDriverDisabled.value) {
    showToast("You can only make another request after 5 minutes.", "error");
    return;
  }

  if (!selectedLocation.value || !toLocation.value) {
    showToast("Please select both From and To locations.", "error");
    return;
  }

  try {
    // Step 1: Fetch the authenticated user's info
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Error fetching authenticated user:", authError?.message);
      showToast("Failed to identify user. Please log in.", "error");
      return;
    }

    // Step 2: Fetch the user's info from the `users_info` table
    const { data: userInfo, error: userInfoError } = await supabase
      .from("users_info")
      .select("id, csu_id_number, carsu_email")
      .eq("email", user.email)
      .single();

    if (userInfoError || !userInfo) {
      console.error("Error fetching user_info:", userInfoError?.message);
      showToast("User information not found. Please contact support.", "error");
      return;
    }

    // Step 3: Check if `csu_id_number` or `carsu_email` is null
    const { csu_id_number, carsu_email, id: userInfoId } = userInfo;

    if (!csu_id_number || !carsu_email) {
      showToast(
        "Your account is incomplete. Please update your CSU ID number and CARSU email to proceed.",
        "error"
      );
      return;
    }

    // Step 4: Construct the description including the specific location
    const description =
      `${selectedLocation.value} to ${toLocation.value}` +
      (specificLocation.value ? ` - ${specificLocation.value}` : "");

    // Step 5: Insert into `user_transacts` table
    const { data: userTransactData, error: userTransactError } = await supabase
      .from("user_transacts")
      .insert({
        description_loc: description,
        users_info_id: userInfoId,
      })
      .select();

    if (userTransactError) {
      console.error(
        "Error inserting to user_transacts:",
        userTransactError.message
      );
      showToast(
        "Failed to initialize the transaction. Please try again.",
        "error"
      );
      return;
    }

    const userTransactId = userTransactData[0].id;

    // Step 6: Insert into `admin_transactions` table
    const { data: adminTransactionData, error: adminTransactionError } =
      await supabase
        .from("admin_transactions")
        .insert({
          from_loc: selectedLocation.value,
          to_loc: toLocation.value,
        })
        .select();

    if (adminTransactionError) {
      console.error(
        "Error inserting to admin_transactions:",
        adminTransactionError.message
      );
      showToast("Failed to request a driver. Please try again.", "error");
      return;
    }

    const adminTransactionId = adminTransactionData[0].id;

    // Step 7: Insert into `transactions` table
    const { data: transactionData, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        users_transacts_id: userTransactId,
        admin_id: adminTransactionId,
        isCompleted: null, // Default value
      })
      .select();

    if (transactionError) {
      console.error(
        "Error inserting to transactions:",
        transactionError.message
      );
      showToast(
        "Failed to finalize the transaction. Please try again.",
        "error"
      );
      return;
    }

    const transactionId = transactionData[0].id;

    // Step 8: Insert into `admin_dashboard` table
    const { error: adminDashboardError } = await supabase
      .from("admin_dashboard")
      .insert({
        transaction_id: transactionId, // Use the created transaction_id
      });

    if (adminDashboardError) {
      console.error(
        "Error inserting to admin_dashboard:",
        adminDashboardError.message
      );
      showToast(
        "Failed to update the admin dashboard. Please contact support.",
        "error"
      );
      return;
    }

    terminalLogs.value.push(
      `Driver requested from ${selectedLocation.value} to ${toLocation.value}` +
        (specificLocation.value ? ` - ${specificLocation.value}` : "")
    );

    driverStatus.value = "Finding a driver";

    // Poll the transaction status until completed
    const pollTransactionStatus = async () => {
      try {
        const { data: updatedTransaction, error: pollError } = await supabase
          .from("transactions")
          .select("isCompleted")
          .eq("id", transactionId)
          .single();

        if (pollError) {
          console.error("Error polling transaction status:", pollError.message);
          return;
        }

        if (updatedTransaction?.isCompleted === true) {
          setTimeout(() => {
            terminalLogs.value.push("Driver found! ETA: Couple of minutes");
            driverStatus.value = "Waiting Driver to accept...";
          }, 3000);

          setTimeout(() => {
            terminalLogs.value.push(
              "Driver has accepted your request. Please stay where you are to help drivers not having difficulties finding you! Thank you for your patience!"
            );
            driverStatus.value = "Driver Accepted";
          }, 8000);

          return; // Exit the polling
        }

        if (updatedTransaction?.isCompleted === false) {
          setTimeout(() => {
            terminalLogs.value.push("Driver declined your request");
            driverStatus.value = "Driver Declined";
            showToast(
              "Sorry, driver declined your request. You can try again later.",
              "error"
            );
            isCallDriverDisabled.value = false;
          }, 3000);

          return; // Exit the polling
        }

        setTimeout(pollTransactionStatus, 3000);
      } catch (error) {
        console.error("Unexpected error during polling:", error.message);
      }
    };

    pollTransactionStatus();

    // Step 9: Start cooldown timer
    startCooldown();
  } catch (err) {
    console.error("Unexpected error:", err);
    showToast("An unexpected error occurred. Please try again.", "error");
  }
};

// Cooldown logic with persistence using localStorage
const startCooldown = () => {
  const cooldownDuration = 300; // 5 minutes in seconds
  const cooldownEndTime = Date.now() + cooldownDuration * 1000;
  localStorage.setItem("cooldownEndTime", cooldownEndTime);

  isCallDriverDisabled.value = true;

  const timer = setInterval(() => {
    const remainingTime = Math.ceil((cooldownEndTime - Date.now()) / 1000);

    if (remainingTime <= 0) {
      clearInterval(timer);
      isCallDriverDisabled.value = false;
      localStorage.removeItem("cooldownEndTime");
      showToast("You can now make another request.", "success");
    }
  }, 1000);
};

// Check for active cooldown on page load
const checkCooldown = () => {
  const cooldownEndTime = localStorage.getItem("cooldownEndTime");

  if (cooldownEndTime) {
    const remainingTime = Math.ceil((cooldownEndTime - Date.now()) / 1000);

    if (remainingTime > 0) {
      isCallDriverDisabled.value = true;

      const timer = setInterval(() => {
        const timeLeft = Math.ceil((cooldownEndTime - Date.now()) / 1000);

        if (timeLeft <= 0) {
          clearInterval(timer);
          isCallDriverDisabled.value = false;
          localStorage.removeItem("cooldownEndTime");
          showToast("You can now make another request.", "success");
        }
      }, 1000);
    } else {
      localStorage.removeItem("cooldownEndTime");
    }
  }
};

// Initialize cooldown check on script load
checkCooldown();

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
</script>

<script>
import Navbar from "@/components/body.vue";

export default {
  name: "Home",
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

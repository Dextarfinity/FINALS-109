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
                  <div class="flex items-center justify-between mb-4 animate-fade-in">
                    <h4
                      class="text-lg md:text-xl font-semibold text-gray-800 flex items-center"
                    >
                      <Clock class="w-5 h-5 md:w-6 md:h-6 text-black mr-2" />
                      Requesting Rides
                    </h4>
                    <button
                      @click="refreshRequestRides"
                      class="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition duration-300"
                      title="Refresh"
                    >
                      <RotateCcw class="w-4 h-4 md:w-4 md:h-4 text-black" />
                    </button>
                  </div>
                  <ul
                    v-if="requestingRides && requestingRides.length > 0"
                    class="space-y-2 md:space-y-3 overflow-y-auto max-h-28 md:max-h-32 animate-fade-in"
                  >
                    <li
                      v-for="ride in requestingRides"
                      :key="ride.id"
                      class="bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-500"
                    >
                      <div class="flex justify-between items-center">
                        <span class="text-xs md:text-sm text-gray-600">{{
                          ride.date
                        }}</span>
                        <div class="flex items-center space-x-2">
                          <!-- Accept Button -->
                          <button
                            @click="updateAcceptedStatus(ride.id, true)"
                            class="bg-lime-500 text-white p-1 rounded-full hover:bg-lime-600 transition duration-300"
                          >
                            <Check class="w-3 h-3 md:w-4 md:h-4" />
                          </button>

                          <!-- Decline Button -->
                          <button
                            @click="updateAcceptedStatus(ride.id, false)"
                            class="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-300"
                          >
                            <Ban class="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        </div>
                      </div>
                      <div class="mt-1 text-gray-800 flex items-center">
                        <MapPin class="w-3 h-3 md:w-4 md:h-4 text-black mr-1" />
                        {{ ride.from }}
                        <ArrowRight class="w-3 h-3 md:w-4 md:h-4 text-black mx-1" />
                        {{ ride.to }}
                      </div>
                    </li>
                  </ul>
                  <p v-else class="text-gray-500 text-sm md:text-base">
                    No one requested a ride.
                  </p>
                </div>
              </div>
            </div>
            <div
              class="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden lg:mt-5"
            >
              <div class="p-6 lg:p-8">
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <h4
                      class="text-lg md:text-xl font-semibold text-gray-800 flex items-center"
                    >
                      <ClockIcon class="w-5 h-5 md:w-6 md:h-6 text-black mr-2" />
                      Recent Rides
                    </h4>
                    <button
                      @click="refreshRecentRides"
                      class="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition duration-300"
                      title="Refresh"
                    >
                      <RotateCcw class="w-4 h-4 md:w-4 md:h-4 text-black" />
                    </button>
                  </div>
                  <ul class="space-y-3 overflow-y-auto max-h-32">
                    <template v-if="recentRides.length > 0">
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
                    </template>
                    <template v-else>
                      <li class="text-gray-500 text-sm">Nothing to show.</li>
                    </template>
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

<script>
import Navbar from "@/components/logoutadmin.vue";
export default {
  name: "AdminSection",
  components: {
    Navbar,
  },
};
</script>

<script setup>
import { supabase } from "../supabaseClient";
import { ref } from "vue";
import {
  Check,
  Ban,
  Clock,
  MapPin,
  ArrowRight,
  ClockIcon,
  MapPinIcon,
  ArrowRightIcon,
  RotateCcw,
} from "lucide-vue-next";

// Toast variables
const toastMessage = ref("");
const toastColor = ref("");
const toastVisible = ref(false);

// Show and hide toast messages
const showToast = (message, type) => {
  toastMessage.value = message;
  toastColor.value =
    type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white";
  toastVisible.value = true;

  setTimeout(() => {
    toastVisible.value = false;
  }, 3000);
};

// Reactive variables
const terminalLogs = ref([
  "Welcome to Hatid Kita!",
  "System initialized...",
  "Ready for ride requests.",
]);

const recentRides = ref([]);
const requestingRides = ref([]);

// Fetch recent rides
const fetchAllRecentRides = async () => {
  try {
    const { data: transactions, error } = await supabase
      .from("transactions")
      .select(
        `
        id,
        created_at,
        isCompleted,
        admin_transactions (from_loc, to_loc)
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    recentRides.value = transactions.map((transaction) => ({
      date: new Date(transaction.created_at).toLocaleString(),
      from: transaction.admin_transactions?.from_loc || "N/A",
      to: transaction.admin_transactions?.to_loc || "N/A",
      status:
        transaction.isCompleted === null
          ? "Pending"
          : transaction.isCompleted
          ? "Completed"
          : "Declined",
    }));
    showToast("Recent rides refreshed successfully.", "success");
  } catch (err) {
    console.error("Error fetching recent rides:", err);
    showToast("Failed to load recent rides. Please try again.", "error");
  }
};

// Fetch requesting rides
const fetchAllRequestingRides = async () => {
  try {
    const { data: transactions, error } = await supabase
      .from("transactions")
      .select(
        `
        id,
        created_at,
        isCompleted,
        admin_transactions (from_loc, to_loc)
      `
      )
      .is("isCompleted", null) // Only fetch pending rides
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    requestingRides.value = transactions.map((transaction) => ({
      id: transaction.id,
      date: new Date(transaction.created_at).toLocaleString(),
      from: transaction.admin_transactions?.from_loc || "N/A",
      to: transaction.admin_transactions?.to_loc || "N/A",
      status: "Pending",
    }));
    showToast("Requesting rides refreshed successfully.", "success");
  } catch (err) {
    console.error("Error fetching requesting rides:", err);
    showToast("Failed to load requesting rides. Please try again.", "error");
  }
};

// Refresh button handlers
const refreshRecentRides = () => {
  fetchAllRecentRides();
};

const refreshRequestRides = () => {
  fetchAllRequestingRides();
};

// Update the status of a ride (accept or decline)
const updateAcceptedStatus = async (transactionId, status) => {
  try {
    const { error: updateError } = await supabase
      .from("transactions")
      .update({ isCompleted: status })
      .eq("id", transactionId);

    if (updateError) throw new Error(updateError.message);
    // Step 2: Fetch additional details for the log
    const { data: transactionDetails, error: fetchError } = await supabase
      .from("transactions")
      .select(
        `
        id,
        admin_transactions (
          from_loc,
          to_loc
        ),
        users_transacts:users_transacts_id (
          description_loc,
          users_info:users_info_id (
            fullname,
            csu_id_number
          )
        )
      `
      )
      .eq("id", transactionId)
      .single();

    if (fetchError) {
      console.error("Error fetching transaction details:", fetchError.message);
      showToast("Failed to fetch transaction details. Please try again.", "error");
      return;
    }

    // Extract relevant details
    const {
      admin_transactions: { from_loc, to_loc },
      users_transacts: {
        description_loc,
        users_info: { fullname: name, csu_id_number },
      },
    } = transactionDetails;
    // Step 3: Log the details to terminalLogs
    terminalLogs.value.push(
      `Transaction Accepted:
      - ID: ${transactionId}
      - From: ${from_loc}
      - To: ${to_loc}
      - Description: ${description_loc}
      - User: ${name} (CSU ID: ${csu_id_number})`
    );

    fetchAllRequestingRides();
    showToast(`Transaction ${status ? "accepted" : "declined"} successfully.`, "success");
  } catch (err) {
    console.error("Error updating status:", err);
    showToast("Failed to update transaction status. Please try again.", "error");
  }
};

// Fetch rides on component mount
fetchAllRecentRides();
fetchAllRequestingRides();
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

<template>
  <Navbar />
  <section
    id="settings"
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
      <form @submit.prevent="updateUserInfo">
        <div class="bg-gray-100 p-8 relative">
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
          <div class="relative z-2">
            <h2
              class="text-3xl sm:text-2xl font-bold text-gray-800 mb-6 text-center"
            >
              Settings
            </h2>
            <div class="flex flex-col md:flex-row md:items-center mb-6">
              <div class="mb-4 md:mb-0 md:mr-6 self-center md:self-start">
                <div
                  class="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-black shadow-lg bg-white relative"
                >
                  <img
                    :src="avatarUrl || '/placeholder.svg?height=128&width=128'"
                    alt=""
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div class="flex-1 text-center md:text-left">
                <form @submit.prevent="handleSubmit('updateRepeat')">
                  <div class="space-y-3">
                    <div
                      class="flex items-center space-x-3 bg-white rounded-lg p-3 shadow justify-center md:justify-start"
                    >
                      <User class="w-5 h-5 text-black" />
                      <input
                        v-model="newName"
                        type="text"
                        id="FullnameInput"
                        class="text-gray-700 bg-transparent border-none focus:outline-none"
                        :placeholder="userData.fullName || 'Name'"
                        maxlength="50"
                        @input="validateFullname"
                      />
                      <p id="nameError" class="text-red-500">{{ nameError }}</p>
                    </div>

                    <div
                      class="flex items-center space-x-3 bg-white rounded-lg p-3 shadow justify-center md:justify-start"
                    >
                      <PhoneIcon class="w-5 h-5 text-black" />
                      <input
                        v-model="newNum"
                        type="text"
                        id="PhoneNumberInput"
                        class="text-gray-700 bg-transparent border-none focus:outline-none"
                        :placeholder="userData.phoneNumber || 'Number'"
                        maxlength="11"
                        @input="validateNumber"
                      />
                      <p id="numberError" class="text-red-500">
                        {{ numberError }}
                      </p>
                    </div>
                    <div class="p-6">
                      <button
                        type="submit"
                        class="w-full py-2 px-4 bg-black hover:bg-orange-950 rounded-md shadow-lg text-white font-semibold transition duration-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
                <form @submit.prevent="handleSubmit('updateOnce')">
                  <div class="space-y-3">
                    <h5><b>Can only be set and change once.</b></h5>
                    <div
                      class="flex items-center space-x-3 bg-white rounded-lg p-3 shadow justify-center md:justify-start"
                    >
                      <MailIcon class="w-5 h-5 text-black" />
                      <input
                        v-model="carsuEmail"
                        type="email"
                        maxlength="50"
                        id="CarsuEmailInput"
                        class="text-gray-700 bg-transparent border-none focus:outline-none"
                        :placeholder="
                          userData.carsuEmail || 'Enter your carsu email'
                        "
                      />
                      <p id="occupationError" class="text-red-500">
                        {{ emailError }}
                      </p>
                    </div>
                    <div
                      class="flex items-center space-x-3 bg-white rounded-lg p-3 shadow justify-center md:justify-start"
                    >
                      <Briefcase class="w-5 h-5 text-black" />
                      <input
                        v-model="occupation"
                        type="text"
                        maxlength="50"
                        id="OccupationInput"
                        class="text-gray-700 bg-transparent border-none focus:outline-none"
                        :placeholder="
                          userData.occupation || 'Enter your occupation'
                        "
                        @input="validateOccupation"
                      />
                      <p id="occupationError" class="text-red-500">
                        {{ occupationError }}
                      </p>
                    </div>
                    <div
                      class="flex items-center space-x-3 bg-white rounded-lg p-3 shadow justify-center md:justify-start"
                    >
                      <Hash class="w-5 h-5 text-black" />
                      <input
                        v-model="csuIdNumber"
                        type="text"
                        maxlength="50"
                        id="csuIdInput"
                        class="text-gray-700 bg-transparent border-none focus:outline-none"
                        :placeholder="
                          userData.csuIdNumber || 'Enter your ID number'
                        "
                        @input="validateCarsu"
                      />
                      <span id="occupationError" class="text-red-500">
                        {{ idnumError }}
                      </span>
                    </div>
                    <div class="p-6">
                      <button
                        type="submit"
                        class="w-full py-2 px-4 bg-black hover:bg-orange-950 rounded-md shadow-lg text-white font-semibold transition duration-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <!-- Avatar Selector -->
            <div class="">
              <h4 class="text-lg font-semibold text-gray-800 mb-2">
                Choose an Avatar
              </h4>
              <div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
                <div
                  v-for="(avatar, index) in avatars"
                  :key="index"
                  class="relative"
                >
                  <img
                    :src="avatar"
                    @click="selectAvatar(avatar)"
                    :class="{
                      'border-4 border-orange-600': avatar === avatarUrl,
                    }"
                    class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div class="sm:p-8">
        <form @submit.prevent="updatePassword" class="space-y-6">
          <h4
            class="text-xl font-semibold text-gray-800 mb-4 flex items-center"
          >
            <LockIcon class="w-6 h-6 text-black mr-2" />
            Change Password
          </h4>
          <div class="space-y-4">
            <div class="relative">
              <input
                v-model="currentPassword"
                type="password"
                id="current-password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <label
                for="current-password"
                class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600"
              >
                Current Password
              </label>
            </div>
            <div class="relative">
              <input
                v-model="newPassword"
                type="password"
                id="new-password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <label
                for="new-password"
                class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600"
              >
                New Password
              </label>
            </div>
            <div class="relative">
              <input
                v-model="confirmNewPassword"
                type="password"
                id="confirm-new-password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <label
                for="confirm-new-password"
                class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600"
              >
                Confirm New Password
              </label>
            </div>
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-black hover:bg-orange-950 rounded-md shadow-lg text-white font-semibold transition duration-200"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      newName: "",
      newNum: "",
      carsuEmail: "",
      csuIdNumber: "",
      occupation: "",
      //for identifying error
      nameError: "",
      numberError: "",
      emailError: "",
      occupationError: "",
      idnumError: "",
    };
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
    validateFullname() {
      try {
        if (!this.newName.trim()) throw new Error("Empty-name");
        if (this.newName.length < 10) throw new Error("Short");
        if (!/^[A-Za-z\s]+$/.test(this.newName)) throw new Error("invalidName");
        this.nameError = ""; // Clear error if validation passes
        return true;
      } catch (error) {
        if (error.message === "Empty-name") {
          this.nameError = "Full name is required.";
        } else if (error.message === "Short") {
          this.nameError = "Name should be at least 10 characters long.";
        } else if (error.message === "Invalid Name") {
          this.nameError = "Name can only contain letters and spaces.";
        }
        return false;
      }
    },

    validateNumber() {
      try {
        this.newNum = this.newNum.replace(/[^0-9]/g, "");
        if (!this.newNum.trim()) throw new Error("Empty-number");
        if (this.newNum.length < 11) throw new Error("shortNum");
        this.numberError = "";
        return true;
      } catch (error) {
        if (error.message === "Empty-number") {
          this.numberError = "Number field is empty. Please enter your number.";
        } else if (error.message === "Short Number") {
          this.numberError = "Phone number should be 11 digits long.";
        }
        return false;
      }
    },

    validateEmail() {
      try {
        // Check if the email matches the domain pattern
        const domainRegex = /^[^\s@]+@carsu\.edu\.ph$/;
        if (!domainRegex.test(this.carsuEmail))
          throw new Error("Invalid-domain");
        // Check if the email is empty or contains only spaces
        if (!this.carsuEmail.trim()) throw new Error("Empty-email");

        if (this.carsuEmail === "") {
          throw new Error("Empty-email");
        }

        this.emailError = ""; // Clear error if validation passes
        return true;
      } catch (error) {
        // Handle different error cases
        if (error.message === "Empty-email") {
          this.emailError = "Email field is empty. Please enter your email.";
        } else if (error.message === "Invalid-domain") {
          this.emailError = "Email must end with @carsu.edu.ph.";
        }
        return false;
      }
    },

    validateCarsu() {
      try {
        // Remove all non-digit characters
        this.csuIdNumber = this.csuIdNumber.replace(/[^0-9]/g, "");

        // Check if the number is empty
        if (!this.csuIdNumber.trim()) throw new Error("Empty-number");

        // Check for incorrect length
        if (this.csuIdNumber.length !== 7 && this.csuIdNumber.length !== 8) {
          throw new Error("invalidNum");
        }

        // Format the number with a dash after the 3rd digit
        this.csuIdNumber =
          this.csuIdNumber.slice(0, 3) + "-" + this.csuIdNumber.slice(3);

        // Reset error message and return true for a valid number
        this.idnumError = "";
        return true;
      } catch (error) {
        // Handle errors
        if (error.message === "Empty-number") {
          this.idnumError = "Number field is empty. Please enter your number.";
        } else if (error.message === "invalidNum") {
          this.idnumError = "ID number should be 8 digits long.";
        }
        return false;
      }
    },

    validateOccupation() {
      // Your validation logic here
      return this.occupation && this.occupation.trim() !== "";
    },
    // Other methods...

    async handleSubmit(formType) {
      if (formType === "updateRepeat") {
        if (this.validateFullname() && this.validateNumber()) {
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
              .update({
                fullname: this.newName,
                phone_number: this.newNum,
              })
              .eq("id", loggedInUser.id)
              .single();

            if (error) {
              console.error("Error Updating user details:", error.message);
              return;
            }
          } catch (error) {
            console.error("Error:", error.message);
          }
        } else {
          this.showToast("Please fill in all fields for Updating.", "error");
        }
      } else if (formType === "updateOnce") {
        if (
          this.validateOccupation() &&
          this.validateCarsu() &&
          this.validateEmail()
        ) {
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

            // Check if the user has already updated their info
            const { data: userInfo, error: fetchError } = await supabase
              .from("users_info")
              .select("info_updated")
              .eq("id", loggedInUser.id)
              .single();

            if (fetchError) {
              console.error("Error fetching user info:", fetchError.message);
              return;
            }

            if (userInfo.info_updated) {
              this.showToast(
                "You can only update your information once.",
                "error"
              );
              return;
            }

            // Proceed with updating user info
            const { data, error } = await supabase
              .from("users_info")
              .update({
                csu_id_number: this.csuIdNumber,
                occupation: this.occupation,
                carsu_email: this.carsuEmail,
                info_updated: true, // Mark as updated
              })
              .eq("id", loggedInUser.id)
              .single();

            if (error) {
              console.error("Error updating user details:", error.message);
              return;
            }
          } catch (error) {
            console.error("Error:", error.message);
          }
        } else {
          this.showToast("Please fill in all fields for updating.", "error");
        }
      }
    },
  },
};
</script>
<script setup>
import { supabase } from "../supabaseClient";
import { ref, onMounted } from "vue";
import {
  MailIcon,
  PhoneIcon,
  LockIcon,
  Hash,
  Briefcase,
  User,
} from "lucide-vue-next";
import Navbar from "@/components/body.vue";

defineProps({
  components: { Navbar },
});

const userData = ref({
  fullName: null,
  carsuEmail: null,
  phoneNumber: null,
  csuIdNumber: null,
  occupation: null,
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

const avatarUrl = ref(avatar1); // Reactive state for the selected avatar

// Function to save selected avatar in localStorage
const saveAvatarToLocalStorage = (avatar) => {
  localStorage.setItem("selectedAvatar", avatar);
};

// Function to display toast messages
const showToast = (message, type = "success") => {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `fixed bottom-4 right-4 bg-${
    type === "success" ? "green" : "red"
  }-500 text-white px-4 py-2 rounded shadow-md transition-opacity duration-300`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300); // Remove element after fading
  }, 3000);
};

// Function to load the avatar from localStorage on mount
const loadAvatarFromLocalStorage = () => {
  const savedAvatar = localStorage.getItem("selectedAvatar");
  if (savedAvatar) {
    avatarUrl.value = savedAvatar;
  }
};

// Function to handle avatar selection
const selectAvatar = (avatar) => {
  avatarUrl.value = avatar;
  saveAvatarToLocalStorage(avatar);
  showToast("Avatar updated successfully!", "success"); // Show toast on save
};

// Fetch user details when the component is mounted
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
      userData.value = {
        fullName: data.fullname,
        phoneNumber: data.phone_number,
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

// Initialize avatar selection and user data on mount
onMounted(() => {
  loadAvatarFromLocalStorage();
  fetchUserDetails();
});
</script>

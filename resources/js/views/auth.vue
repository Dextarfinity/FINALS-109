<template>
  <div class="relative w-full h-screen overflow-hidden">
    <svg
    viewBox="0 0 1428 174"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color: #d53369; stop-opacity: 1" />
        <stop offset="100%" style="stop-color: #daae51; stop-opacity: 1" />
      </linearGradient>
    </defs>
    <!-- Flip the SVG both vertically and horizontally by scaling x and y to -1 -->
    <g transform="scale(-1, -1) translate(-1428, -174)">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g
          transform="translate(-2.000000, 44.000000)"
          fill="url(#gradient)"
          fill-rule="nonzero"
        >
          <path
            d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
            opacity="0.100000001"
          ></path>
          <path
            d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
            opacity="0.100000001"
          ></path>
          <path
            d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
            id="Path-4"
            opacity="0.200000003"
          ></path>
        </g>
        <g
          transform="translate(-4.000000, 76.000000)"
          fill="url(#gradient)"
          fill-rule="nonzero"
        >
          <path
            d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
          ></path>
        </g>
      </g>
    </g>
  </svg>
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
    class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center bg-white authbody"
  >
    <!--Left Col-->
    <div class="w-full md:w-2/5 py-6 text-center">
      <img class="w-full md:w-5/5 z-50" src=".\images\loadingscreen.gif" />
    </div>

    <!--Right Col-->

    <div
      id="form-wrapper"
      class="formwrap max-w-md w-full rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 welcome_style"
    >
      <div id="form-container" :class="{ 'signup-active': currentForm === 'signup' }">
        <!-- Login Form -->
        <div id="login-form" class="form-slide">
          <h2 class="text-center text-4xl font-extrabold text-black">WELCOME</h2>
          <p class="text-center text-black pb-5">Sign in to your account</p>
          <form @submit.prevent="handleSubmit('login')" class="space-y-6 text-black">
            <div class="relative">
              <input
                v-model="loginEmail"
                placeholder="Email address"
                class="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
                id="login-email"
                name="login-email"
                type="email"
                maxlength="50"
                required
              />
              <label
                class="font-semibold absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm"
                for="login-email"
                >Email address</label
              >
            </div>
            <div class="relative">
              <input
                v-model="loginPassword"
                placeholder="Password"
                class="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
                id="login-password"
                name="login-password"
                type="password"
                required
                maxlength="50"
              />
              <label
                class="font-semibold absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm"
                for="login-password"
                >Password</label
              >
            </div>
            <div class="flex items-center justify-between">
              <label class="flex items-center text-sm text-black">
                <input
                  class="form-checkbox h-4 w-4 text-black bg-black border-black rounded"
                  type="checkbox"
                />
                <span class="ml-2 buttontext">Remember me</span>
              </label>
              <a class="text-sm text-black hover:underline buttontext" href="/forgotpass"
                >Forgot your password?</a
              >
            </div>

            <button
              class="w-full py-2 px-4 bg-black hover:bg-black rounded-md shadow-lg text-white font-semibold transition duration-200"
              type="submit"
            >
              Sign In
            </button>
            <hr class="divider-line" />
            <!-- Google Authentication Button -->
            <div class="text-center mt-4">
              <button
                @click="handleGoogleSignIn"
                class="w-full py-2 px-4 bg-white border border-gray-300 hover:bg-gray-100 rounded-md shadow-lg text-black font-semibold transition duration-200 flex items-center justify-center"
                type="button"
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google Icon"
                  class="w-6 h-6 mr-2"
                />
                Login with Google
              </button>
            </div>
          </form>
          <div class="text-center text-black mt-3">
            Don't have an account?
            <button
              @click="toggleForm('signup')"
              id="toggle-signup"
              class="text-black hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>

        <!-- Sign Up Form -->
        <div id="signup-form" class="form-slide">
          <h2 class="text-center text-4xl font-extrabold text-black">SIGN UP</h2>
          <p class="text-center text-black pb-5">Create your account</p>
          <form @submit.prevent="handleSubmit('signup')" class="space-y-6 text-black">
            <div class="relative">
              <input
                v-model="fullname"
                placeholder="Full Name"
                class="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
                id="signup-fullname"
                name="full-name"
                type="text"
                maxlength="50"
                required
                @input="validateFullname"
              />
              <p id="nameError" class="text-red-500">
                {{ nameError }}
              </p>
              <label
                class="font-bold absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm"
                for="signup-fullname"
                >Full Name</label
              >
            </div>

            <div class="relative">
              <input
                v-model="email"
                placeholder="Email address"
                class="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
                id="signup-email"
                name="signup-email"
                type="email"
                maxlength="50"
                required
              />
              <label
                class="font-bold absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm"
                for="signup-email"
                >Email address</label
              >
            </div>

            <div class="relative">
              <input
                v-model="phone_number"
                placeholder="Phone number"
                class="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
                id="number"
                name="number"
                type="text"
                maxlength="11"
                required
                @input="validateNumber"
              />
              <p id="numberError" class="text-red-500">
                {{ numberError }}
              </p>
              <label
                class="font-bold absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm"
                for="number"
                >Phone number</label
              >
            </div>

            <div class="relative">
              <input
                v-model="password"
                placeholder="Password"
                class="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
                id="signup-password"
                name="signup-password"
                type="password"
                maxlength="50"
                required
                @input="validatePassword"
              />
              <p id="passwordError" class="text-red-500">
                {{ passwordError }}
              </p>
              <label
                class="font-bold absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm"
                for="signup-password"
                >Password</label
              >
            </div>

            <!-- Confirm Password Field -->
            <div class="relative">
              <input
                v-model="confirmPassword"
                placeholder="Confirm Password"
                class="peer h-10 w-full border-b-2 border-black text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
                id="signup-confirm-password"
                name="confirm-password"
                type="password"
                maxlength="50"
                required
                @keypress.enter="validateConfirmPassword"
              />
              <p id="confirmPasswordError" class="text-red-500">
                {{ confirmPasswordError }}
              </p>
              <label
                class="font-bold absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm"
                for="signup-confirm-password"
                >Confirm Password</label
              >
            </div>

            <button
              class="w-full py-2 px-4 bg-black hover:bg-black rounded-md shadow-lg text-white font-semibold transition duration-200"
              type="submit"
            >
              Sign Up
            </button>
            <hr class="divider-line" />
            <!-- Google Authentication Button -->
            <div class="text-center mt-4">
              <button
                @click="handleGoogleSignIn"
                class="w-full py-2 px-4 bg-white border border-gray-300 hover:bg-gray-100 rounded-md shadow-lg text-black font-semibold transition duration-200 flex items-center justify-center"
                type="button"
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google Icon"
                  class="w-6 h-6 mr-2"
                />
                Continue with Google
              </button>
            </div>
          </form>
          <div class="text-center text-black mt-3">
            Already have an account?
            <button
              @click="toggleForm('login')"
              id="toggle-login"
              class="text-black hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
 
</template>

<script>
import { supabase } from "../supabaseClient"; // supabase link
import { useRouter } from "vue-router";

export default {
  name: "Auth",
  data() {
    return {
      currentForm: "login",
      //for signup
      fullname: "",
      email: "",
      phone_number: "",
      password: "",
      confirmPassword: "",
      //for login
      loginEmail: "",
      loginPassword: "",
      // for identifying error
      nameError: "",
      numberError: "",
      passwordError: "",
      confirmPasswordError: "",
      // for toast
      toastMessage: "",
      toastVisible: false,
      toastColor: "",
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    // Toast functions
    showToast(message, type) {
      this.toastMessage = message;
      this.toastColor =
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white";
      this.toastVisible = true;
      setTimeout(() => {
        this.hideToast();
      }, 3000);
    },
    hideToast() {
      this.toastVisible = false;
    },
    async handleGoogleSignIn() {
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
        });

        if (error) throw error;

        const session = data?.session;
        if (session && session.access_token) {
          localStorage.setItem("access_token", session.access_token);
          this.showToast("Google login successful!", "success");

          // Fetch user details from `auth.users`
          const { data: userData, error: userError } = await supabase.auth.getUser();
          if (userError) throw userError;

          const userId = userData?.user?.id; // Auth user ID (UUID)
          const email = userData?.user?.email; // Email
          const metadata =
            userData?.user?.user_metadata || userData?.user?.raw_user_meta_data;
          const fullName = metadata?.name || metadata?.full_name || "Unknown User";

          // Check if the user exists in `users_info`
          const { data: existingUser, error: fetchError } = await supabase
            .from("users_info")
            .select("*")
            .eq("id", userId)
            .single();

          if (fetchError || !existingUser) {
            // Insert new user into `users_info`
            const { error: insertError } = await supabase.from("users_info").insert([
              {
                id: userId, // UUID from auth.users
                email: email, // Email from auth.users
                fullname: fullName, // Full name from metadata
                info_updated: true, // Metadata is updated
              },
            ]);

            if (insertError) {
              console.error("Error inserting user into users_info:", insertError);
              throw new Error("Failed to insert user into users_info");
            }

            console.log("User successfully inserted into users_info.");
          } else {
            console.log("User already exists in users_info:", existingUser);
          }

          // Redirect to the home page
          this.$router.push("/homesec");
        } else {
          throw new Error("No session or access token found.");
        }
      } catch (error) {
        console.error("Google login error:", error);
        this.showToast("Google login error", "error");
      }
    },
    //for validations of input
    validateFullname() {
      try {
        if (!this.fullname.trim()) throw new Error("Empty-name");
        if (this.fullname.length < 10) throw new Error("short");
        if (!/^[A-Za-z\s]+$/.test(this.fullname)) throw new Error("invalidName");
        this.nameError = ""; // Clear error if validation passes
        return true;
      } catch (error) {
        if (error.message === "Empty-name") {
          this.nameError = "Full name is required.";
        } else if (error.message === "short") {
          this.nameError = "Name should be at least 10 characters long.";
        } else if (error.message === "invalidName") {
          this.nameError = "Name can only contain letters and spaces.";
        }
        return false;
      }
    },

    validateNumber() {
      try {
        this.phone_number = this.phone_number.replace(/[^0-9]/g, "");
        if (!this.phone_number.trim()) throw new Error("Empty-number");
        if (this.phone_number.length < 11) throw new Error("shortNum");
        this.numberError = "";
        return true;
      } catch (error) {
        if (error.message === "Empty-number") {
          this.numberError = "Number field is empty. Please enter your number.";
        } else if (error.message === "shortNum") {
          this.numberError = "Phone number should be 11 digits long.";
        }
        return false;
      }
    },

    validatePassword() {
      try {
        if (!this.password.trim()) throw new Error("Empty-password");
        if (this.password.length < 8) throw new Error("shortPassword");
        if (!/[A-Z]/.test(this.password)) throw new Error("noUppercase");
        if (!/[a-z]/.test(this.password)) throw new Error("noLowercase");
        if (!/[0-9]/.test(this.password)) throw new Error("noDigit");
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.password))
          throw new Error("noSpecialCharacter");
        this.passwordError = "";
        return true;
      } catch (error) {
        this.passwordError = error.message;
        return false;
      }
    },

    validateConfirmPassword() {
      if (this.confirmPassword !== this.password) {
        this.confirmPasswordError = "Passwords do not match.";
        return false;
      }
      this.confirmPasswordError = "";
      return true;
    },

    toggleForm(formType) {
      this.currentForm = formType;
    },

    async handleSubmit(formType) {
      if (formType === "login") {
        if (this.loginEmail && this.loginPassword) {
          try {
            const { data, error } = await supabase.auth.signInWithPassword({
              email: this.loginEmail,
              password: this.loginPassword,
            });

            if (error) throw error;

            let session = data.session;
            if (session) {
              localStorage.setItem("access_token", session.access_token);
              localStorage.setItem("refresh_token", session.refresh_token);
            }

            // Show success toast on login
            this.showToast("Login successful!", "success");
            this.$router.push("/homesec");
          } catch (error) {
            this.showToast(`Login error: ${error.message}`, "error");
          }
        } else {
          this.showToast("Please fill in all fields for login.", "error");
        }
      } else if (formType === "signup") {
        if (
          this.validateFullname() &&
          this.validatePassword() &&
          this.validateNumber() &&
          this.validateConfirmPassword()
        ) {
          try {
            const { data, error } = await supabase.auth.signUp({
              email: this.email,
              password: this.password,
            });

            if (error) throw error;

            const user_id = data.user?.id;
            if (!user_id) throw new Error("Failed to get user ID during signup");

            localStorage.setItem("user_id", user_id);

            const { error: insertError } = await supabase.from("users_info").insert([
              {
                id: user_id,
                email: this.email,
                phone_number: this.phone_number,
                fullname: this.fullname,
              },
            ]);

            if (insertError) throw new Error("Unable to save user details");

            // Show success toast on signup
            this.showToast(
              "Signup successful! Confirm your email to proceed login.",
              "success"
            );
            this.$router.push("/homesec");
          } catch (error) {
            this.showToast(`Signup error: ${error.message}`, "error");
          }
        } else {
          this.showToast("Please correct the errors in the signup form.", "error");
        }
      }
    },
  },
};
</script>

<style scoped>
.authbody {
  margin-top: -50px;
}

@media (min-width: 1024px) and (max-width: 1480px) {
  .authbody {
    margin-top: -100px;
  }
}

.divider-line {
  width: 100%;
  border: none;
  border-top: 1px solid #ccc; /* Adjust color as needed */
  margin: 10px 0;
}

svg {
  position: sticky;
  top: 0; /* Sticks the element to the top when scrolling */
  width: 100%; /* Adjust width as needed */
  height: auto; /* Keeps the aspect ratio */
  z-index: 10; /* Optional: To ensure it stays on top of other elements */
}
.body_sign_in {
  background-image: linear-gradient(to right, #e2dad6, #363333);
  overflow-x: hidden;
  overflow-y: auto;
}

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: -1;
}

.welcome_style {
  background-color: rgba(255, 255, 255, 0);
  background-size: 100% 300px;
  margin: 0 auto;
  max-width: 400px;
  backdrop-filter: blur(10px) !important;
  color: #000000 !important;
}

@media (max-width: 768px) {
  .welcome_style {
    max-width: 90%;
  }

  .authbody {
    margin-top: 0px;
  }

  h2.text-4xl {
    font-size: 3rem;
    /* Increase size for medium screens */
  }
}

@media (max-width: 480px) {
  .welcome_style {
    max-width: 95%;
  }

  h2.text-4xl {
    font-size: 1.7rem;
    /* Enlarge "WELCOME" text for mobile screens */
  }
  .authbody {
    margin-top: 0px;
  }
  p.text-center.text-black {
    font-size: 1.2rem;
    /* Slightly adjust paragraph size */
  }
  .buttontext {
    font-size: 0.7rem;
  }
  .authbody {
    margin-top: -100px;
  }
}

/* Container for both forms */
#form-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  /* Increase max-width for larger forms */
  overflow: hidden;
  padding: 2rem;
  /* Add padding around the container */
  background-color: rgba(255, 255, 255, 0);
  /* Slightly transparent background color */
  border-radius: 12px;
  /* Rounded corners */
  backdrop-filter: blur(10px);
  /* Apply blur effect to the background */
}

/* Form container with transition */
#form-container {
  display: flex;
  transition: transform 1s ease-in-out;
  width: 200%;
  /* Because two forms are side by side */
}

/* Individual forms taking 50% width each */
.form-slide {
  width: 50%;
  padding: 2rem;
  /* Increase padding for larger forms */
  box-sizing: border-box;
  /* Ensures padding doesn't affect total width */
}

/* Hide non-active form */
.hidden {
  display: none;
  /* Hide the form that is not active */
}

/* Slide to the sign-up form */
#form-container.signup-active {
  transform: translateX(-50%);
}
.gradient {
  background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
}

html,
body {
  overflow-x: hidden;
}
</style>

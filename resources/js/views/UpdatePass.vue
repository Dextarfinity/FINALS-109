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
                    <stop
                        offset="0%"
                        style="stop-color: #d53369; stop-opacity: 1"
                    />
                    <stop
                        offset="100%"
                        style="stop-color: #daae51; stop-opacity: 1"
                    />
                </linearGradient>
            </defs>
            <!-- Flip the SVG both vertically and horizontally by scaling x and y to -1 -->
            <g transform="scale(-1, -1) translate(-1428, -174)">
                <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                >
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
            class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center bg-white authbody"
        >
            <!--Left Col-->
            <div class="w-full md:w-2/5 py-6 text-center">
                <img
                    class="w-full md:w-5/5 z-50"
                    src=".\images\loadingscreen.gif"
                />
            </div>

            <!--Right Col-->

            <div
                id="form-wrapper"
                class="formwrap max-w-md w-full rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 welcome_style min-h-100"
            >
                <div
                    id="form-container"
                    :class="{ 'signup-active': currentForm === 'signup' }"
                >
                    <div id="signup-form" class="form-slide">
                        <h2
                            class="text-center text-4xl font-extrabold text-black"
                        >
                            UPDATE PASSWORD
                        </h2>
                        <p class="text-center text-black pt-6 pb-4">
                            Update And Confirm Your New Password:
                        </p>
                        <form
                            @submit.prevent="handleSubmit('signup')"
                            class="space-y-6 text-black"
                        >
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
                                    >New Password</label
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
                                <p
                                    id="confirmPasswordError"
                                    class="text-red-500"
                                >
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
                                Update Password
                            </button>
                            <hr class="divider-line" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/body.vue";

export default {
    name: "Updatepass",
    components: {
        Navbar,
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

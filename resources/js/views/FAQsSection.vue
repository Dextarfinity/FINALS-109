<template>
  <Navbar />
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
  <!-- FAQ Section -->
  <div class="leading-normal tracking-normal text-white gradient">
    <section id="faqs" class="relative flex flex-col justify-between">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <!-- FAQ Content -->
      <div
        class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 lg:mt-10 mb-10"
        style="z-index: 2"
      >
        <!-- Title -->
        <h2
          class="text-4xl font-extrabold text-center mt-6 mb-4 animate-fade-in-down text-white"
        >
          Frequently Asked Questions
        </h2>

        <!-- FAQs Container -->
        <div class="space-y-3">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl animate-fade-in"
            :style="{ animationDelay: `${index * 150}ms` }"
          >
            <h3 class="text-xl font-semibold mb-2 text-gray-800">
              {{ faq.question }}
            </h3>
            <p class="text-gray-600">{{ faq.answer }}</p>
          </div>
        </div>
      </div>

      <!-- Bottom Contact Section -->
      <div class="container mx-auto text-center lg:py-6" style="z-index: 2">
        <div class="container max-w-5xl mx-auto m-4">
          <h2 class="w-full my-2 text-4xl font-bold leading-tight text-center text-white">
            For more questions and inquiries. Feel free to email us!
          </h2>
          <div class="w-full mb-6">
            <div class="mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div class="flex flex-wrap">
            <!-- Right Column: Contact Form -->
            <div class="w-full sm:w-1/2 p-6">
              <div class="flex flex-col items-center justify-center light">
                <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                  <h2 class="text-2xl font-bold text-gray-800">Message Us!</h2>
                  <div class="w-full mb-4">
                    <div class="h-1 mx-auto gradient w-4/6 my-0 py-0 rounded-t"></div>
                  </div>

                  <!-- Contact Form -->
                  <form class="flex flex-col" id="feedbackForm">
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      class="bg-gray-100 mb-2 text-gray-800 border-0 rounded-md p-2"
                    />
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email address"
                      class="bg-gray-100 mb-2 text-gray-800 border-0 rounded-md p-2"
                    />
                    <textarea
                      id="message"
                      placeholder="Enter a message..."
                      class="bg-gray-100 mb-2 text-gray-800 border-0 rounded-md p-2"
                    ></textarea>
                    <button
                      type="submit"
                      class="mx-auto bg-orange-600 text-white rounded-md py-2 px-4"
                    >
                      Send message
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <!-- Left Column: Image Content -->
            <div class="w-full sm:w-1/2 p-6 text-start mt-6">
              <img
                class="w-full md:w-5/5 z-50"
                src="./images/loadingscreen.gif"
                alt="Loading Screen"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const faqs = [
  {
    question: "How do I request a ride?",
    answer:
      "To request a ride, select your location from the dropdown menu, provide a specific location if necessary, and click the 'Call Driver' button on the home screen.",
  },
  {
    question: "How long does it usually take for a driver to arrive?",
    answer:
      "Driver arrival times can vary depending on your location and driver availability. Typically, you can expect a driver to arrive within 5-15 minutes of your request.",
  },
  {
    question: "Is Hatid Kita available 24/7?",
    answer:
      "Hatid Kita operates during school hours and for a set period before and after school. Please check the app for the exact operating hours in your area.",
  },
];
</script>

<script>
import Navbar from "@/components/body.vue";
export default {
  data() {
    return {
      toastMessage: "", // Message to display in toast
      toastColor: "", // Toast background color
      toastVisible: false, // Toast visibility
    };
  },
  name: "faq",
  components: {
    Navbar,
  },
  methods: {
    showToast(message, type) {
      this.toastMessage = message;
      this.toastColor =
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white";
      this.toastVisible = true;

      setTimeout(() => {
        this.hideToast();
      }, 3000);
    },

    // Hide toast method
    hideToast() {
      this.toastVisible = false;
    },

    // Form submission method
    async submitFeedback(event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      try {
        const response = await fetch("http://localhost:5000/send-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        const data = await response.json();
        if (data.success) {
          this.showToast("Feedback sent successfully!", "success");
        } else {
          this.showToast("Failed to send feedback.", "error");
        }
      } catch (error) {
        console.error(error);
        this.showToast("An error occurred while sending feedback.", "error");
      }
    },
  },
  mounted() {
    document
      .getElementById("feedbackForm")
      .addEventListener("submit", this.submitFeedback);
  },
};
</script>

<style scoped>
.gradient {
  background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
}

/* Fade-in and Slide animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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
  animation: fadeIn 1s ease-in-out forwards;
}

.animate-fade-in-down {
  animation: fadeInDown 1s ease-in-out forwards;
}
</style>

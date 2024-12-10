<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ config('app.name') }}</title>
  @vite(['resources/css/app.css', 'resources/js/app.js'])
  <style>
    .loader-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .fade-out {
      animation: fadeOut 2s forwards;
    }

    .loader {
      position: relative;
      width: 164px;
      height: 100px;
    }

    .loader div {
      position: absolute;
      width: 10px;
      height: 30px;
      background-color: #ff6a00;
      border-radius: 5px;
      animation: loader_51899 1.5s ease-in-out infinite;
    }

    .loader .bar1 { left: 0px; animation-delay: 0s; }
    .loader .bar2 { left: 20px; animation-delay: 0.15s; }
    .loader .bar3 { left: 40px; animation-delay: 0.3s; }
    .loader .bar4 { left: 60px; animation-delay: 0.45s; }
    .loader .bar5 { left: 80px; animation-delay: 0.6s; }
    .loader .bar6 { left: 100px; animation-delay: 0.75s; }
    .loader .bar7 { left: 120px; animation-delay: 0.9s; }
    .loader .bar8 { left: 140px; animation-delay: 1.05s; }
    .loader .bar9 { left: 160px; animation-delay: 1.2s; }

    @keyframes loader_51899 {
      0% { height: 30px; transform: translate(0, 0); }
      50% { height: 70px; transform: translate(0, 35px); }
      100% { height: 30px; transform: translate(0, 0); }
    }

    @keyframes fadeOut {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }

    .hidden { display: none; }
  </style>
</head>
<body class="antialiased">
  <div class="loader-container" id="loader">
    <div class="loader">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
      <div class="bar4"></div>
      <div class="bar5"></div>
      <div class="bar6"></div>
      <div class="bar7"></div>
      <div class="bar8"></div>
      <div class="bar9"></div>
    </div>
  </div>
  <div id="app"></div>

  <script>
    const loader = document.getElementById('loader');

    function hideLoader() {
      loader.classList.add('fade-out');
      loader.addEventListener('animationend', () => {
        loader.classList.add('hidden');
      });
    }
  </script>
</body>
</html>

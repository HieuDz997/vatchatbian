(async function() {
  // Kiểm tra nếu đã chạy script
  if (window.Khanware) return;
  window.Khanware = true;

  const ver = "V3.1.1-Custom";
  let isDev = false;
  const repoPath = `https://raw.githubusercontent.com/Niximkk/Khanware/refs/heads/${isDev ? "dev/" : "main/"}`;

  // Thiết bị và người dùng
  let device = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
    apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
  };
  let user = { username: "Username", nickname: "Nickname", UID: 0 };
  let loadedPlugins = [];

  // Tải tài nguyên
  const loadScript = async (url, label) => {
    try {
      const response = await fetch(url);
      const script = await response.text();
      loadedPlugins.push(label);
      eval(script);
    } catch (e) {
      console.error(`Failed to load ${label}:`, e);
    }
  };
  const loadCss = url => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    document.head.appendChild(link);
  };

  // Tải Tailwind CSS và Google Fonts
  loadCss('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
  loadCss('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

  // Tùy chỉnh favicon
  document.querySelector("link[rel~='icon']").href = 'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ukh0rq22.png';

  // Splash screen
  const splashScreen = document.createElement('div');
  const showSplashScreen = async () => {
    splashScreen.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(135deg, #1e3a8a, #06b6d4);
      display: flex; align-items: center; justify-content: center; z-index: 9999;
      opacity: 0; transition: opacity 0.5s ease; user-select: none;
      font-family: 'Inter', sans-serif; font-size: 36px; font-weight: 700; color: white;
    `;
    splashScreen.innerHTML = '<span>Your Khanware</span>';
    document.body.appendChild(splashScreen);
    setTimeout(() => splashScreen.style.opacity = '1', 10);
  };
  const hideSplashScreen = async () => {
    splashScreen.style.opacity = '0';
    setTimeout(() => splashScreen.remove(), 1000);
  };

  // Tạo menu chính
  const setupMenu = () => {
    const menu = document.createElement('div');
    menu.id = 'khanware-menu';
    menu.className = 'fixed top-4 right-4 z-50 bg-gradient-to-br from-blue-900 to-cyan-900 text-white p-6 rounded-xl shadow-2xl w-80 font-inter';
    document.body.appendChild(menu);

    const title = document.createElement('h1');
    title.textContent = 'Your Khanware';
    title.className = 'text-2xl font-bold mb-4 text-center text-cyan-300';
    menu.appendChild(title);

    const buttons = [
      { text: 'Show Answers', action: () => window.features.showAnswers = !window.features.showAnswers },
      { text: 'Auto Answer', action: () => window.features.autoAnswer = !window.features.autoAnswer },
      { text: 'Minute Farmer', action: () => window.features.minuteFarmer = !window.features.minuteFarmer },
      { text: 'Close', action: () => menu.remove() }
    ];

    buttons.forEach(btn => {
      const button = document.createElement('button');
      button.textContent = btn.text;
      button.className = 'w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg mb-2 transition duration-300';
      button.onclick = btn.action;
      menu.appendChild(button);
    });
  };

  // Toast notifications
  loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css');
  loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin');
  const sendToast = (text, duration = 5000, gravity = 'bottom') => {
    if (window.Toastify) {
      Toastify({
        text, duration, gravity, position: 'center',
        style: { background: '#1e40af', fontFamily: 'Inter, sans-serif' }
      }).showToast();
    }
  };

  // Security
  document.addEventListener('contextmenu', (e) => !window.disableSecurity && e.preventDefault());
  document.addEventListener('keydown', (e) => {
    if (!window.disableSecurity && (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)))) {
      e.preventDefault();
    }
  });

  // Kiểm tra URL
  if (!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)) {
    alert("❌ Khanware Failed to Injected!\n\nYou need to run Khanware on Khan Academy! (https://www.khanacademy.org/)");
    window.location.href = "https://www.khanacademy.org/";
    return;
  }

  // Khởi động
  await showSplashScreen();
  loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin')
    .then(() => { DarkReader.setFetchMethod(window.fetch); DarkReader.enable(); });

  // Lấy thông tin người dùng
  try {
    const response = await fetch(`https://${window.location.hostname}/api/internal/graphql/getFullUserProfile`, {
      headers: {
        accept: "*/*",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-ka-fkey": "1"
      },
      body: '{"operationName":"getFullUserProfile","variables":{},"query":"query getFullUserProfile($kaid: String, $username: String) {\\n  user(kaid: $kaid, username: $username) {\\n    id\\n    username\\n    nickname\\n    __typename\\n  }\\n}"}',
      method: "POST",
      mode: "cors",
      credentials: "include"
    });
    const data = await response.json();
    user = {
      nickname: data.data.user.nickname,
      username: data.data.user.username,
      UID: data.data.user.id.slice(-5)
    };
  } catch (e) {
    console.error('Failed to fetch user profile:', e);
  }

  sendToast("🌟 Khanware injected successfully!");
  await new Promise(resolve => setTimeout(resolve, 500));
  sendToast(`⭐ Welcome back: ${user.nickname}`);
  if (device.apple) {
    await new Promise(resolve => setTimeout(resolve, 500));
    sendToast(`🛠️ Consider trying a different device!`);
  }

  loadedPlugins.forEach(plugin => sendToast(`🪝 ${plugin} Loaded!`, 2000, 'top'));
  await hideSplashScreen();

  // Tải các chức năng chính
  setupMenu();
  const mainFunctions = [
    'questionSpoof.js', 'videoSpoof.js', 'minuteFarm.js',
    'spoofUser.js', 'answerRevealer.js', 'rgbLogo.js',
    'customBanner.js', 'autoAnswer.js'
  ];
  for (const func of mainFunctions) {
    await loadScript(repoPath + 'functions/' + func, func);
  }

  console.clear();
})();

(async function() {
  try {
    // Kiểm tra nếu đã chạy script
    if (window.KavHack) return;
    window.KavHack = true;

    const ver = "KavHackHieuDz";
    let isDev = false;
    const repoPath = `https://raw.githubusercontent.com/Niximkk/Khanware/refs/heads/${isDev ? "dev/" : "main/"}`;

    // Thiết bị và người dùng
    let device = {
      mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
      apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
    };
    let user = { username: "Username", nickname: "Nickname", UID: 0 };
    let loadedPlugins = [];

    // Elements
    const unloader = document.createElement('unloader');
    const dropdownMenu = document.createElement('dropDownMenu');
    const watermark = document.createElement('watermark');
    const statsPanel = document.createElement('statsPanel');
    const splashScreen = document.createElement('splashScreen');

    // Globals
    window.features = {
      questionSpoof: true,
      videoSpoof: true,
      showAnswers: false,
      autoAnswer: false,
      customBanner: false,
      nextRecomendation: false,
      repeatQuestion: false,
      minuteFarmer: false,
      rgbLogo: false,
      darkMode: true
    };
    window.featureConfigs = {
      autoAnswerDelay: 3,
      customUsername: "Hiếu Dz",
      customPfp: "https://i.imgur.com/JDt99XK.jpeg"
    };

    // Security
    document.addEventListener('contextmenu', (e) => !window.disableSecurity && e.preventDefault());
    document.addEventListener('keydown', (e) => {
      if (!window.disableSecurity && (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)))) {
        e.preventDefault();
      }
    });
    console.log(Object.defineProperties(new Error, {
      toString: { value() { (new Error).stack.includes('toString@') && location.reload(); } },
      message: { get() { location.reload(); } }
    }));

    // Misc Styles
    document.head.appendChild(Object.assign(document.createElement('style'), {
      innerHTML: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #1e40af; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #facc15; }
      `
    }));
    document.querySelector("link[rel~='icon']").href = 'https://i.imgur.com/JDt99XK.jpeg';

    // Event Emitter
    class EventEmitter {
      constructor() { this.events = {}; }
      on(t, e) { if (typeof t === 'string') t = [t]; t.forEach(t => { this.events[t] = this.events[t] || []; this.events[t].push(e); }); }
      off(t, e) { if (typeof t === 'string') t = [t]; t.forEach(t => { if (this.events[t]) this.events[t] = this.events[t].filter(f => f !== e); }); }
      emit(t, ...e) { if (this.events[t]) this.events[t].forEach(f => f(...e)); }
      once(t, e) { if (typeof t === 'string') t = [t]; let s = (...i) => { e(...i); this.off(t, s); }; this.on(t, s); }
    }
    const plppdo = new EventEmitter();
    new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) if (mutation.type === 'childList') plppdo.emit('domChanged');
    }).observe(document.body, { childList: true, subtree: true });

    // Misc Functions
    window.debug = function(text) { console.log(`[KavHack Debug] ${text}`); };
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const findAndClickBySelector = selector => {
      const element = document.querySelector(selector);
      if (element) { element.click(); sendToast(`⭕ Pressing ${selector}...`, 1000); }
    };

    function sendToast(text, duration=5000, gravity='bottom') {
      if (window.Toastify) {
        Toastify({
          text: text,
          duration: duration,
          gravity: gravity,
          position: "center",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(135deg, #1e40af, #facc15)",
            fontFamily: "'Inter', sans-serif",
            borderRadius: "8px"
          }
        }).showToast();
        debug(text);
      } else {
        console.warn(`[KavHack] Toastify not loaded: ${text}`);
      }
    }

    async function showSplashScreen() {
      splashScreen.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        width: 400px; height: 300px; background: linear-gradient(135deg, #1e40af, #facc15);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        z-index: 9999; opacity: 0; transition: opacity 0.5s ease; user-select: none;
        font-family: 'Inter', sans-serif; color: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      `;
      splashScreen.innerHTML = `
        <img src="https://i.imgur.com/JDt99XK.jpeg" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px;">
        <span style="font-size: 30px; font-weight: 700;">Hiếu Dz</span>
        <span style="font-size: 24px; color: #facc15;">KavHack</span>
      `;
      document.body.appendChild(splashScreen);
      setTimeout(() => splashScreen.style.opacity = '1', 10);
    }

    async function hideSplashScreen() {
      splashScreen.style.opacity = '0';
      await delay(1000);
      splashScreen.remove();
    }

    async function loadScript(url, label) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
        const script = await response.text();
        loadedPlugins.push(label);
        eval(script);
        debug(`Loaded script: ${label}`);
      } catch (e) {
        debug(`Error loading script ${label}: ${e.message}`);
      }
    }

    async function loadCss(url) {
      try {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.onload = () => debug(`Loaded CSS: ${url}`);
        link.onerror = () => debug(`Error loading CSS: ${url}`);
        document.head.appendChild(link);
      } catch (e) {
        debug(`Error loading CSS ${url}: ${e.message}`);
      }
    }

    // Visual Functions
    function setupMenu() {
      loadScript(repoPath + 'visuals/mainMenu.js', 'mainMenu');
      loadScript(repoPath + 'visuals/statusPanel.js', 'statusPanel');
      loadScript(repoPath + 'visuals/widgetBot.js', 'widgetBot');
      if (isDev) loadScript(repoPath + 'visuals/devTab.js', 'devTab');
    }

    // Main Functions
    function setupMain() {
      loadScript(repoPath + 'functions/questionSpoof.js', 'questionSpoof');
      loadScript(repoPath + 'functions/videoSpoof.js', 'videoSpoof');
      loadScript(repoPath + 'functions/minuteFarm.js', 'minuteFarm');
      loadScript(repoPath + 'functions/spoofUser.js', 'spoofUser');
      loadScript(repoPath + 'functions/answerRevealer.js', 'answerRevealer');
      loadScript(repoPath + 'functions/rgbLogo.js', 'rgbLogo');
      loadScript(repoPath + 'functions/customBanner.js', 'customBanner');
      loadScript(repoPath + 'functions/autoAnswer.js', 'autoAnswer');
    }

    // Inject
    if (!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)) {
      alert("❌ KavHack Failed to Injected!\n\nYou need to run KavHack on Khan Academy! (https://www.khanacademy.org/)");
      window.location.href = "https://www.khanacademy.org/";
      return;
    }

    await showSplashScreen();

    await loadCss('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
    await loadCss('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    await loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin');
    await loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin').then(() => {
      if (window.DarkReader) {
        DarkReader.setFetchMethod(window.fetch);
        DarkReader.enable();
      }
    });

    try {
      const response = await fetch(`https://${window.location.hostname}/api/internal/graphql/getFullUserProfile`, {
        headers: {
          accept: "*/*",
          "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "application/json",
          priority: "u=1, i",
          "sec-ch-ua": '"Chromium";v="134", "Not:A-Brand";v="24", "Brave";v="134"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "sec-gpc": "1",
          "x-ka-fkey": "1"
        },
        referrer: "https://pt.khanacademy.org/profile/me/teacher/kaid_589810246138844031185299/class/6245691961556992",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: '{"operationName":"getFullUserProfile","variables":{},"query":"query getFullUserProfile($kaid: String, $username: String) {\\n  user(kaid: $kaid, username: $username) {\\n    id\\n    kaid\\n    key\\n    userId\\n    email\\n    username\\n    profileRoot\\n    gaUserId\\n    isPhantom\\n    isDeveloper: hasPermission(name: \\"can_do_what_only_admins_can_do\\")\\n    isPublisher: hasPermission(name: \\"can_publish\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isModerator: hasPermission(name: \\"can_moderate_users\\", scope: GLOBAL)\\n    isParent\\n    isTeacher\\n    isFormalTeacher\\n    isK4dStudent\\n    isKmapStudent\\n    isDataCollectible\\n    isChild\\n    isOrphan\\n    isCoachingLoggedInUser\\n    canModifyCoaches\\n    nickname\\n    hideVisual\\n    joined\\n    points\\n    countVideosCompleted\\n    bio\\n    profile {\\n    accessLevel\\n      __typename\\n    }\\n    soundOn\\n    muteVideos\\n    showCaptions\\n    prefersReducedMotion\\n    noColorInVideos\\n    newNotificationCount\\n    canHellban: hasPermission(name: \\"can_ban_users\\", scope: GLOBAL)\\n    canMessageUsers: hasPermission(\\n      name: \\"can_send_moderator_messages\\"\\n      scope: GLOBAL\\n    )\\n    isSelf: isActor\\n    hasStudents: hasCoachees\\n    hasClasses\\n    hasChildren\\n    hasCoach\\n    badgeCounts\\n    homepageUrl\\n    isMidsignupPhantom\\n    includesDistrictOwnedData\\n    includesKmapDistrictOwnedData\\n    includesK4dDistrictOwnedData\\n    canAccessDistrictsHomepage\\n    underAgeGate {\\n      parentEmail\\n      daysUntilCutoff\\n      approvalGivenAt\\n      __typename\\n    }\\n    authEmails\\n    signupDataIfUnverified {\\n      email\\n      emailBounced\\n      __typename\\n    }\\n    pendingEmailVerifications {\\n      email\\n      __typename\\n    }\\n    hasAccessToAIGuideCompanionMode\\n    hasAccessToAIGuideLearner\\n    hasAccessToAIGuideDistrictAdmin\\n    hasAccessToAIGuideParent\\n    hasAccessToAIGuideTeacher\\n    tosAccepted\\n    shouldShowAgeCheck\\n    birthMonthYear\\n    lastLoginCountry\\n    region\\n    userDistrictInfos {\\n      id\\n      isKAD\\n      district {\\n        id\\n        region\\n        __typename\\n      }\\n      __typename\\n    }\\n    schoolAffiliation {\\n      id\\n      location\\n      __typename\\n    }\\n    __typename\\n  }\\n  actorIsImpersonatingUser\\n  isAIGuideEnabled\\n  hasAccessToAIGuideDev\\n}"}',
        method: "POST",
        mode: "cors",
        credentials: "include"
      });
      if (!response.ok) throw new Error(`Failed to fetch user profile: ${response.status}`);
      const data = await response.json();
      user = { nickname: data.data.user.nickname, username: data.data.user.username, UID: data.data.user.id.slice(-5) };
    } catch (e) {
      debug(`Error fetching user profile: ${e.message}`);
    }

    sendToast("🌟 KavHack by HieuDz Injected!");
    await delay(500);
    sendToast(`⭐ Chào mừng bạn: ${user.nickname}`);
    if (device.apple) { await delay(500); sendToast(`🍎 Hãy thử thiết bị khác nhé!`); }
    loadedPlugins.forEach(plugin => sendToast(`🔌 ${plugin} Loaded!`, 2000, 'top'));
    await hideSplashScreen();
    setupMenu();
    setupMain();
    console.clear();

    // Tín dụng
    debug("KavHack by HieuDz, customized for learning purposes.");
  } catch (e) {
    console.error(`[KavHack Error] Failed to inject: ${e.message}`);
  }
})();

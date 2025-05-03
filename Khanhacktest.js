const ver = "HieuDz";
let isDev = false;

const repoPath = `https://raw.githubusercontent.com/Niximkk/Khanware/refs/heads/${isDev ? "dev/" : "main/"}`;
const keyVipUrl = `https://raw.githubusercontent.com/HieuDz997/vatchatbian/refs/heads/main/KeyVip.txt`;

let device = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
    apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
};

/* User */
let user = {
    username: "Username",
    nickname: "Nickname",
    UID: 0
}

let loadedPlugins = [];

/* Elements */
const unloader = document.createElement('unloader');
const dropdownMenu = document.createElement('dropDownMenu');
const watermark = document.createElement('watermark');
const statsPanel = document.createElement('statsPanel');
const splashScreen = document.createElement('splashScreen');

/* Globals */
window.features = {
    questionSpoof: true,
    videoSpoof: true,
    showAnswers: false,
    autoAnswer: false,
    customBanner: false,
    nextRecomendation: false,
    repeatQuestion: false,
    minuteFarmer: false,
    rgbLogo: false
};
window.featureConfigs = {
    autoAnswerDelay: 3,
    customUsername: "",
    customPfp: ""
};

/* Security */
document.addEventListener('contextmenu', (e) => !window.disableSecurity && e.preventDefault());
document.addEventListener('keydown', (e) => { if (!window.disableSecurity && (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)))) { e.preventDefault(); } });
console.log(Object.defineProperties(new Error, { toString: {value() {(new Error).stack.includes('toString@') && location.reload();}}, message: {get() {location.reload();}}, }));

/* Misc Styles */
document.head.appendChild(Object.assign(document.createElement("style"),{innerHTML:"@font-face{font-family:'MuseoSans';src:url('https://corsproxy.io/?url=https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf')format('truetype')}" }));
document.head.appendChild(Object.assign(document.createElement('style'),{innerHTML:"::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #555; }"}));
document.querySelector("link[rel~='icon']").href = 'https://i.imgur.com/JDt99XK.jpeg';

/* Emmiter */
class EventEmitter{constructor(){this.events={}}on(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]||(this.events[t]=[]),this.events[t].push(e)})}off(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]&&(this.events[t]=this.events[t].filter(t=>t!==e))})}emit(t,...e){this.events[t]&&this.events[t].forEach(t=>{t(...e)})}once(t,e){"string"==typeof t&&(t=[t]);let s=(...i)=>{e(...i),this.off(t,s)};this.on(t,s)}};
const plppdo = new EventEmitter();

new MutationObserver((mutationsList) => { for (let mutation of mutationsList) if (mutation.type === 'childList') plppdo.emit('domChanged'); }).observe(document.body, { childList: true, subtree: true });

/* Misc Functions */
window.debug = function(text) { console.log(`[HieuDzKavHack Debug] ${text}`); }
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => { const audio = new Audio(url); audio.play(); debug(`🔊 Playing audio from ${url}`); };
const findAndClickBySelector = selector => { const element = document.querySelector(selector); if (element) { element.click(); sendToast(`⭕ Pressionando ${selector}...`, 1000); } };

function sendToast(text, duration=5000, gravity='bottom') { if (window.Toastify) { Toastify({ text: text, duration: duration, gravity: gravity, position: "center", stopOnFocus: true, style: { background: "#000000" } }).showToast(); debug(text); } else { console.warn(`[HieuDzKavHack] Toastify not loaded: ${text}`); } };

// Thêm chức năng kiểm tra key
async function checkKey() {
    // Đếm số lần inject
    let injectCount = parseInt(localStorage.getItem('injectCount')) || 0;
    injectCount++;
    localStorage.setItem('injectCount', injectCount);

    // Kiểm tra key đã lưu
    const savedKey = localStorage.getItem('savedKey');
    if (savedKey) {
        const isValid = await validateKey(savedKey);
        if (isValid) {
            sendToast(`✅ Key hợp lệ: ${savedKey}`, 3000);
            return true;
        } else {
            localStorage.removeItem('savedKey');
            localStorage.removeItem('keyTimestamp');
            sendToast(`❌ Key không hợp lệ hoặc đã hết hạn! Vui lòng nhập lại.`, 3000);
        }
    }

    // Nhập key thủ công
    return new Promise(resolve => {
        const keyPrompt = prompt("Nhập key (XXXX-XXXX-XXXX-XXXX hoặc Key VIP):");
        if (keyPrompt) {
            const isValid = await validateKey(keyPrompt);
            if (isValid) {
                localStorage.setItem('savedKey', keyPrompt);
                sendToast(`✅ Key hợp lệ: ${keyPrompt}`, 3000);
                resolve(true);
            } else {
                sendToast(`❌ Key không hợp lệ! Vui lòng thử lại.`, 3000);
                resolve(false);
            }
        } else {
            sendToast(`❌ Không nhập key! Script sẽ dừng.`, 3000);
            resolve(false);
        }
    });
}

// Thêm chức năng validate key
async function validateKey(key) {
    // Tải danh sách key VIP mới mỗi lần kiểm tra
    let vipKeys = [];
    try {
        const response = await fetch(keyVipUrl);
        if (response.ok) {
            const text = await response.text();
            vipKeys = text.split('\n').map(k => k.trim()).filter(k => k);
        } else {
            debug(`Failed to fetch VIP keys: Status ${response.status}`);
        }
    } catch (e) {
        debug(`Error fetching VIP keys: ${e.message}`);
    }

    // Kiểm tra key VIP
    if (vipKeys.includes(key)) return true;

    // Kiểm tra key free
    const keyRegex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    if (!keyRegex.test(key)) return false;

    const parts = key.split('-');
    const randomPart = parts.slice(0, 3).join('');
    const checksum = parts[3];

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const sum = randomPart.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const expectedChecksum = [
        chars[sum % 36],
        chars[Math.floor(sum / 36) % 36],
        chars[Math.floor(sum / 1296) % 36],
        chars[Math.floor(sum / 46656) % 36]
    ].join('');
    if (checksum !== expectedChecksum) return false;

    const timestamp = localStorage.getItem('keyTimestamp');
    if (!timestamp) return false;
    const timeDiff = Date.now() - parseInt(timestamp);
    const twoDays = 48 * 60 * 60 * 1000;
    return timeDiff <= twoDays;
}

/* Visual Functions */
function setupMenu() {
    loadScript(repoPath+'visuals/mainMenu.js', 'mainMenu');
    loadScript(repoPath+'visuals/statusPanel.js', 'statusPanel');
    loadScript(repoPath+'visuals/widgetBot.js', 'widgetBot');
    if(isDev) loadScript(repoPath+'visuals/devTab.js', 'devTab');
}

/* Main Functions */ 
function setupMain(){
    loadScript(repoPath+'functions/questionSpoof.js', 'questionSpoof');
    loadScript(repoPath+'functions/videoSpoof.js', 'videoSpoof');
    loadScript(repoPath+'functions/minuteFarm.js', 'minuteFarm');
    loadScript(repoPath+'functions/spoofUser.js', 'spoofUser');
    loadScript(repoPath+'functions/answerRevealer.js', 'answerRevealer');
    loadScript(repoPath+'functions/rgbLogo.js', 'rgbLogo');
    loadScript(repoPath+'functions/customBanner.js', 'customBanner');
    loadScript(repoPath+'functions/autoAnswer.js', 'autoAnswer');
}

/* Inject */
if (!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)) { alert("❌ Không Thể Inject!\n\nVui lòng không dung HieuDz Kav Hack trên web khác! (https://pt.khanacademy.org/)"); window.location.href = "https://pt.khanacademy.org/"; }

// Thêm kiểm tra key trước khi chạy
(async () => {
    const isKeyValid = await checkKey();
    if (!isKeyValid) return;

    showSplashScreen();

    loadScript('https://raw.githubusercontent.com/adryd325/oneko.js/refs/heads/main/oneko.js', 'onekoJs').then(() => { onekoEl = document.getElementById('oneko'); onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')"; onekoEl.style.display = "none"; });
    loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin').then(()=>{ DarkReader.setFetchMethod(window.fetch); DarkReader.enable(); })
    loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastifyCss');
    loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin')
    .then(async () => {
        await fetch(`https://${window.location.hostname}/api/internal/graphql/getFullUserProfile`,{headers:{accept:"*/*","accept-language":"pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/json",priority:"u=1, i","sec-ch-ua":'"Chromium";v="134", "Not:A-Brand";v="24", "Brave";v="134"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Windows"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-origin","sec-gpc":"1","x-ka-fkey":"1"},referrer:"https://pt.khanacademy.org/profile/me/teacher/kaid_589810246138844031185299/class/6245691961556992",referrerPolicy:"strict-origin-when-cross-origin",body:'{"operationName":"getFullUserProfile","variables":{},"query":"query getFullUserProfile($kaid: String, $username: String) {\\n  user(kaid: $kaid, username: $username) {\\n    id\\n    kaid\\n    key\\n    userId\\n    email\\n    username\\n    profileRoot\\n    gaUserId\\n    isPhantom\\n    isDeveloper: hasPermission(name: \\"can_do_what_only_admins_can_do\\")\\n    isPublisher: hasPermission(name: \\"can_publish\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isModerator: hasPermission(name: \\"can_moderate_users\\", scope: GLOBAL)\\n    isParent\\n    isTeacher\\n    isFormalTeacher\\n    isK4dStudent\\n    isKmapStudent\\n    isDataCollectible\\n    isChild\\n    isOrphan\\n    isCoachingLoggedInUser\\n    canModifyCoaches\\n    nickname\\n    hideVisual\\n    joined\\n    points\\n    countVideosCompleted\\n    bio\\n    profile {\\n      accessLevel\\n      __typename\\n    }\\n    soundOn\\n    muteVideos\\n    showCaptions\\n    prefersReducedMotion\\n    noColorInVideos\\n    newNotificationCount\\n    canHellban: hasPermission(name: \\"can_ban_users\\", scope: GLOBAL)\\n    canMessageUsers: hasPermission(\\n      name: \\"can_send_moderator_messages\\"\\n      scope: GLOBAL\\n    )\\n    isSelf: isActor\\n    hasStudents: hasCoachees\\n    hasClasses\\n    hasChildren\\n    hasCoach\\n    badgeCounts\\n    homepageUrl\\n    isMidsignupPhantom\\n    includesDistrictOwnedData\\n    includesKmapDistrictOwnedData\\n    includesK4dDistrictOwnedData\\n    canAccessDistrictsHomepage\\n    underAgeGate {\\n      parentEmail\\n      daysUntilCutoff\\n      approvalGivenAt\\n      __typename\\n    }\\n    authEmails\\n    signupDataIfUnverified {\\n      email\\n      emailBounced\\n      __typename\\n    }\\n    pendingEmailVerifications {\\n      email\\n      __typename\\n    }\\n    hasAccessToAIGuideCompanionMode\\n    hasAccessToAIGuideLearner\\n    hasAccessToAIGuideDistrictAdmin\\n    hasAccessToAIGuideParent\\n    hasAccessToAIGuideTeacher\\n    tosAccepted\\n    shouldShowAgeCheck\\n    birthMonthYear\\n    lastLoginCountry\\n    region\\n    userDistrictInfos {\\n      id\\n      isKAD\\n      district {\\n        id\\n        region\\n        __typename\\n      }\\n      __typename\\n    }\\n    schoolAffiliation {\\n      id\\n      location\\n      __typename\\n    }\\n    __typename\\n  }\\n  actorIsImpersonatingUser\\n  isAIGuideEnabled\\n  hasAccessToAIGuideDev\\n}"}',method:"POST",mode:"cors",credentials:"include"})
        .then(async response => { let data = await response.json(); user = { nickname: data.data.user.nickname, username: data.data.user.username, UID: data.data.user.id.slice(-5) }; })
        
        sendToast("🌿 HieuDz Kav Hack Injected!");
        
        playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');
        
        await delay(500);
        
        sendToast(`⭐ HieuDz Kav Hack Xin Chào Bạn : ${user.nickname}`);
        if(device.apple) { await delay(500); sendToast(`🪽 Thế còn việc mua một chiếc Samsung thì sao?`); }
        
        loadedPlugins.forEach(plugin => sendToast(`🪝 ${plugin} Loaded!`, 2000, 'top') );
        
        hideSplashScreen();
        setupMenu();
        setupMain();
        
        console.clear();
    });
})();

/* Thank you to everyone who has purchased access to my cheat as of 10/28/24.

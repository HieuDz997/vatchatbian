const setFeatureByPath = (path, value) => { let obj = window; const parts = path.split('.'); while (parts.length > 1) obj = obj[parts.shift()]; obj[parts[0]] = value; }

function addFeature(features) {
    const feature = document.createElement('feature');
    features.forEach(attribute => {
        let element = attribute.type === 'nonInput' ? document.createElement('label') : document.createElement('input');
        if (attribute.type === 'nonInput') element.innerHTML = attribute.name;
        else { element.type = attribute.type; element.id = attribute.name; }

        if (attribute.attributes) {
            attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                value = value ? value.replace(/"/g, '') : '';
                key === 'style' ? element.style.cssText = value : element.setAttribute(key, value);
            });
        }

        if (attribute.variable) element.setAttribute('setting-data', attribute.variable);
        if (attribute.dependent) element.setAttribute('dependent', attribute.dependent);
        if (attribute.className) element.classList.add(attribute.className);

        if (attribute.labeled) {
            const label = document.createElement('label');
            if (attribute.className) label.classList.add(attribute.className);
            if (attribute.attributes) {
                attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                    value = value ? value.replace(/"/g, '') : '';
                    key === 'style' ? label.style.cssText = value : label.setAttribute(key, value);
                });
            }
            label.innerHTML = `${element.outerHTML} ${attribute.label}`;
            feature.appendChild(label);
        } else {
            feature.appendChild(element);
        }
    });
    dropdownMenu.innerHTML += feature.outerHTML;
}

function handleInput(ids, callback = null) {
    (Array.isArray(ids) ? ids.map(id => document.getElementById(id)) : [document.getElementById(ids)])
    .forEach(element => {
        if (!element) return;
        const setting = element.getAttribute('setting-data'),
            dependent = element.getAttribute('dependent'),
            handleEvent = (e, value) => {
                setFeatureByPath(setting, value);
                if (callback) callback(value, e);
            };

        if (element.type === 'checkbox') {
            element.addEventListener('change', (e) => {
                playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/5os0bypi.wav');
                handleEvent(e, e.target.checked);
                if (dependent) dependent.split(',').forEach(dep => 
                    document.querySelectorAll(`.${dep}`).forEach(depEl => 
                        depEl.style.display = e.target.checked ? null : "none"));
            });
        } else {
            element.addEventListener('input', (e) => handleEvent(e, e.target.value));
        }
    });
}

/* NEXUS VIP Control Center - Ultra Premium Design */
Object.assign(watermark.style, {
    position: 'fixed',
    top: '30px',
    right: '30px',
    width: '65px',
    height: '65px',
    background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.95), rgba(25, 25, 25, 0.95))',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    zIndex: '10001',
    transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: `
        0 20px 60px rgba(0, 0, 0, 0.4),
        0 5px 15px rgba(0, 255, 135, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        inset 0 -1px 0 rgba(0, 0, 0, 0.3)
    `,
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    overflow: 'hidden'
});

// Add animated background pattern
const patternEl = document.createElement('div');
Object.assign(patternEl.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: `
        radial-gradient(circle at 20% 20%, rgba(0, 255, 135, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(96, 239, 255, 0.1) 0%, transparent 50%)
    `,
    animation: 'pulse 4s ease-in-out infinite',
    borderRadius: 'inherit',
    zIndex: '-1'
});

watermark.appendChild(patternEl);

// Main logo with enhanced styling
watermark.innerHTML += `
    <div class="nexus-logo" style="
        font-size: 24px; 
        font-weight: 800; 
        background: linear-gradient(135deg, #00ff87 0%, #60efff 50%, #9d4edd 100%); 
        -webkit-background-clip: text; 
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 0 12px rgba(0,255,135,0.4));
        position: relative;
        z-index: 2;
        transition: all 0.3s ease;
        pointer-events: none;
    ">HZ</div>
`;

if (device.mobile) {
    watermark.style.right = '20px';
    watermark.style.top = '20px';
    watermark.style.width = '55px';
    watermark.style.height = '55px';
}

document.body.appendChild(watermark);

// Enhanced drag functionality
let isDragging = false, offsetX, offsetY, isMenuOpen = false;

watermark.addEventListener('mousedown', e => {
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
    offsetX = e.clientX - watermark.offsetLeft;
    offsetY = e.clientY - watermark.offsetTop;
    watermark.style.transform = 'scale(0.95) rotate(5deg)';
    watermark.style.filter = 'brightness(1.2)';
});

document.addEventListener('mouseup', (e) => {
    if (isDragging) {
        isDragging = false;
        watermark.style.transform = 'scale(1) rotate(0deg)';
        watermark.style.filter = 'brightness(1)';
    }
});

// Click event for toggle
watermark.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
        toggleMenu();
    }
});

document.addEventListener('mousemove', e => {
    if (isDragging) {
        e.preventDefault();
        let newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - watermark.offsetWidth));
        let newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - watermark.offsetHeight));
        Object.assign(watermark.style, { 
            left: `${newX}px`, 
            top: `${newY}px`,
            right: 'auto'
        });
        if (isMenuOpen) closeMenu();
    }
});

// Click outside to close menu
document.addEventListener('click', (e) => {
    if (!watermark.contains(e.target) && isMenuOpen) {
        closeMenu();
    }
});

/* NEXUS Command Center - Revolutionary Design */
Object.assign(dropdownMenu.style, {
    position: 'fixed',
    top: '110px',
    right: '30px',
    width: '380px',
    maxHeight: '85vh',
    overflowY: 'auto',
    background: `
        linear-gradient(145deg, 
            rgba(8, 8, 12, 0.98) 0%, 
            rgba(15, 15, 20, 0.96) 50%, 
            rgba(12, 12, 18, 0.98) 100%
        )
    `,
    backdropFilter: 'blur(50px) saturate(180%)',
    WebkitBackdropFilter: 'blur(50px) saturate(180%)',
    borderRadius: '28px',
    color: '#ffffff',
    fontSize: '15px',
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '500',
    display: 'none',
    flexDirection: 'column',
    zIndex: '10000',
    padding: '32px 28px',
    cursor: 'default',
    userSelect: 'none',
    transition: 'all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: `
        0 50px 100px rgba(0, 0, 0, 0.6),
        0 20px 40px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.08),
        0 0 60px rgba(0, 255, 135, 0.15)
    `,
    border: '1px solid rgba(255, 255, 255, 0.06)',
    transform: 'translateY(-30px) scale(0.8)',
    opacity: '0'
});

// Mobile responsive
if (device.mobile) {
    Object.assign(dropdownMenu.style, {
        right: '20px',
        width: 'calc(100vw - 40px)',
        maxWidth: '350px',
        top: '90px'
    });
}

function toggleMenu() {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    isMenuOpen = true;
    dropdownMenu.style.display = 'flex';
    
    // Enhanced opening animation
    const logo = watermark.querySelector('.nexus-logo');
    if (logo) {
        logo.style.transform = 'rotate(180deg) scale(1.1)';
    }
    watermark.style.background = 'linear-gradient(145deg, rgba(0, 255, 135, 0.15), rgba(96, 239, 255, 0.15))';
    watermark.style.boxShadow = `
        0 25px 70px rgba(0, 0, 0, 0.5),
        0 10px 25px rgba(0, 255, 135, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.15)
    `;
    
    requestAnimationFrame(() => {
        dropdownMenu.style.transform = 'translateY(0) scale(1)';
        dropdownMenu.style.opacity = '1';
    });
    
    if (typeof playAudio === 'function') {
        playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav');
    }
}

function closeMenu() {
    isMenuOpen = false;
    
    // Enhanced closing animation
    const logo = watermark.querySelector('.nexus-logo');
    if (logo) {
        logo.style.transform = 'rotate(0deg) scale(1)';
    }
    watermark.style.background = 'linear-gradient(145deg, rgba(15, 15, 15, 0.95), rgba(25, 25, 25, 0.95))';
    watermark.style.boxShadow = `
        0 20px 60px rgba(0, 0, 0, 0.4),
        0 5px 15px rgba(0, 255, 135, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `;
    
    dropdownMenu.style.transform = 'translateY(-30px) scale(0.8)';
    dropdownMenu.style.opacity = '0';
    
    setTimeout(() => {
        dropdownMenu.style.display = 'none';
    }, 700);
    
    if (typeof playAudio === 'function') {
        playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav');
    }
}

dropdownMenu.innerHTML = `
    <style>
        @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
        }
        
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
        }

        /* Ultra Premium Scrollbar */
        *::-webkit-scrollbar { width: 6px; }
        *::-webkit-scrollbar-track { 
            background: rgba(255, 255, 255, 0.03); 
            border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb { 
            background: linear-gradient(45deg, rgba(0, 255, 135, 0.6), rgba(96, 239, 255, 0.6)); 
            border-radius: 10px; 
            transition: all 0.3s ease;
        }
        *::-webkit-scrollbar-thumb:hover { 
            background: linear-gradient(45deg, rgba(0, 255, 135, 0.8), rgba(96, 239, 255, 0.8)); 
        }

        /* Revolutionary Toggle Switches */
        input[type="checkbox"] {
            appearance: none;
            width: 56px;
            height: 28px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            margin-right: 16px;
            cursor: pointer;
            position: relative;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid rgba(255, 255, 255, 0.06);
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        input[type="checkbox"]::before {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 22px;
            height: 22px;
            background: linear-gradient(145deg, #ffffff, #f0f0f0);
            border-radius: 50%;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 
                0 4px 12px rgba(0, 0, 0, 0.3),
                0 2px 4px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        input[type="checkbox"]::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 8px;
            width: 8px;
            height: 8px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            transform: translateY(-50%) scale(0);
            transition: all 0.3s ease;
        }
        
        input[type="checkbox"]:checked {
            background: linear-gradient(145deg, #00ff87, #60efff);
            border-color: rgba(0, 255, 135, 0.5);
            box-shadow: 
                0 0 30px rgba(0, 255, 135, 0.4),
                inset 0 1px 3px rgba(255, 255, 255, 0.2);
        }
        
        input[type="checkbox"]:checked::before {
            transform: translateX(28px);
            background: linear-gradient(145deg, #ffffff, #f8f8f8);
            box-shadow: 
                0 6px 20px rgba(0, 0, 0, 0.3),
                0 0 15px rgba(0, 255, 135, 0.5);
        }
        
        input[type="checkbox"]:checked::after {
            left: 32px;
            background: rgba(0, 255, 135, 0.8);
            transform: translateY(-50%) scale(1);
        }

        /* Next-Gen Input Fields */
        input[type="text"], input[type="number"] {
            width: 100%;
            border: none;
            color: #ffffff;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.08));
            padding: 18px 20px;
            border-radius: 16px;
            font-family: inherit;
            font-size: 15px;
            font-weight: 500;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            margin-top: 12px;
            border: 1px solid rgba(255, 255, 255, 0.06);
            box-shadow: 
                inset 0 2px 4px rgba(0, 0, 0, 0.1),
                0 1px 3px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }
        
        input[type="text"]:focus, input[type="number"]:focus {
            outline: none;
            background: linear-gradient(145deg, rgba(0, 255, 135, 0.08), rgba(96, 239, 255, 0.08));
            border-color: rgba(0, 255, 135, 0.4);
            box-shadow: 
                0 0 0 4px rgba(0, 255, 135, 0.15),
                0 8px 25px rgba(0, 255, 135, 0.2),
                inset 0 1px 3px rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }
        
        input[type="text"]::placeholder {
            color: rgba(255, 255, 255, 0.4);
            font-weight: 400;
        }

        /* Futuristic Range Slider */
        input[type="range"] {
            width: 100%;
            height: 8px;
            border-radius: 4px;
            background: linear-gradient(90deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(0, 255, 135, 0.2) 50%, 
                rgba(255, 255, 255, 0.1) 100%);
            outline: none;
            margin: 20px 0;
            cursor: pointer;
            appearance: none;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
        }
        
        input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(145deg, #00ff87, #60efff);
            cursor: pointer;
            box-shadow: 
                0 6px 20px rgba(0, 255, 135, 0.4),
                0 0 15px rgba(96, 239, 255, 0.3),
                inset 0 1px 2px rgba(255, 255, 255, 0.3);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 2px solid rgba(255, 255, 255, 0.8);
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.15);
            box-shadow: 
                0 8px 30px rgba(0, 255, 135, 0.6),
                0 0 25px rgba(96, 239, 255, 0.5);
        }

        /* Elegant Interactive Labels */
        label {
            display: flex;
            align-items: center;
            color: rgba(255, 255, 255, 0.9);
            padding: 16px 20px;
            font-weight: 500;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            border-radius: 14px;
            margin: 3px 0;
            font-size: 15px;
            position: relative;
            overflow: hidden;
        }
        
        label::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255, 255, 255, 0.05), 
                transparent);
            transition: left 0.5s ease;
        }
        
        label:hover {
            background: linear-gradient(145deg, 
                rgba(255, 255, 255, 0.06), 
                rgba(0, 255, 135, 0.04));
            transform: translateX(8px);
            box-shadow: 
                0 4px 15px rgba(0, 255, 135, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        label:hover::before {
            left: 100%;
        }

        /* Sophisticated Section Headers */
        label:not(:has(input)):not([style*="font-size"]) {
            color: transparent;
            background: linear-gradient(135deg, #00ff87, #60efff, #9d4edd);
            background-clip: text;
            -webkit-background-clip: text;
            font-weight: 700;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 32px;
            margin-bottom: 12px;
            cursor: default;
            padding: 12px 0 !important;
            position: relative;
            justify-content: center;
        }
        
        label:not(:has(input)):not([style*="font-size"])::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, #00ff87, #60efff);
            border-radius: 1px;
            transform: translateX(-50%);
            box-shadow: 0 0 10px rgba(0, 255, 135, 0.5);
        }
        
        label:not(:has(input)):not([style*="font-size"]):hover {
            background: linear-gradient(135deg, #00ff87, #60efff, #9d4edd);
            background-clip: text;
            -webkit-background-clip: text;
            transform: none;
            box-shadow: none;
        }

        /* Premium User Info Panel */
        label[style*="font-size"] {
            background: linear-gradient(145deg, 
                rgba(0, 255, 135, 0.08), 
                rgba(96, 239, 255, 0.06)) !important;
            border: 1px solid rgba(0, 255, 135, 0.2) !important;
            border-radius: 18px !important;
            padding: 20px 24px !important;
            margin: 24px 0 16px 0 !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            color: rgba(255, 255, 255, 0.8) !important;
            cursor: default !important;
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace !important;
            letter-spacing: 0.5px !important;
            box-shadow: 
                0 8px 25px rgba(0, 255, 135, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(15px) !important;
        }
        
        label[style*="font-size"]:hover {
            background: linear-gradient(145deg, 
                rgba(0, 255, 135, 0.12), 
                rgba(96, 239, 255, 0.08)) !important;
            transform: translateY(-2px) !important;
            box-shadow: 
                0 12px 35px rgba(0, 255, 135, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
        }

        /* Header with gradient text */
        .nexus-header {
            text-align: center;
            font-size: 24px;
            font-weight: 800;
            background: linear-gradient(135deg, #00ff87 0%, #60efff 50%, #9d4edd 100%);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            margin-bottom: 24px;
            text-shadow: 0 0 30px rgba(0, 255, 135, 0.3);
            animation: float 6s ease-in-out infinite;
        }
        
        .version-indicator {
            position: absolute;
            top: -12px;
            right: -12px;
            background: linear-gradient(135deg, #00ff87, #60efff);
            color: #000;
            font-size: 11px;
            font-weight: 800;
            padding: 6px 12px;
            border-radius: 12px;
            box-shadow: 
                0 8px 20px rgba(0, 255, 135, 0.4),
                0 0 20px rgba(0, 255, 135, 0.3);
            animation: pulse 3s ease-in-out infinite;
        }
    </style>
    
    <div class="nexus-header">NEXUS CONTROL</div>
`;

watermark.appendChild(dropdownMenu);

// Enhanced version indicator
const versionIndicator = document.createElement('div');
versionIndicator.className = 'version-indicator';
versionIndicator.textContent = ver;
watermark.appendChild(versionIndicator);

let featuresList = [
    { name: 'questionSpoof', type: 'checkbox', variable: 'features.questionSpoof', attributes: 'checked', labeled: true, label: 'Question Spoof' },
    { name: 'videoSpoof', type: 'checkbox', variable: 'features.videoSpoof', attributes: 'checked', labeled: true, label: 'Video Spoof' },
    { name: 'showAnswers', type: 'checkbox', variable: 'features.showAnswers', labeled: true, label: 'Answer Revealer' },
    { name: 'autoAnswer', type: 'checkbox', variable: 'features.autoAnswer', dependent: 'autoAnswerDelay,nextRecomendation,repeatQuestion', labeled: true, label: 'Auto Answer' },
    { name: 'repeatQuestion', className: 'repeatQuestion', type: 'checkbox', variable: 'features.repeatQuestion', attributes: 'style="display:none;"', labeled: true, label: 'Repeat Question' },
    { name: 'nextRecomendation', className: 'nextRecomendation', type: 'checkbox', variable: 'features.nextRecomendation', attributes: 'style="display:none;"', labeled: true, label: 'Recommendations' },
    { name: 'autoAnswerDelay', className: 'autoAnswerDelay', type: 'range', variable: 'features.autoAnswerDelay', attributes: 'style="display:none;" min="1" max="3" value="1"', labeled: false },
    { name: 'minuteFarm', type: 'checkbox', variable: 'features.minuteFarmer', labeled: true, label: 'Minute Farmer' },
    { name: 'customBanner', type: 'checkbox', variable: 'features.customBanner', labeled: true, label: 'Custom Banner' },
    { name: 'rgbLogo', type: 'checkbox', variable: 'features.rgbLogo', labeled: true, label: 'RGB Logo' },
    { name: 'darkMode', type: 'checkbox', variable: 'features.darkMode', attributes: 'checked', labeled: true, label: 'Dark Mode' },
    { name: 'onekoJs', type: 'checkbox', variable: 'features.onekoJs', labeled: true, label: 'Oneko Cat' },
    { name: 'Personalization', type: 'nonInput' },
    { name: 'customName', type: 'text', variable: 'featureConfigs.customUsername', attributes: 'autocomplete="off" placeholder="Enter username..."' },
    { name: 'Profile Picture', type: 'nonInput' },
    { name: 'customPfp', type: 'text', variable: 'featureConfigs.customPfp', attributes: 'autocomplete="off" placeholder="Image URL..."' }
];

featuresList.push({ name: `${user.username} • UID: ${user.UID}`, type: 'nonInput', attributes: 'style="font-size:10px;padding-left:5px;"' });

addFeature(featuresList);

handleInput(['questionSpoof', 'videoSpoof', 'showAnswers', 'nextRecomendation', 'repeatQuestion', 'minuteFarm', 'customBanner', 'rgbLogo']);
handleInput(['customName', 'customPfp']);
handleInput('autoAnswer', checked => checked && !features.questionSpoof && (document.querySelector('[setting-data="features.questionSpoof"]').checked = features.questionSpoof = true));
handleInput('autoAnswerDelay', value => value && (featureConfigs.autoAnswerDelay = 4 - value));
handleInput('darkMode', checked => {
    if (typeof DarkReader !== 'undefined') {
        checked ? (DarkReader.setFetchMethod(window.fetch), DarkReader.enable()) : DarkReader.disable();
    }
});
handleInput('onekoJs', checked => { 
    const onekoEl = document.getElementById('oneko'); 
    if (onekoEl) {
        onekoEl.style.display = checked ? null : "none";
    } 
});

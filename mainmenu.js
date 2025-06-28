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

/* Modern Glassmorphism Watermark */
Object.assign(watermark.style, {
    position: 'fixed',
    top: '20px',
    left: '85%',
    width: '180px',
    height: '50px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    color: 'white',
    fontSize: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    padding: '0 16px',
    zIndex: '1001',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    transform: 'translateZ(0)'
});

if (device.mobile) {
    watermark.style.left = '55%';
    watermark.style.width = '160px';
    watermark.style.height = '45px';
}

watermark.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
        <span style="
            background: linear-gradient(135deg, #00ff88, #00ccff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
            text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
            filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.4));
        ">KW</span>
        <span style="
            color: rgba(255, 255, 255, 0.7);
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
            font-size: 11px;
            font-weight: 500;
            background: rgba(255, 255, 255, 0.1);
            padding: 2px 6px;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        ">${ver}</span>
    </div>
`;

document.body.appendChild(watermark);

let isDragging = false, offsetX, offsetY;

watermark.addEventListener('mousedown', e => { 
    if (!dropdownMenu.contains(e.target)) { 
        isDragging = true; 
        offsetX = e.clientX - watermark.offsetLeft; 
        offsetY = e.clientY - watermark.offsetTop; 
        watermark.style.transform = 'scale(0.95) translateZ(0)';
        watermark.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
    } 
});

watermark.addEventListener('mouseup', () => { 
    isDragging = false; 
    watermark.style.transform = 'scale(1) translateZ(0)';
    watermark.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
});

document.addEventListener('mousemove', e => { 
    if (isDragging) { 
        let newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - watermark.offsetWidth)); 
        let newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - watermark.offsetHeight)); 
        Object.assign(watermark.style, { left: `${newX}px`, top: `${newY}px` }); 
        dropdownMenu.style.display = 'none'; 
    } 
});

/* Modern Glassmorphism Dropdown */
Object.assign(dropdownMenu.style, {
    position: 'absolute',
    top: '100%',
    left: '0',
    width: '320px',
    maxHeight: '70vh',
    overflowY: 'auto',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '20px',
    color: 'white',
    fontSize: '14px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'none',
    flexDirection: 'column',
    zIndex: '1000',
    padding: '16px',
    cursor: 'default',
    userSelect: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    marginTop: '8px'
});

dropdownMenu.innerHTML = `
    <style>
        /* Custom Scrollbar */
        *::-webkit-scrollbar {
            width: 6px;
        }
        *::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
        }
        *::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #00ff88, #00ccff);
            border-radius: 3px;
        }
        *::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #00ccff, #0088ff);
        }

        /* Modern Checkbox */
        input[type="checkbox"] {
            appearance: none;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            margin-right: 12px;
            cursor: pointer;
            position: relative;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            flex-shrink: 0;
        }
        
        input[type="checkbox"]:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(0, 255, 136, 0.5);
            transform: scale(1.05);
        }
        
        input[type="checkbox"]:checked {
            background: linear-gradient(135deg, #00ff88, #00ccff);
            border-color: #00ff88;
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
        }
        
        input[type="checkbox"]:checked::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-weight: bold;
            font-size: 12px;
        }

        /* Modern Text Inputs */
        input[type="text"], input[type="number"] {
            width: 100%;
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: white;
            background: rgba(255, 255, 255, 0.1);
            padding: 12px 16px;
            border-radius: 12px;
            font-family: inherit;
            font-size: 14px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            margin-top: 8px;
        }
        
        input[type="text"]:focus, input[type="number"]:focus {
            outline: none;
            border-color: #00ff88;
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        input[type="text"]::placeholder, input[type="number"]::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }

        /* Modern Range Slider */
        input[type="range"] {
            width: 100%;
            height: 6px;
            border-radius: 3px;
            background: rgba(255, 255, 255, 0.2);
            outline: none;
            margin: 12px 0;
            cursor: pointer;
            appearance: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00ff88, #00ccff);
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 255, 136, 0.4);
            transition: all 0.3s ease;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 6px 20px rgba(0, 255, 136, 0.6);
        }

        /* Modern Labels */
        label {
            display: flex;
            align-items: center;
            color: rgba(255, 255, 255, 0.9);
            padding: 12px 0;
            font-weight: 500;
            transition: all 0.2s ease;
            cursor: pointer;
            border-radius: 8px;
            margin: 2px 0;
        }
        
        label:hover {
            background: rgba(255, 255, 255, 0.05);
            padding-left: 8px;
            padding-right: 8px;
        }

        /* Section Headers */
        label:has(~ input[type="text"]), label:has(~ input[type="number"]) {
            color: rgba(0, 255, 136, 0.9);
            font-weight: 600;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 16px;
            margin-bottom: 4px;
            cursor: default;
        }
        
        label:has(~ input[type="text"]):hover, label:has(~ input[type="number"]):hover {
            background: none;
            padding-left: 0;
            padding-right: 0;
        }

        /* User Info */
        label[style*="font-size:10px"] {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 10px;
            padding: 8px 12px;
            margin: 12px 0 8px 0;
            font-size: 11px !important;
            color: rgba(255, 255, 255, 0.8);
            cursor: default;
        }
        
        label[style*="font-size:10px"]:hover {
            background: rgba(255, 255, 255, 0.15);
        }
    </style>
`;

watermark.appendChild(dropdownMenu);

let featuresList = [
    { name: 'questionSpoof', type: 'checkbox', variable: 'features.questionSpoof', attributes: 'checked', labeled: true, label: 'Question Spoof' },
    { name: 'videoSpoof', type: 'checkbox', variable: 'features.videoSpoof', attributes: 'checked', labeled: true, label: 'Video Spoof' },
    { name: 'showAnswers', type: 'checkbox', variable: 'features.showAnswers', labeled: true, label: 'Answer Revealer' },
    { name: 'autoAnswer', type: 'checkbox', variable: 'features.autoAnswer', dependent: 'autoAnswerDelay,nextRecomendation,repeatQuestion', labeled: true, label: 'Auto Answer' },
    { name: 'repeatQuestion', className: 'repeatQuestion', type: 'checkbox', variable: 'features.repeatQuestion', attributes: 'style="display:none;"', labeled: true, label: 'Repeat Question' },
    { name: 'nextRecomendation', className: 'nextRecomendation', type: 'checkbox', variable: 'features.nextRecomendation', attributes: 'style="display:none;"', labeled: true, label: 'Recomendations' },
    { name: 'autoAnswerDelay', className: 'autoAnswerDelay', type: 'range', variable: 'features.autoAnswerDelay', attributes: 'style="display:none;" min="1" max="3" value="1"', labeled: false },
    { name: 'minuteFarm', type: 'checkbox', variable: 'features.minuteFarmer', labeled: true, label: 'Minute Farmer' },
    { name: 'customBanner', type: 'checkbox', variable: 'features.customBanner', labeled: true, label: 'Custom Banner' },
    { name: 'rgbLogo', type: 'checkbox', variable: 'features.rgbLogo', labeled: true, label: 'RGB Logo' },
    { name: 'darkMode', type: 'checkbox', variable: 'features.darkMode', attributes: 'checked', labeled: true, label: 'Dark Mode' },
    { name: 'onekoJs', type: 'checkbox', variable: 'features.onekoJs', labeled: true, label: 'onekoJs' },
    { name: 'Custom Username', type: 'nonInput' },
    { name: 'customName', type: 'text', variable: 'featureConfigs.customUsername', attributes: 'autocomplete="off" placeholder="Enter custom username..."' },
    { name: 'Custom Profile Picture', type: 'nonInput' },
    { name: 'customPfp', type: 'text', variable: 'featureConfigs.customPfp', attributes: 'autocomplete="off" placeholder="Enter image URL..."' }
];

featuresList.push({ name: `${user.username} - UID: ${user.UID}`, type: 'nonInput', attributes: 'style="font-size:10px;padding-left:5px;"' });

addFeature(featuresList);

handleInput(['questionSpoof', 'videoSpoof', 'showAnswers', 'nextRecomendation', 'repeatQuestion', 'minuteFarm', 'customBanner', 'rgbLogo']);
handleInput(['customName', 'customPfp'])
handleInput('autoAnswer', checked => checked && !features.questionSpoof && (document.querySelector('[setting-data="features.questionSpoof"]').checked = features.questionSpoof = true));
handleInput('autoAnswerDelay', value => value && (featureConfigs.autoAnswerDelay = 4 - value));
handleInput('darkMode', checked => checked ? (DarkReader.setFetchMethod(window.fetch), DarkReader.enable()) : DarkReader.disable());
handleInput('onekoJs', checked => { onekoEl = document.getElementById('oneko'); if (onekoEl) {onekoEl.style.display = checked ? null : "none"} });

// Enhanced hover effects with smooth animations
watermark.addEventListener('mouseenter', () => { 
    dropdownMenu.style.display = 'flex'; 
    dropdownMenu.style.opacity = '0';
    dropdownMenu.style.transform = 'translateY(-10px)';
    requestAnimationFrame(() => {
        dropdownMenu.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        dropdownMenu.style.opacity = '1';
        dropdownMenu.style.transform = 'translateY(0)';
    });
    watermark.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))';
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav'); 
});

watermark.addEventListener('mouseleave', e => { 
    if (!watermark.contains(e.relatedTarget)) {
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            dropdownMenu.style.display = 'none';
        }, 300);
        watermark.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))';
        playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav'); 
    }
});

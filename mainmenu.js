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

/* Ultra VIP Watermark - Level: Apple Pro Max */
Object.assign(watermark.style, {
    position: 'fixed',
    top: '25px',
    left: '85%',
    width: '50px',
    height: '50px',
    background: '#000000',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    zIndex: '1001',
    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(20px)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
});

if (device.mobile) {
    watermark.style.left = '70%';
    watermark.style.width = '45px';
    watermark.style.height = '45px';
}

watermark.innerHTML = `
    <div style="
        font-size: 18px; 
        font-weight: 700; 
        background: linear-gradient(135deg, #00ff87, #60efff); 
        -webkit-background-clip: text; 
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 8px rgba(0,255,135,0.3));
    ">KW</div>
`;

document.body.appendChild(watermark);

let isDragging = false, offsetX, offsetY;

watermark.addEventListener('mousedown', e => {
    if (!dropdownMenu.contains(e.target)) {
        isDragging = true;
        offsetX = e.clientX - watermark.offsetLeft;
        offsetY = e.clientY - watermark.offsetTop;
        watermark.style.transform = 'scale(0.9)';
    }
});

watermark.addEventListener('mouseup', () => {
    isDragging = false;
    watermark.style.transform = 'scale(1)';
});

document.addEventListener('mousemove', e => {
    if (isDragging) {
        let newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - watermark.offsetWidth));
        let newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - watermark.offsetHeight));
        Object.assign(watermark.style, { left: `${newX}px`, top: `${newY}px` });
        dropdownMenu.style.display = 'none';
    }
});

/* Ultra Premium Dropdown - Level: Tesla UI */
Object.assign(dropdownMenu.style, {
    position: 'absolute',
    top: '60px',
    left: '-220px',
    width: '270px',
    maxHeight: '500px',
    overflowY: 'auto',
    background: 'rgba(18, 18, 18, 0.95)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    borderRadius: '20px',
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    fontWeight: '400',
    display: 'none',
    flexDirection: 'column',
    zIndex: '1000',
    padding: '20px',
    cursor: 'default',
    userSelect: 'none',
    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
    boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)'
});

dropdownMenu.innerHTML = `
    <style>
        /* Custom Scrollbar - Ultra Minimalist */
        *::-webkit-scrollbar { width: 4px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { 
            background: rgba(255,255,255,0.2); 
            border-radius: 2px; 
            transition: background 0.3s ease;
        }
        *::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }

        /* Ultra Premium Toggle Switch */
        input[type="checkbox"] {
            appearance: none;
            width: 44px;
            height: 24px;
            background: rgba(255,255,255,0.1);
            border-radius: 12px;
            margin-right: 12px;
            cursor: pointer;
            position: relative;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            border: 1px solid rgba(255,255,255,0.08);
        }
        
        input[type="checkbox"]::before {
            content: '';
            position: absolute;
            top: 1px;
            left: 1px;
            width: 20px;
            height: 20px;
            background: #ffffff;
            border-radius: 50%;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        input[type="checkbox"]:checked {
            background: linear-gradient(135deg, #00ff87, #60efff);
            border-color: #00ff87;
            box-shadow: 0 0 20px rgba(0,255,135,0.3);
        }
        
        input[type="checkbox"]:checked::before {
            transform: translateX(20px);
        }

        /* Ultra Clean Text Inputs */
        input[type="text"], input[type="number"] {
            width: 100%;
            border: none;
            color: #ffffff;
            background: rgba(255,255,255,0.06);
            padding: 14px 16px;
            border-radius: 12px;
            font-family: inherit;
            font-size: 14px;
            font-weight: 400;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            margin-top: 8px;
            border: 1px solid rgba(255,255,255,0.05);
        }
        
        input[type="text"]:focus, input[type="number"]:focus {
            outline: none;
            background: rgba(255,255,255,0.1);
            border-color: rgba(0,255,135,0.5);
            box-shadow: 0 0 0 4px rgba(0,255,135,0.1);
        }
        
        input[type="text"]::placeholder {
            color: rgba(255,255,255,0.4);
            font-weight: 300;
        }

        /* Premium Range Slider */
        input[type="range"] {
            width: 100%;
            height: 6px;
            border-radius: 3px;
            background: rgba(255,255,255,0.1);
            outline: none;
            margin: 15px 0;
            cursor: pointer;
            appearance: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00ff87, #60efff);
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,255,135,0.3);
            transition: all 0.3s ease;
            border: 2px solid #ffffff;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0,255,135,0.5);
        }

        /* Ultra Clean Labels */
        label {
            display: flex;
            align-items: center;
            color: rgba(255,255,255,0.9);
            padding: 12px 0;
            font-weight: 400;
            transition: all 0.2s ease;
            cursor: pointer;
            border-radius: 10px;
            margin: 2px 0;
            font-size: 14px;
        }
        
        label:hover {
            background: rgba(255,255,255,0.03);
            padding-left: 8px;
            padding-right: 8px;
        }

        /* Elegant Section Dividers */
        label:not(:has(input)):not([style*="font-size:10px"]) {
            color: rgba(0,255,135,0.9);
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 25px;
            margin-bottom: 8px;
            cursor: default;
            padding: 8px 0 !important;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            background: none !important;
        }
        
        label:not(:has(input)):not([style*="font-size:10px"]):hover {
            background: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
        }

        /* Premium User Info Card */
        label[style*="font-size:10px"] {
            background: rgba(255,255,255,0.05) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            border-radius: 12px !important;
            padding: 12px 16px !important;
            margin: 20px 0 10px 0 !important;
            font-size: 12px !important;
            font-weight: 500 !important;
            color: rgba(255,255,255,0.7) !important;
            cursor: default !important;
            font-family: 'SF Mono', Monaco, monospace !important;
        }
        
        label[style*="font-size:10px"]:hover {
            background: rgba(255,255,255,0.08) !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
        }

        /* Version Badge in Header */
        .version-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background: linear-gradient(135deg, #00ff87, #60efff);
            color: #000;
            font-size: 10px;
            font-weight: 700;
            padding: 4px 8px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,255,135,0.3);
        }
    </style>
`;

watermark.appendChild(dropdownMenu);

// Add version badge to watermark
const versionBadge = document.createElement('div');
versionBadge.className = 'version-badge';
versionBadge.textContent = ver;
watermark.appendChild(versionBadge);

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
handleInput(['customName', 'customPfp'])
handleInput('autoAnswer', checked => checked && !features.questionSpoof && (document.querySelector('[setting-data="features.questionSpoof"]').checked = features.questionSpoof = true));
handleInput('autoAnswerDelay', value => value && (featureConfigs.autoAnswerDelay = 4 - value));
handleInput('darkMode', checked => checked ? (DarkReader.setFetchMethod(window.fetch), DarkReader.enable()) : DarkReader.disable());
handleInput('onekoJs', checked => { onekoEl = document.getElementById('oneko'); if (onekoEl) {onekoEl.style.display = checked ? null : "none"} });

// Ultra smooth hover animations
watermark.addEventListener('mouseenter', () => {
    watermark.style.transform = 'scale(1.05)';
    watermark.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4), 0 0 30px rgba(0,255,135,0.2)';
    
    setTimeout(() => {
        dropdownMenu.style.display = 'flex';
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.transform = 'translateY(-20px) scale(0.95)';
        
        requestAnimationFrame(() => {
            dropdownMenu.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.transform = 'translateY(0) scale(1)';
        });
    }, 100);
    
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav');
});

watermark.addEventListener('mouseleave', e => {
    if (!watermark.contains(e.relatedTarget)) {
        watermark.style.transform = 'scale(1)';
        watermark.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
        
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.transform = 'translateY(-20px) scale(0.95)';
        
        setTimeout(() => {
            dropdownMenu.style.display = 'none';
        }, 400);
        
        playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav');
    }
});

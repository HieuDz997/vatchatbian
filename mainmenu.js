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

/* Watermark VIP Style */
Object.assign(watermark.style, {
    position: 'fixed', 
    top: '20px', 
    left: '85%', 
    width: '160px', 
    height: '45px', 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white', 
    fontSize: '15px', 
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '600',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    cursor: 'pointer', 
    userSelect: 'none', 
    padding: '0 15px',  
    borderRadius: '12px', 
    zIndex: '1001', 
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    border: '1px solid rgba(255,255,255,0.2)'
});

if (device.mobile) watermark.style.left = '55%'

watermark.innerHTML = `<div style="display: flex; align-items: center; gap: 8px;"><span style="background: linear-gradient(45deg, #00ff88, #00d4ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700;">KW</span> <span style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 6px; font-size: 11px;">${ver}</span></div>`;

document.body.appendChild(watermark);

let isDragging = false, offsetX, offsetY;

watermark.addEventListener('mousedown', e => { 
    if (!dropdownMenu.contains(e.target)) { 
        isDragging = true; 
        offsetX = e.clientX - watermark.offsetLeft; 
        offsetY = e.clientY - watermark.offsetTop; 
        watermark.style.transform = 'scale(0.95)'; 
        watermark.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    } 
});

watermark.addEventListener('mouseup', () => { 
    isDragging = false; 
    watermark.style.transform = 'scale(1)'; 
    watermark.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
});

document.addEventListener('mousemove', e => { 
    if (isDragging) { 
        let newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - watermark.offsetWidth)); 
        let newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - watermark.offsetHeight)); 
        Object.assign(watermark.style, { left: `${newX}px`, top: `${newY}px` }); 
        dropdownMenu.style.display = 'none'; 
    } 
});

/* Dropdown VIP Style */
Object.assign(dropdownMenu.style, {
    position: 'absolute',
    top: '100%',
    left: '0',
    width: '280px',
    maxHeight: '400px',
    overflowY: 'auto',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    borderRadius: '15px',
    color: 'white',
    fontSize: '14px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    display: 'none',
    flexDirection: 'column',
    zIndex: '1000',
    padding: '20px',
    cursor: 'default',
    userSelect: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
    marginTop: '10px'
});

dropdownMenu.innerHTML = `
    <style>
        *::-webkit-scrollbar { width: 6px; }
        *::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); border-radius: 3px; }
        *::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 3px; }

        input[type="checkbox"] {
            appearance: none;
            width: 18px;
            height: 18px;
            background: rgba(255,255,255,0.1);
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 4px;
            margin-right: 12px;
            cursor: pointer;
            position: relative;
            transition: all 0.2s ease;
        }
        
        input[type="checkbox"]:hover {
            background: rgba(255,255,255,0.15);
            border-color: #667eea;
        }
        
        input[type="checkbox"]:checked {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-color: #667eea;
        }
        
        input[type="checkbox"]:checked::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-weight: bold;
            font-size: 11px;
        }

        input[type="text"], input[type="number"] {
            width: 100%;
            border: 2px solid rgba(255,255,255,0.2);
            color: white;
            background: rgba(255,255,255,0.1);
            padding: 10px 12px;
            border-radius: 8px;
            font-family: inherit;
            font-size: 13px;
            transition: all 0.2s ease;
            margin-top: 5px;
        }
        
        input[type="text"]:focus, input[type="number"]:focus {
            outline: none;
            border-color: #667eea;
            background: rgba(255,255,255,0.15);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }
        
        input[type="text"]::placeholder {
            color: rgba(255,255,255,0.5);
        }

        input[type="range"] {
            width: 100%;
            height: 4px;
            border-radius: 2px;
            background: rgba(255,255,255,0.2);
            outline: none;
            margin: 10px 0;
            cursor: pointer;
            appearance: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }

        label {
            display: flex;
            align-items: center;
            color: rgba(255,255,255,0.9);
            padding: 8px 0;
            font-weight: 500;
            transition: all 0.2s ease;
            cursor: pointer;
            border-radius: 6px;
            margin: 1px 0;
        }
        
        label:hover {
            background: rgba(255,255,255,0.05);
            padding-left: 6px;
            padding-right: 6px;
        }

        /* Section Headers */
        label:not(:has(input)) {
            color: #ffffff;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 15px;
            margin-bottom: 5px;
            cursor: default;
            background: rgba(255,255,255,0.1) !important;
            padding: 6px 10px !important;
            border-radius: 6px;
        }

        /* User Info */
        label[style*="font-size:10px"] {
            background: rgba(255,255,255,0.1) !important;
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 8px !important;
            padding: 8px 10px !important;
            margin: 10px 0 !important;
            font-size: 11px !important;
            color: rgba(255,255,255,0.8) !important;
            cursor: default !important;
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
    { name: 'customName', type: 'text', variable: 'featureConfigs.customUsername', attributes: 'autocomplete="off"' },
    { name: 'Custom pfp', type: 'nonInput' },
    { name: 'customPfp', type: 'text', variable: 'featureConfigs.customPfp', attributes: 'autocomplete="off"' }
];

featuresList.push({ name: `${user.username} - UID: ${user.UID}`, type: 'nonInput', attributes: 'style="font-size:10px;"padding-left:5px;' });

addFeature(featuresList);

handleInput(['questionSpoof', 'videoSpoof', 'showAnswers', 'nextRecomendation', 'repeatQuestion', 'minuteFarm', 'customBanner', 'rgbLogo']);
handleInput(['customName', 'customPfp'])
handleInput('autoAnswer', checked => checked && !features.questionSpoof && (document.querySelector('[setting-data="features.questionSpoof"]').checked = features.questionSpoof = true));
handleInput('autoAnswerDelay', value => value && (featureConfigs.autoAnswerDelay = 4 - value));
handleInput('darkMode', checked => checked ? (DarkReader.setFetchMethod(window.fetch), DarkReader.enable()) : DarkReader.disable());
handleInput('onekoJs', checked => { onekoEl = document.getElementById('oneko'); if (onekoEl) {onekoEl.style.display = checked ? null : "none"} });

watermark.addEventListener('mouseenter', () => { 
    dropdownMenu.style.display = 'flex'; 
    watermark.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
    watermark.style.transform = 'translateY(-2px)';
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav'); 
});

watermark.addEventListener('mouseleave', e => { 
    if (!watermark.contains(e.relatedTarget)) {
        dropdownMenu.style.display = 'none';
        watermark.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        watermark.style.transform = 'translateY(0)';
        playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav'); 
    }
});

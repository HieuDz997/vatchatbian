const setFeatureByPath = (path, value) => {
  let obj = window;
  const parts = path.split('.');
  while (parts.length > 1) obj = obj[parts.shift()];
  obj[parts[0]] = value;
};

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

/* Watermark */
Object.assign(watermark.style, {
  position: 'fixed', top: '10px', left: '85%', width: '150px', height: '40px',
  background: 'linear-gradient(135deg, #1e40af, #facc15)', color: 'white',
  fontSize: '16px', fontFamily: 'Inter, sans-serif', display: 'flex',
  justifyContent: 'space-between', alignItems: 'center', cursor: 'default',
  userSelect: 'none', padding: '0 10px', borderRadius: '8px', zIndex: '1001',
  transition: 'transform 0.3s ease', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
});

if (device.mobile) watermark.style.left = '55%';

watermark.innerHTML = `<span style="font-weight: 700;">KavHack</span> <span style="color: #f1f1f1; padding-left: 2px; font-size: 12px;">${ver}</span>`;

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

/* Dropdown */
Object.assign(dropdownMenu.style, {
  position: 'absolute', top: '100%', left: '0', width: '200px',
  background: 'linear-gradient(135deg, #1e40af, #facc15)', borderRadius: '8px',
  color: 'white', fontSize: '14px', fontFamily: 'Inter, sans-serif',
  display: 'none', flexDirection: 'column', zIndex: '1000', padding: '10px',
  cursor: 'default', userSelect: 'none', transition: 'transform 0.3s ease',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
});

dropdownMenu.innerHTML = `
  <style>
    input[type="checkbox"] { appearance: none; width: 16px; height: 16px; background-color: #ffffff;
      border: 2px solid #1e40af; border-radius: 4px; margin-right: 8px; cursor: pointer; }
    input[type="checkbox"]:checked { background-color: #1e40af; border-color: #facc15; }
    input[type="text"], input[type="number"], input[type="range"] { width: calc(100% - 10px); border: 2px solid #1e40af;
      color: white; accent-color: #facc15; background-color: rgba(255,255,255,0.1); padding: 5px; border-radius: 4px; }
    label { display: flex; align-items: center; color: white; padding-top: 5px; font-size: 14px; }
  </style>
`;

watermark.appendChild(dropdownMenu);

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
  { name: 'Custom Username', type: 'nonInput' },
  { name: 'customName', type: 'text', variable: 'featureConfigs.customUsername', attributes: 'autocomplete="off"' },
  { name: 'Custom Pfp', type: 'nonInput' },
  { name: 'customPfp', type: 'text', variable: 'featureConfigs.customPfp', attributes: 'autocomplete="off"' }
];

featuresList.push({ name: `${user.username} - UID: ${user.UID}`, type: 'nonInput', attributes: 'style="font-size:12px;padding-left:5px;"' });

addFeature(featuresList);

handleInput(['questionSpoof', 'videoSpoof', 'showAnswers', 'nextRecomendation', 'repeatQuestion', 'minuteFarm', 'customBanner', 'rgbLogo']);
handleInput(['customName', 'customPfp']);
handleInput('autoAnswer', checked => checked && !features.questionSpoof && (document.querySelector('[setting-data="features.questionSpoof"]').checked = features.questionSpoof = true));
handleInput('autoAnswerDelay', value => value && (featureConfigs.autoAnswerDelay = 4 - value));
handleInput('darkMode', checked => {
  if (window.DarkReader) {
    DarkReader.setFetchMethod(window.fetch);
    checked ? DarkReader.enable() : DarkReader.disable();
  }
});

watermark.addEventListener('mouseenter', () => { dropdownMenu.style.display = 'flex'; });
watermark.addEventListener('mouseleave', e => { !watermark.contains(e.relatedTarget) && (dropdownMenu.style.display = 'none'); });

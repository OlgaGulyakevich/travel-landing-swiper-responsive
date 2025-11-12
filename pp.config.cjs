const os = require('os');
const fs = require('fs');
const path = require('path');

const desktopSections = [
  {section: 'header', misMatchThreshold: 1.1},
  {section: 'hero', misMatchThreshold: 0.4},
  {section: 'tours', misMatchThreshold: 0.7},
  {section: 'training', misMatchThreshold: 2.1},
  {section: 'about', misMatchThreshold: 1.5},
  {section: 'reviews', misMatchThreshold: 2.4},
  {section: 'adv', misMatchThreshold: 1.2},
  {section: 'gallery', misMatchThreshold: 0.4},
  {section: 'form', misMatchThreshold: 0.6},
  {section: 'footer', misMatchThreshold: 1.2}
]

const tabletSections = [
  {section: 'header', misMatchThreshold: 1.3},
  {section: 'hero', misMatchThreshold: 0.8},
  {section: 'tours', misMatchThreshold: 1.1},
  {section: 'training', misMatchThreshold: 3.5},
  {section: 'about', misMatchThreshold: 3.5},
  {section: 'reviews', misMatchThreshold: 2.5},
  {section: 'adv', misMatchThreshold: 0.8},
  {section: 'gallery', misMatchThreshold: 0.7},
  {section: 'form', misMatchThreshold: 1.2},
  {section: 'footer', misMatchThreshold: 1.1},
]

const mobileSections = [
  {section: 'header', misMatchThreshold: 2.2},
  {section: 'hero', misMatchThreshold: 1.2},
  {section: 'tours', misMatchThreshold: 2.2},
  {section: 'training', misMatchThreshold: 4.3},
  {section: 'about', misMatchThreshold: 3.5},
  {section: 'reviews', misMatchThreshold: 2.6},
  {section: 'adv', misMatchThreshold: 1.2},
  {section: 'gallery', misMatchThreshold: 0.7},
  {section: 'form', misMatchThreshold: 1.1},
  {section: 'footer', misMatchThreshold: 1.1},
]

const VIEWPORTS = {
  'desktop': {"label": "desktop", "width": 1440, "height": 800},
  'tablet': {"label": "tablet", "width": 768, "height": 1024},
  'mobile': {"label": "mobile", "width": 320, "height": 480}
};

const URL = 'http://localhost:3000/index.html';
const REFERENCE_URL = './figma/index.html';

function generateScenario(section, misMatchThreshold, viewport) {
  return {
    "label": `${section}`,
    "url": URL,
    "referenceUrl": REFERENCE_URL,
    selectors: [`[data-test="${section}"]`],
    misMatchThreshold: misMatchThreshold || 5,
    requireSameDimensions: true,
    delay: 500,
    ...viewport ? {"viewports": [VIEWPORTS[viewport]]} : {}
  };
}

/**
 * Определяет путь к Chrome в зависимости от операционной системы.
 * Проверяет переменную окружения PUPPETEER_EXECUTABLE_PATH,
 * затем стандартные пути для macOS, Linux и Windows.
 * @returns {string|undefined} Путь к Chrome или undefined, если не найден
 */
function getChromePath() {
  // Проверяем переменную окружения (приоритет)
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const platform = os.platform();

  if (platform === 'darwin') {
    // macOS
    const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    if (fs.existsSync(chromePath)) {
      return chromePath;
    }
  } else if (platform === 'linux') {
    // Linux - проверяем стандартные пути
    const possiblePaths = [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/snap/bin/chromium'
    ];
    for (const chromePath of possiblePaths) {
      if (fs.existsSync(chromePath)) {
        return chromePath;
      }
    }
  } else if (platform === 'win32') {
    // Windows
    const possiblePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
      path.join(process.env.PROGRAMFILES || '', 'Google\\Chrome\\Application\\chrome.exe')
    ];
    for (const chromePath of possiblePaths) {
      if (fs.existsSync(chromePath)) {
        return chromePath;
      }
    }
  }

  // Если ничего не найдено, вернем undefined - Puppeteer попробует найти сам
  return undefined;
}

module.exports = {
  "id": "tours test-pp",
  "onReadyScript": "onReady.cjs",
  "onBeforeScript": "onBefore.cjs",
  "viewports": [
    {
      "label": "mobile",
      "width": 320,
      "height": 480,
    },
    {
      "label": "tablet",
      "width": 768,
      "height": 1024,
    },
    {
      "label": "desktop",
      "width": 1440,
      "height": 800,
    }
  ],
  "resembleOutputOptions": {
    "ignoreAntialiasing": true,
    "errorType": "movementDifferenceIntensity",
    "transparency": 0.3,
    scaleToSameSize: false
  },
  "scenarios": [
    ...desktopSections.map(({section, misMatchThreshold}) => generateScenario(section, misMatchThreshold, 'desktop')),
    ...tabletSections.map(({section, misMatchThreshold}) => generateScenario(section, misMatchThreshold, 'tablet')),
    ...mobileSections.map(({section, misMatchThreshold}) => generateScenario(section, misMatchThreshold, 'mobile')),
  ],
  fileNameTemplate: '{scenarioLabel}_{viewportLabel}',
  "paths": {
    "bitmaps_reference": "bitmaps_reference/test-pp",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "engine_scripts",
    "html_report": "backstop_data/html_report",
    "json_report": "backstop_data/json_report",
  },
  "report": ["browser", "json"],
  "engine": "puppeteer",
  "engineOptions": (() => {
    const options = {
      "args": ["--no-sandbox"],
      "gotoParameters": {"waitUntil": ["load", "networkidle0"], timeout: 30000},
    };

    const chromePath = getChromePath();
    if (chromePath) {
      options.executablePath = chromePath;
    }

    return options;
  })(),
  "asyncCaptureLimit": 10,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}

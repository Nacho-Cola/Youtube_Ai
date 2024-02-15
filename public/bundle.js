/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./transcript.js":
/*!***********************!*\
  !*** ./transcript.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLangTranscript: () => (/* binding */ getLangTranscript),
/* harmony export */   getRawTranscript: () => (/* binding */ getRawTranscript),
/* harmony export */   getTranscript: () => (/* binding */ getTranscript),
/* harmony export */   getVideoFormat: () => (/* binding */ getVideoFormat)
/* harmony export */ });

async function getVideoFormat() {
  try {
    const url = window.location.href;
    const videoPageResponse = await fetch(url);
    const videoPageHtml = await videoPageResponse.text();
    const splittedHtml = videoPageHtml.split('"microformat":');

    if (splittedHtml.length < 2) {
      return; // No Caption Available
    }

    const videoFormat_json = JSON.parse(splittedHtml[1].split(',"cards"')[0].replace('\n', ''))
    console.log(videoFormat_json)
    const titleName = videoFormat_json.playerMicroformatRenderer.title.simpleText;
    const thumbnail = videoFormat_json.playerMicroformatRenderer.thumbnail.thumbnails[0].url;

    return {
      title : titleName,
      thumbnail_url : thumbnail
    }


  } catch (error) {
    console.error(error);
    return;
  }
}



async function getLangTranscript() {
  try {
    const url = window.location.href;
    const videoPageResponse = await fetch(url);
    const videoPageHtml = await videoPageResponse.text();
    const splittedHtml = videoPageHtml.split('"captions":');

    if (splittedHtml.length < 2) {
      return; // No Caption Available
    }

    const captions_json = JSON.parse(splittedHtml[1].split(',"videoDetails')[0].replace('\n', ''));
    console.log(videoPageHtml)
    const captionTracks = captions_json.playerCaptionsTracklistRenderer.captionTracks;
    const languageOptions = Array.from(captionTracks).map(i => i.name.simpleText);

    const first = "Korean"; 
    languageOptions.sort((x, y) => x.includes(first) ? -1 : y.includes(first) ? 1 : 0);
    languageOptions.sort((x, y) => x === first ? -1 : y === first ? 1 : 0);

    return Array.from(languageOptions).map((langName, index) => {
      const link = captionTracks.find(i => i.name.simpleText === langName).baseUrl;
      return {
        language: langName,
        link: link
      };
    });
  } catch (error) {
    console.error(error);
    return;
  }
}

async function getTranscript(langOption) {
  try {
    const rawTranscript = await getRawTranscript(langOption.link);
    const transcript = rawTranscript.map(item => item.text).join(' ');
    return transcript;
  } catch (error) {
    console.error(error);
    return;
  }
}

async function getRawTranscript(link) {
  try {
    const transcriptPageResponse = await fetch(link);
    const transcriptPageText = await transcriptPageResponse.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(transcriptPageText, "text/xml");
    const textNodes = doc.getElementsByTagName("text");

    return Array.from(textNodes).map(i => ({
      start: i.getAttribute("start"),
      duration: i.getAttribute("dur"),
      text: i.textContent
    }));
  } catch (error) {
    console.error(error);
    return;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./inject.js ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transcript_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transcript.js */ "./transcript.js");




function addElement (container) {
  var hi_button = document.createElement('div');
  hi_button.setAttribute("id", "yt-summery-side-bar");
  hi_button.style.backgroundColor = 'white';
  hi_button.style.height = '50px'
  hi_button.innerHTML = '<b>Youtube AI</b>';
  container.prepend(hi_button);
}

async function run_script() {

  const observer = new MutationObserver((mutationsList, observer) => {
    for(let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        let container = document.getElementById("secondary-inner");
        if (container) {
          addElement(container);
          observer.disconnect();
          break;
        }
      }
    }
  });

  const sideBar = document.getElementById('yt-summery-side-bar');
  if(!sideBar){
    observer.observe(document.body, { childList: true, subtree: true });
  }
  

  const langOption = await (0,_transcript_js__WEBPACK_IMPORTED_MODULE_0__.getLangTranscript)();
  const transcript = await (0,_transcript_js__WEBPACK_IMPORTED_MODULE_0__.getTranscript)(langOption[0]);
  const videoFormat = await (0,_transcript_js__WEBPACK_IMPORTED_MODULE_0__.getVideoFormat)()
  console.log(videoFormat);
  console.log(transcript);
}


let previousUrl = '';
const observer_url = new MutationObserver(function(mutations) {
  if (location.href !== previousUrl) {
      previousUrl = location.href;
      run_script();
    }
});
const config = {subtree: true, childList: true};
observer_url.observe(document, config);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
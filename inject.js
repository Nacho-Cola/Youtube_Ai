

import {getLangTranscript, getTranscript, getRawTranscript} from "./transcript.js"

const observer = new MutationObserver((mutationsList, observer) => {
  for(let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      let container = document.getElementById("secondary-inner");
      if (container) {
        addElement(container);
        observer.disconnect();
        return;
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });


const langOption = await getLangTranscript();
const transcript = await getRawTranscript(langOption[0].link)
console.log(transcript)


function addElement (container) {
  var hi_button = document.createElement('div');
  hi_button.style.backgroundColor = 'white';
  hi_button.style.height = '50px'
  hi_button.innerHTML = '<b>Youtube AI</b>';
  container.prepend(hi_button);
}

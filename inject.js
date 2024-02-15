

import {getLangTranscript, getTranscript, getVideoFormat } from "./transcript.js"

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
  

  const langOption = await getLangTranscript();
  const transcript = await getTranscript(langOption[0]);
  const videoFormat = await getVideoFormat()
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
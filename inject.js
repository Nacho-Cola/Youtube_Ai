

// setInterval(()=>{

// let imgs = document.querySelectorAll('img');
// imgs.forEach((a,i)=>{
//   a.src = 'https://lh3.googleusercontent.com/proxy/a5L0o0spfVJWmrrn13av-FPd53ZfSyUQ3F3Yh_jXWWGnXqT7KLnt6hqX4wx0JzPMqYOXxsqtwKK-3LQua6hrlAGLD9OA_v3Gtm6Lx9qdN8w09qQiHa-iA-hGY598t8zAeiyohueop7Z_d9k-xMvEuG7TN591woiBQ-3YHmoRrcneurQbk7m_T8I'
// })
// }, 500)

import {getTranscript} from "./transcript.js"

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

observer.observe(document.body, { childList: true, subtree: true });
getTranscript();


function addElement (container) {
  var hi_button = document.createElement('div');
  hi_button.style.backgroundColor = 'white';
  hi_button.style.height = '50px'
  hi_button.innerHTML = '<b>Youtube AI</b>';
  container.prepend(hi_button);
}

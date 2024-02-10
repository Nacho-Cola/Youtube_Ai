export async function getTranscript() {
  var url = window.location.href;
  var videoPageResponese = await fetch(url);
  var videoPageHtml =  await videoPageResponese.text()
  const splittedHtml = videoPageHtml.split('"captions":')

  if (splittedHtml.length < 2) { return; } // No Caption Available

  alert(splittedHtml)

} 


export async function getLangTranscript() {
  try {
    const url = window.location.href;
    const videoPageResponse = await fetch(url);
    const videoPageHtml = await videoPageResponse.text();
    const splittedHtml = videoPageHtml.split('"captions":');

    if (splittedHtml.length < 2) {
      return; // No Caption Available
    }

    const captions_json = JSON.parse(splittedHtml[1].split(',"videoDetails')[0].replace('\n', ''));
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
    console.error("getLangTranscript error");
    return;
  }
}

export async function getTranscript(langOption) {
  try {
    const rawTranscript = await getRawTranscript(langOption.link);
    const transcript = rawTranscript.map(item => item.text).join(' ');
    return transcript;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getRawTranscript(link) {
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

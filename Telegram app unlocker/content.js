function updateIframeSrc(iframe) {
  const src = iframe.src;
  if (src.includes('tgWebAppPlatform=weba') || src.includes('tgWebAppPlatform=web')) {
    const newSrc = src.replace(/tgWebAppPlatform=(weba|web)/, 'tgWebAppPlatform=ios');
    iframe.src = newSrc;
    console.log('Iframe src updated:', newSrc);
  } else {
    console.log('Iframe already has ios platform or different parameter:', src);
  }
}

function waitForIframe() {
  return new Promise((resolve) => {
    const checkIframe = () => {
      const iframes = document.querySelectorAll('iframe');
      let foundIframe = false;
      if (iframes.length > 0) {
        iframes.forEach((iframe) => {
          const src = iframe.src;
          if (src && (src.includes('tgWebAppPlatform=weba') || src.includes('tgWebAppPlatform=web'))) {
            console.log('Iframe found with matching src:', iframe);
            resolve(iframe);
            foundIframe = true;
          }
        });
      }
      if (!foundIframe) {
        requestAnimationFrame(checkIframe);
      }
    };
    checkIframe();
  });
}

function continuouslyUpdateIframes() {
  waitForIframe().then((iframe) => {
    updateIframeSrc(iframe);
    continuouslyUpdateIframes();
  }).catch((error) => {
  });
}

if (window.location.hostname === 'web.telegram.org' && window.location.protocol === 'https:') {
  console.log('On the correct domain, starting iframe observer...');
  continuouslyUpdateIframes();
} else {
  console.log('Not on the correct domain, script will not run.');
}

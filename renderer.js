const webview = document.getElementById('webview');
const urlInput = document.getElementById('url');

document.getElementById('go').addEventListener('click', () => {
  let url = urlInput.value.trim();
  if (!url.startsWith('http')) {
    url = 'http://' + url;
  }
  console.log('Navigating to:', url);
  webview.setAttribute('src', url);
  //webview.loadURL(url);
});

document.getElementById('back').addEventListener('click', () => {
  if (webview.canGoBack()) webview.goBack();
});

document.getElementById('forward').addEventListener('click', () => {
  if (webview.canGoForward()) webview.goForward();
});

document.getElementById('reload').addEventListener('click', () => {
  webview.reload();
});

webview.addEventListener('did-navigate', () => {
  urlInput.value = webview.getURL();
});

webview.addEventListener('did-start-loading', () => {
  console.log('Started loading...');
});

webview.addEventListener('did-stop-loading', () => {
  console.log('Finished loading!');
});

webview.addEventListener('did-fail-load', (e) => {
  console.error('Failed to load:', e.errorCode, e.errorDescription);
});

webview.addEventListener('did-navigate', () => {
  urlInput.value = webview.getURL(); // Update address bar
});

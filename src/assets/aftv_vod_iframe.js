const actualCode = '(' + function () {
  const interval = setInterval(() => {
    if ( window.vodPlayer && window.vodPlayer.vodManager && !window.vodPlayer.vodManager.isAdPlaying ) {
      window.parent.postMessage({aftvVodAdDone: true}, '*');
      clearInterval(interval);
    }
  }, 100);
} + ')();';
const script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);

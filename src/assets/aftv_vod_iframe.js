const actualCode = '(' + function () {
  let aftvVodAdDone = false;
  const interval = setInterval(() => {
    if ( window.vodPlayer || window.vodPlayer.vodManager || !window.vodPlayer.vodManager.adManager ) {
      console.log('aftvVodAdDone', aftvVodAdDone);
      clearInterval(interval);
      window.parent.postMessage({aftvVodAdDone: true}, '*');
    }
  }, 100);
} + ')();';
const script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);

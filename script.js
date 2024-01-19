Zjištění stavu připojení
function isOnline() 
  {
    return navigator.onLine;
  }

// Obsluha online
function handleOnline() 
  {
    console.log('Online: Připojeno k internetu');
  }

// Obsluha offline
function handleOffline() 
  {
    console.log('Offline: Ztráta připojení k internetu');
  }

// Posluchače online a offline
window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);

// Inicializace
if (isOnline()) 
  {
    console.log('Online: Připojeno k internetu');
  } 
else 
  {
    console.log('Offline: Ztráta připojení k internetu');
  }

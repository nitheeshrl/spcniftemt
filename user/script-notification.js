var username ;
async function deletesub(id){
    var url ="https://passkey-5ev6.onrender.com";
    const response = await fetch(url+'/delete-notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })
}
async function checksub(){
    var uniqueID2 = localStorage.getItem("Notification-uniqueID");
    var permission = await Notification.permission;
    console.log(permission)
    if (uniqueID2!==""||uniqueID2!==undefined){
    if (permission =="default"||permission =="default"){
        deletesub(uniqueID2);
        localStorage.removeItem("Notification-uniqueID")
    }

    const serviceWorkerRegistration = await navigator.serviceWorker.getRegistration();
    if (serviceWorkerRegistration) {
    const actualSubscription = await serviceWorkerRegistration.pushManager.getSubscription();
    if (actualSubscription){
        deletesub(uniqueID2);
        localStorage.removeItem("Notification-uniqueID")
    }
    }
}
    }
const  GetUniqueIDforNotification = () =>{
    const uniqueID = localStorage.getItem("Notification-uniqueID");
    if (uniqueID == undefined){
    const newUniqueID = crypto.randomUUID();
    
    return [newUniqueID, "New"];
    }
    else {
    return [uniqueID,"Old"];
    }
    }
async function sendnotification(username,message,type){
    var url ="https://passkey-5ev6.onrender.com";
    const response = await fetch(url+'/send-notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, message, type })
    })
}
const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}
const saveSubscription = async (subscription) => {
    var id = GetUniqueIDforNotification();
    if (id[1]=="New"){
        localStorage.setItem("Notification-uniqueID",id[0])  
    }
username = localStorage.getItem("loggedname");
    const response = await fetch('https://passkey-5ev6.onrender.com/save-subscription', {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify({username,subscription,type:"student",uniqueID:id[0]})
    })

    return response.json()
}

const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("No support for service worker!")
    }

    if (!('Notification' in window)) {
        throw new Error("No support for notification API");
    }

    if (!('PushManager' in window)) {
        throw new Error("No support for Push API")
    }
}

const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        console.log("Notification permission not granted")
    }
else if(permission == 'granted'){

    let sw = await navigator.serviceWorker.ready;
   
        const subscription = await sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BKZKjQJLUXjA8vv0Dz4_j5nsP03q7Fpp7M3FGAuznw5bsuqRkjO52NMIEdsyP3jKh5wxY1xs9gKZjAGhqjDyNVY")
        })
    
        const response = await saveSubscription(subscription)
        console.log(response)

}
}
async function registerPWASW() {
    if ('serviceWorker' in navigator) {
      try {
        console.log("running")
        await navigator
              .serviceWorker
              .register('serviceworker.js');
              console.log("SW registration")
      }
      catch (e) {
        console.log('SW registration failed');
      }
    }
  }
const main = async () => {
    checkPermission();
    await checksub();
    await registerPWASW();
    await requestNotificationPermission()
   
}

main()

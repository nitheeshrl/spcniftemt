function checkinternet(){
    var status = navigator.onLine;
    var element_box = document.getElementById("internetstatus-box");
    var element = document.getElementById("internetstatus");
    if (!status&&!element.classList.contains('offline')){
        console.log("Offline");
        document.getElementById("internetstatus").classList.remove('online')
        document.getElementById("internetstatus").classList.toggle('offline')
        element.children[0].textContent="You are Offline";
        element_box.style.display="flex"
        
    }
    else if(status&&!element.classList.contains('online')){
        console.log("Online")
        document.getElementById("internetstatus").classList.remove('offline')
        document.getElementById("internetstatus").classList.toggle('online')
        element.children[0].textContent="You are Online again";
        setTimeout(function () { element_box.style.display="none"; },2000);
    }
  
}

setInterval(checkinternet,100)

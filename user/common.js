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


function getuserdetailsonload(user){
    console.log("User Detail Fetching....")
    var ruserdetails = localStorage.getItem("loggeduserdetails");
    var rrf = JSON.parse(ruserdetails);
    var user = rrf.id;
      var formDataString =user+"/2";
    //  console.log(formDataString)
  
      fetch(
        "https://script.google.com/macros/s/AKfycbyAPLvMM2LW60vQRVYc6Uy6doDJumHO1eVDZ36IZQY25z4eTLhkc2y3NARQ09p818bo/exec",
        {
          redirect: "follow",
          method: "POST",
          body: formDataString,
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        }
      )
  
        .then(function (response) {
  
          // Check if the request was successful
          if (response) {
       
            return response; // Assuming your script returns JSON response
          } else {
            throw new Error("Failed to verify credentials");
          }
        })
        .then(async function (data) {
          const result1 = await data.json();
  var userdetails = result1.data2;
//console.log(userdetails)
  var udata = userdetails[7];
 //console.log(udata)
 var na = localStorage.getItem("loggedname");
 var naor =    localStorage.getItem("loggeduorp");
 var napic =   localStorage.getItem("loggedpic");
 var namail =    localStorage.getItem("loggedmail");

  localStorage.setItem("loggedname", userdetails[2]);
  localStorage.setItem("loggeduorp", userdetails[3]);
  localStorage.setItem("loggedpic", userdetails[4]);
  localStorage.setItem("loggedmail", userdetails[5]);
  localStorage.setItem("loggeduserdetails",udata);
  //setdata()
  var nrid  = localStorage.getItem("loggeduserdetails");
  var rna = localStorage.getItem("loggedname");
  var rnaor =    localStorage.getItem("loggeduorp");
  var rnapic =   localStorage.getItem("loggedpic");
  var rnamail =    localStorage.getItem("loggedmail");
     var rid  = localStorage.getItem("loggeduserdetails");
  console.log(rid,nrid)
  console.log(rid,nrid,rna,na,rnaor,naor,rnapic,napic,namail,rnamail)
  if(rid!==nrid||rna!==na||rnaor!==naor||rnapic!==napic||namail!==rnamail){
    console.log("New Reload")
   location.reload();
  }
        })
  
        .catch(function (error) {
          // Handle errors, you can display an error message here
          console.error(error);
        });
      }
 
      var rid  = localStorage.getItem("loggeduserdetails");
      var uid = JSON.parse(rid).id;
      getuserdetailsonload(uid);
     
  
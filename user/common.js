
var ustatus ;

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
        updatelogstatus2("Offline");  
        
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
var uuorp = localStorage.getItem("loggeduorp");
if (uuorp=="M.Tech"){
 document.getElementById("form-btn-side").href="m-request-form.html";
}

function getuserdetailsonload(user){
    console.log("User Detail Fetching....")
    var ruserdetails = localStorage.getItem("loggeduserdetails");
    var rrf = JSON.parse(ruserdetails);
    var user = rrf.id;
      var formDataString =user+"/2";
      console.log(formDataString)
  
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
          getuserdetailsonload(uid+"/2")
          
          const result1 = await data.json();
  var userdetails = result1.data2;
//console.log(userdetails)
  var udata = userdetails[7];
 //console.log(udata)
 var na = localStorage.getItem("loggedname");
 var naor =    localStorage.getItem("loggeduorp");
 var napic =   localStorage.getItem("loggedpic");
 var namail =    localStorage.getItem("loggedmail");
 var nrid  = localStorage.getItem("loggeduserdetails");

  localStorage.setItem("loggedname", userdetails[2]);
  localStorage.setItem("loggeduorp", userdetails[3]);
  localStorage.setItem("loggedpic", userdetails[4]);
  localStorage.setItem("loggedmail", userdetails[5]);
  localStorage.setItem("loggeduserdetails",udata);
  //setdata()

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
          getuserdetailsonload(uid+"/2")
          // Handle errors, you can display an error message here
          console.error(error);
        });
      }
 
      var rid  = localStorage.getItem("loggeduserdetails");
      var uid = JSON.parse(rid).id;
      setTimeout(function () { getuserdetailsonload(uid+"/2"); },2000);
      
     
      var udecide ="";
      function sidebari(){
         
          var amenu =
          `      <ul>
      <li class="indetails" id="insname">
        <div style="width: 50px; display: flex;gap: 10px;">
          <img style="width: 50px;" src="white_logo.png" alt="">
          <span style="color: white;">NIFTEM-T <br> Placement Cell</span>
        </div>
        
        <button onclick=toggleSidebar() id="toggle-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z"/></svg>
        </button>
      </li>
      <li class="outdetails" id="outlogo" style="">
        <button class="out-items" onclick=toggleSidebar1() id="toggle-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z"/></svg>
        </button>
        <img class="out-items" style="width: 50px;" src="white_logo.png" alt="">
        <img id="profileimage1" style=" scale:90%;border-radius: 50px; width: 50px; height: 50px; object-fit: cover;" src=".//1.png" alt="" srcset="">
       
      </li>
      <li class="indetails"  id="insprofile" style="left: 0px;">
        <div class="log-items" style="flex-direction: column; gap: 0px; align-items: center;justify-content: center;">
         <a onclick="userPopup()"><img id="profileimage" style=" scale:200%;border-radius: 50px; width: 50px; height: 50px; object-fit: cover;" src=".//1.png" alt="" srcset=""></a>
       <div style="background-color: white; color: black; padding: 10px;border-radius: 40px;">
        <p ><span id="mname"></span></p>
       </div>
       

          </div>

      </li>
      <li>
        <a href="dashboard.html">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M520-640v-160q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v160q0 17-11.5 28.5T800-600H560q-17 0-28.5-11.5T520-640ZM120-480v-320q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v320q0 17-11.5 28.5T400-440H160q-17 0-28.5-11.5T120-480Zm400 320v-320q0-17 11.5-28.5T560-520h240q17 0 28.5 11.5T840-480v320q0 17-11.5 28.5T800-120H560q-17 0-28.5-11.5T520-160Zm-400 0v-160q0-17 11.5-28.5T160-360h240q17 0 28.5 11.5T440-320v160q0 17-11.5 28.5T400-120H160q-17 0-28.5-11.5T120-160Zm80-360h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
          <span>Dashboard</span>
        </a>
      </li>
      <li>
        <button onclick=toggleSubMenu(this) class="dropdown-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h207q16 0 30.5 6t25.5 17l57 57h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Zm400-160v40q0 17 11.5 28.5T600-320q17 0 28.5-11.5T640-360v-40h40q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480h-40v-40q0-17-11.5-28.5T600-560q-17 0-28.5 11.5T560-520v40h-40q-17 0-28.5 11.5T480-440q0 17 11.5 28.5T520-400h40Z"/></svg>
          <span>Brochure Update</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"/></svg>
        </button>
        <ul class="sub-menu">
          <div>
            <li><a id="form-btn-side" href="request-form.html">Request Form</a></li>
            <li><a href="past.html">Past Requests</a></li>
          </div>
        </ul>
      </li>
      <li>
        <button onclick=toggleSubMenu(this) class="dropdown-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m221-313 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-228q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm0-320 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-548q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm339 353q-17 0-28.5-11.5T520-320q0-17 11.5-28.5T560-360h280q17 0 28.5 11.5T880-320q0 17-11.5 28.5T840-280H560Zm0-320q-17 0-28.5-11.5T520-640q0-17 11.5-28.5T560-680h280q17 0 28.5 11.5T880-640q0 17-11.5 28.5T840-600H560Z"/></svg>
          <span>Forms</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"/></svg>
        </button>
        <ul class="sub-menu">
          <div>
            <li><a href="forms.html">Live Forms</a></li>
            <li><a href="apply-forms.html">Applied Forms</a></li>
          </div>
        </ul>
      </li>
      <li>
       
          <button onclick=toggleSubMenu(this) class="dropdown-btn">
          
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
            <span>Profile</span>
   
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"/></svg>
          </button>
        <ul class="sub-menu">
          <div>
            <li><a href="change-pass-1.html">Change Password</a></li>
            <li><a onclick="passkey1()">Create PassKey</a></li>
            <li><a onclick="alllogoutPopup()" >Logout</a></li>
          </div>
        </ul>
      </li>

    </ul>`;
          var path = window.location.pathname;

          document.getElementById("sidebar").innerHTML = amenu;
          document.getElementById("profileimage").src = localStorage.getItem("loggedpic");
          document.getElementById("profileimage1").src = localStorage.getItem("loggedpic");
          document.getElementById("mname").innerHTML = localStorage.getItem("loggedname");
  
          
      console.log(path)
          var a = document.getElementById("sidebar").querySelectorAll("a");
      a.forEach(i =>{
        var href = i.href;
        if(path=="/user/"){
          path = "/user/index"
        }
      
        console.log(href)
        if(!path.includes(".html")){
          path = path+".html";
        }
        if (href.includes(path)){
          i.parentElement.className="active";
          if (i.children.length==0){
              i.parentElement.parentElement.parentElement.classList.toggle('show')
          }
        }
      
      })
      
       }
      
      sidebari()

      function alllogout(){
        updatelogstatus2("Offline");  
        localStorage.removeItem("loggedname")
      localStorage.removeItem("loggeduserdetails");
       localStorage.removeItem("loggeduorp");
       localStorage.removeItem("loggedpic");
       localStorage.removeItem("loggedmail");
        window.location="../logout.html";
      }
      function alllogoutPopup(){
        console.log("ok")
        var opt = document.getElementById("popup-3").children[1].children[3].children[1];
document.getElementById("popup-3").classList.toggle("active");
opt.setAttribute("onclick","alllogout()")
console.log(opt)

}

async function passkey1(){
  ustatus="Going";
  document.getElementById("loader").style.display="block"; 
           document.getElementById("load").style.display="initial";
           document.getElementById("message").textContent="Checking....";
  var passkeysss ={};
  var fetchurl = "https://passkey-5ev6.onrender.com";
  const url = new URL(window.location)
  var weburl = location.hostname;
           var passdevuniid =GetUniqueID();
           const jcheck_name = localStorage.getItem("loggeduserdetails");
           var fgname = JSON.parse(jcheck_name);
           var username = fgname.id;
           console.log(passdevuniid);
           const response = await fetch(fetchurl+'/check-pasakey', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({ weburl, username,devUniId:passdevuniid  })
           })

           const passkeycheck = await response.json()
           console.log(passkeycheck)
           const { no } = passkeycheck// Server side challenge
if (no ==  0){
 document.getElementById("loader").style.display="block"; 
           document.getElementById("load").style.display="initial";
           document.getElementById("message").textContent="Registering PassKey....";
         

       const { startRegistration, startAuthentication } = SimpleWebAuthnBrowser;

           console.log(weburl)
           const response = await fetch(fetchurl+'/register-challenge', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({ username, weburl })
           })

           const challengeResult = await response.json()
           const { options } = challengeResult // Server side challenge

           const authenticationResult = await startRegistration({optionsJSON: options})
           console.log(authenticationResult)

           var urlorigin= location.protocol+"//"+location.host;
           console.log(urlorigin)
           var create_passkey = await fetch(fetchurl+'/register-verify', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({ username, cred: authenticationResult, challenge: options.challenge, devUniId:passdevuniid[0], weburl,urlorigin })
           })
           const create_passkeyResult = await create_passkey.json();
           console.log(create_passkeyResult.result)
           
           
passkeysss = create_passkeyResult.info;
console.log(create_passkeyResult.info);
if (create_passkeyResult.info.userVerified){
 localStorage.setItem("Passkey-uniqueID",passdevuniid[0]);
 document.getElementById("loader").style.display="none"; 
document.getElementById("message").textContent="PassKey Registered Successfully";
setTimeout(function () { 
 document.getElementById("load").style.display="none";
 ustatus="";
},2000);
}


}
else{
  document.getElementById("loader").style.display="none"; 
document.getElementById("message").textContent="PassKey is already created for this Device";
setTimeout(function () { 
 document.getElementById("load").style.display="none";
 ustatus="";
},2000);
//alert("PassKey is already created for this Device")
}
}

/*function updatelogstatus2(status){
  var rid  = localStorage.getItem("loggeduserdetails");
  var uid = JSON.parse(rid).id;
  var updatestring = uid+"/"+status;
console.log(updatestring)
       
   fetch(

"https://script.google.com/macros/s/AKfycbxsnG9O-WHOVuOvnfmCkGES9yqlMNAHB6hvge6HE04uehkJr1F2Y8uWlZ1BBkQFB6J4/exec",
{
  redirect: "follow",
  method: "POST",
  body: updatestring,
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
    throw new Error("Failed to fetch.");
  }
})
.then(async function (data) {
const result1 = await data.json();

var r = result1.data2;


})

.catch(function (error) {
// Handle errors, you can display an error message here
console.error(error);
updatelogstatus2(status);
});
}


setTimeout(() => {

updatelogstatus2("Online");

}, 2000)
window.addEventListener("blur", () => {
updatelogstatus2("Offline");   
});
window.addEventListener("focus", () => {
updatelogstatus2("Online");   
});
//window.unblur = colse();
const beforeUnloadHandler = (event) => {  
updatelogstatus2("Offline");  
};
window.addEventListener("beforeunload", beforeUnloadHandler);*/
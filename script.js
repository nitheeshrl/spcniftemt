
    var toggle_state = false;
    function togglePopup6(){

   document.getElementById("popup-6").classList.toggle("active");
   
     if(document.getElementById("popup-6").classList.contains("active")){
      console.log("Closing popup")
toggle_state = true;
   }
   else {
    console.log("Toggling popup")
toggle_state = false;

}
console.log(toggle_state)
   }
 


function onuploadcomplete (loadermessage){
  togglePopup6();

  localStorage.setItem("loggedname", muserdetails[2]);
  localStorage.setItem("loggeduorp", muserdetails[3]);
  localStorage.setItem("loggedpic", muserdetails[4]);
  localStorage.setItem("loggedmail", muserdetails[5]);
  localStorage.setItem("loggeduserdetails",muserdetails[7]);
  var  uname = localStorage.getItem("loggedname");
  console.log(uname)
  document.getElementById("load").style.display="initial";
document.getElementById("loader").style.display="none"; 
document.getElementById("message").textContent= loadermessage || "Logged in Successful";

setTimeout(function () { 
  document.getElementById("load").style.display="none";
  var enusername = document.getElementById("Username").value;
  var lastpage = sessionStorage.getItem("lastpage");
if (lastpage==undefined||lastpage==""){
  window.location="user/dashboard.html";
}
else{
  window.location=lastpage;
  sessionStorage.removeItem("lastpage");
}
 },2000);
}

var models_ready = false;
var user_fetch_complete = false;
const video = document.getElementById("video");
let username = [];
Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("models"),
]).then(webmodelready);
function webmodelready (){
  console.log("Models Loaded");
 // startWebcam();
models_ready = true;
}
function startWebcam() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      window.localStream = stream;
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error(error);
    });
}
function vidOff() {
  localStream.getVideoTracks()[0].stop();
  video.src = '';
}

function getLabeledFaceDescriptions(image_location) {
if(!image_location.includes("drive.google.com")){
image_location = `./user/${image_location}`;
}
  const labels = [image_location];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(image_location);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );

}

function checkfacematch(detection,faceMatcher){
  var f_username = ["unknown"];
     const canvas = faceapi.createCanvasFromMedia(video);
      const displaySize = { width: video.width, height: video.height };
      
        const resizedDetections = faceapi.resizeResults(detection, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
console.log(faceMatcher)
      const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));

      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, { label: result });
        drawBox.draw(canvas);
console.log("Result:", result.label, "Distance:", result.distance);
//return result.label;
        if (result.label !== "unknown" && result.distance > 0.4) {
           f_username = [result.label];
        }
        else{
          f_username = ["unknown"];
                }
      });
     return f_username[0] !== "unknown" ? f_username[0] : "unknown";  
}

let faceCheckStarted = false;

function checkface(labeledFaceDescriptors, faceMatcher) {
  if (faceCheckStarted) return;
  faceCheckStarted = true;

  const onPlayHandler = async () => {
    console.log(faceMatcher);
    console.log(labeledFaceDescriptors);

    const canvas = faceapi.createCanvasFromMedia(video);
   // document.body.append(canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    let checkingname;
    let findname;
    username = ["unknown"];

    checkingname = setInterval(async () => {
      if (toggle_state !== true) {
        console.log("Waiting for popup to be active");
        return;
      }

      document.getElementById("nostatus").style = "color: black;";
      document.getElementById("nostatus").textContent = "Verifying your face";

      // Get context and flip horizontally (mirror)
      const context = canvas.getContext("2d");
      context.setTransform(-1, 0, 0, 1, canvas.width, 0); // Mirror horizontally

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const flipped = await faceapi.detectAllFaces(canvas)
        .withFaceLandmarks()
        .withFaceDescriptors();

      // Reset transform and process original too
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const normal = await faceapi.detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors();

      const detections = [flipped,normal];
      var normaldetections = checkfacematch(normal,faceMatcher);
      var flipdetections = checkfacematch(flipped,faceMatcher);
      console.log("Normal Detections:", checkfacematch(normal,faceMatcher));
      console.log("Flipped Detections:", checkfacematch(flipped,faceMatcher));
              if (username[0] === "unknown" && (normaldetections !== "unknown" || flipdetections !== "unknown")) {
                username[0] =flipdetections || normaldetections;
         
        } else if (normaldetections !== "unknown" || flipdetections !== "unknown") {
          username.push(flipdetections || normaldetections);
        }
        console.log("Current usernames:", username);
      detections.forEach((detection) => {

      });
    }, 100);

    findname = setInterval(() => {
      const allEqual = arr => arr.every(val => val === arr[0]);
      console.log("Checking if all names are equal:", username);  
      const finalcheck = allEqual(username);
      let namechecked = "unknown";

      if (finalcheck && username[0] !== "unknown"&& username[0] !== undefined) {
        const mostFrequent = Array.from(new Set(username)).reduce((prev, curr) =>
          username.filter(el => el === curr).length > username.filter(el => el === prev).length ? curr : prev
        );

        namechecked = mostFrequent;
        if (namechecked !== "unknown") {
          clearInterval(checkingname);
          clearInterval(findname);
          sessionStorage.setItem("namestu", namechecked);
          vidOff();
          const canvas = document.querySelector("canvas");
          if (canvas) canvas.remove();
          document.getElementById("nostatus").textContent = "Face Verified Successfully";
          onuploadcomplete("Face Verified Successfully");
        }
      } else {
        document.getElementById("nostatus").style = "color: red;";
        document.getElementById("nostatus").textContent = "Could not get your face. Try in good lighting";
        username = ["unknown"];
      }
    }, 2000);

    setTimeout(() => {
      const allEqual = arr => arr.every(val => val === arr[0]);
      const finalcheck = allEqual(username);
      let namechecked = "";

      if (finalcheck && username[0] !== "unknown"&& username[0] !== undefined) {
        clearInterval(checkingname);
        clearInterval(findname);
        const mostFrequent = Array.from(new Set(username)).reduce((prev, curr) =>
          username.filter(el => el === curr).length > username.filter(el => el === prev).length ? curr : prev
        );

        namechecked = mostFrequent;
        sessionStorage.setItem("namestu", namechecked);
        vidOff();
        const canvas = document.querySelector("canvas");
        if (canvas) canvas.remove();
        document.getElementById("nostatus").textContent = "Face Verified Successfully";
        onuploadcomplete("Face Verified Successfully");
      } else {
        clearInterval(checkingname);
        clearInterval(findname);
        vidOff();
        toggle_state = false;
        user_fetch_complete = false;
        username = ["unknown"];
        faceCheckStarted = false;

        const canvas = document.querySelector("canvas");
        if (canvas) canvas.remove();

        document.getElementById("nostatus").textContent = "";
        togglePopup6();
        document.getElementById("message").textContent = "Unable to Verify the Face. Refresh the page to retry again.";
        document.getElementById("loader").style.display = "none";
        document.getElementById("load").style.display = "initial";

        setTimeout(() => {
          document.getElementById("load").style.display = "none";
          document.getElementById("loader").style.display = "none";
        }, 2000);
      }
    }, 10000);
  };

  video.addEventListener("play", onPlayHandler, { once: true });
}






function getuserdetails(user){
  var userr = user.split("/")
    var formDataString =userr[0]+"/2";
    console.log(formDataString)
    document.getElementById("loader").style.display="block"; 
            document.getElementById("load").style.display="initial";
            document.getElementById("message").textContent="Verifying ID Number....";
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
muserdetails =  result1.data2;

console.log(userdetails)

if (userdetails[0]!=="Not Found"){
   if(userdetails[0]=="Requested"){
 // alert("Your account is not activated. Please contact the admin")
 showLoader("Your registration is in process. Please wait for the alloted member to approve your request","none");
setTimeout(function () {
  hideLoader();
}, 5000);
}

else if (userdetails[0] =="Deactivated"){
showLoader("Your account is deactivated. Please contact your alloted member","none");
setTimeout(function () {
  hideLoader();
}, 5000);
}

else if (userdetails[0] =="Declined"){
showLoader("Your registration is declined. Please contact your alloted member","none");
setTimeout(function () {
  hideLoader();
}, 5000);
}
else{
user_fetch_complete = true;
}
  
return userdetails;
}
else if (userdetails[0]=="Not Found"){
  alert("User not found")
  document.getElementById("load").style.display="none";
  return
}
      })

      .catch(function (error) {
        // Handle errors, you can display an error message here
        console.error(error);
        document.getElementById("message").textContent =
          "An error occurred while verify credentials";
        document.getElementById("message").style.display = "block";
      });
    }
  
  async function login(){
    var enusername = document.getElementById("Username").value.toUpperCase().replaceAll(" ","");

    if (enusername == "" || enusername == null) {
      alert("Please enter your ID Number");
      return;
    }
   await getuserdetails(enusername);
            while(user_fetch_complete !== true){
          console.log("Waiting for user details to load")
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
         var user = muserdetails;
    if (user == undefined) {
      return;
    }
    else{
      console.log(user)
      if (user[0] !== "Not Found") {
        while(models_ready !== true){
          console.log("Waiting for models to load")
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        
  const labeledFaceDescriptors = await getLabeledFaceDescriptions(user[4]);
        if (labeledFaceDescriptors.length === 0) {
          alert("No face data found for this user");
          document.getElementById("load").style.display="none";
          return;
        }
        console.log(labeledFaceDescriptors)

  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
        
        document.getElementById("loader").style.display="none"; 
        document.getElementById("message").textContent="ID Verified Successfully";
        setTimeout(function () { 
          document.getElementById("load").style.display="none";
           startWebcam();
          togglePopup6();
         
          checkface(labeledFaceDescriptors,faceMatcher);
          //window.location ="check face/index.html";
        },2000);
      } else {
        alert("User not found");
        document.getElementById("load").style.display="none";
      }
    }
  }
  if (GetUniqueID() !== "Not"){
//window.location ="check face/index.html";
  }
const video = document.getElementById("video");
let username = ["unknown"];
Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("models"),
]).then(startWebcam);

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

function getLabeledFaceDescriptions() {
  var scheck_name = sessionStorage.getItem("checkname");
  var jcheck_name = JSON.parse(scheck_name);
  var check_name = jcheck_name[2];
  console.log(check_name,jcheck_name)
  if(check_name !== null){
  const labels = [check_name];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        console.log(`./labels/${label}/${i}.JPG`)
        const img = await faceapi.fetchImage(`./labels/${label}/${i}.JPG`);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
          console.log(i,detections,img)
        descriptions.push(detections.descriptor);
        
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}
else{
  alert("Name is not selected")
  window.location="../face.html";
}
}

video.addEventListener("play", async () => {
  const labeledFaceDescriptors = await getLabeledFaceDescriptions();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
  console.log(faceMatcher)
  console.log(labeledFaceDescriptors)

  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  var checkingname = setInterval(async () => {
    document.getElementById("nostatus").style="color: black;";
    document.getElementById("nostatus").textContent="Verifying your face";
    const detections = await faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    const results = resizedDetections.map((d) => {
      console.log(faceMatcher.findBestMatch(d.descriptor))
      return faceMatcher.findBestMatch(d.descriptor);
    });
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result,
      });
      console.log(result.distance)
      if (username[0]=="unknown" && result.label!=="unknown" &&result.distance > 0.4 ){
        username[0] = result.label;

      }
      else if (result.distance > 0.4){
        username.push(result.label);

      }
 
    });
  }, 100);
  var findname = setInterval(function( ) { 
    

const allEqual = arr => arr.every(val => val === arr[0]);
const finalcheck = allEqual(username);
var namechecked ="unknown";
if (finalcheck && username[0] !== "unknown"){
  console.log(username)
const mostFrequent = Array.from(new Set(username)).reduce((prev, curr) =>
  username.filter(el => el === curr).length > username.filter(el => el === prev).length ? curr : prev
);
console.log(mostFrequent); 
namechecked = mostFrequent;
console.log(namechecked)

if (namechecked !== "unknown" && username[0] !== "unknown" ){
  console.log("done")
  clearInterval( checkingname ); 
  sessionStorage.setItem("namestu",namechecked);
  vidOff();
  document.getElementById("loader").style.display="none";
  document.getElementById("message").style.display="none"; 
  document.getElementById("load").style.display = "initial";
  document.getElementById("bg").style.display="none"; 
  localStorage.setItem("loggedname", namechecked);
  var scde = sessionStorage.getItem("checkname");
  var jde = JSON.parse(scde);
  localStorage.setItem("loggeduorp", jde[3]);
  localStorage.setItem("loggedpic", jde[4]);
  localStorage.setItem("loggedmail", jde[5]);
  document.getElementById("message1").innerHTML="Welcome, <b>"+namechecked+"</b>";
  setTimeout(function( ) { 
   window.location="../user/dashboard.html"
  },1000)
 }   
}
else{
  console.log("noo")
  document.getElementById("nostatus").style="color: red;";
  document.getElementById("nostatus").textContent="Could not get your face. Try in good lighting";
  username = ["unknown"];
}
  }, 2000);
  setTimeout(function( ) { 
    clearInterval( checkingname ); 
    clearInterval( findname ); 

const allEqual = arr => arr.every(val => val === arr[0]);
const finalcheck = allEqual(username);
var namechecked ="";
console.log(finalcheck)
if (finalcheck && username[0] !== "unknown" ){
  console.log(username)
const mostFrequent = Array.from(new Set(username)).reduce((prev, curr) =>
  username.filter(el => el === curr).length > username.filter(el => el === prev).length ? curr : prev
);
console.log(mostFrequent);  
namechecked = mostFrequent; 
console.log(namechecked)

if (namechecked !== "unknown"){
  console.log("done")
  sessionStorage.setItem("namestu",namechecked);
  vidOff();
  document.getElementById("loader").style.display="none";
  document.getElementById("message").style.display="none"; 
  document.getElementById("load").style.display = "initial";
  localStorage.setItem("loggedname", namechecked);
  var scde = sessionStorage.getItem("checkname");
  var jde = JSON.parse(scde);
  localStorage.setItem("loggeduorp", jde[3]);
  localStorage.setItem("loggedpic", jde[4]);
  localStorage.setItem("loggedmail", jde[5]);
  document.getElementById("bg").style.display="none"; 
  sessionStorage.removeItem("checkname"); 
  document.getElementById("message1").innerHTML="Welcome, <b>"+namechecked+"</b>";
  setTimeout(function( ) { 
    window.location="../user/dashboard.html"
   },1000)
 }
}  
else{
  vidOff();
  document.getElementById("nostatus").textContent="";
  document.getElementById("message1").style.display="none"; 

  document.getElementById("bg").style.display="none"; 
  document.getElementById("message").textContent="Unable to Verify the Face. Refresh the page to retry again.";
  document.getElementById("loader").style.display="none"; 
  document.getElementById("load").style.display="initial";
 
  username = ["unknown"];
}  
  }, 10000);
});


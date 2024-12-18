let url = "https://script.google.com/macros/s/AKfycbzjsZZ7VB5r1_XZUhWvkyDUDIvQM7qVQYu7gtZhChTMhiAyjfXGuHAQg21flXWsg-IOSg/exec";
let url2 ="https://script.google.com/macros/s/AKfycbzPXrrCtGbkH8SyEO8tgNCOkYXxDV3NlJx8l7SvAd9g-ZH_ztd1wrp1lz-4N_EUCy2YIw/exec";

let fn1 = document.getElementById("fn1");
let u1 = document.getElementById("u1");
let img = document.querySelector("img1");

let c = document.getElementById("bt3");
let load = document.getElementById("load");
let message = document.getElementById("message");
let bfu1 = document.getElementById("bfu1");
let bfd1 = document.getElementById("bfd1");
let n1 = document.getElementById("n1");




document.getElementById("i1").addEventListener('change',clickupload("CV File","1BgUj3quS2w_eWxsHPY5-U1KJwkVUrPmB","i1"))
document.getElementById("i2").addEventListener('change',clickupload("Trainings and certifications File","11psY6B7D7Di8C0hriaez5By_gIGawn2Q","i2"))
document.getElementById("i3").addEventListener('change',clickupload("Internships File","1-2bkUBJaceLEMZJ4dLRODWtB8FbFiFvz","i3"))

function clickupload(folurl,fol,ii){
    let file1 = document.getElementById(ii);
   
    let fileurl1 = document.getElementById(folurl);
    file1.addEventListener('change',()=>{
    let fr = new FileReader();
    console.log(fr)
    console.log(file1.value)
    if (file1.value.includes(".pdf")||file1.value.includes(".PDF")){
            document.getElementById("loader").style.display="block"; 
            document.getElementById("load").style.display="initial";
            document.getElementById("message").textContent="Uploading....";
            fr.addEventListener('loadend',()=>{
                let res = fr.result;
            //    console.log(res)
                let v = fileurl1.value.replace("/"+fol,"");
                let folder = "15GgsPpNztp41g7Sw7s7LOT0vhnYnViei";
        
                let spt = res.split("base64,")[1];
                let obj = {
                    base64:spt,
                    type:file1.files[0].type,
                    name:file1.files[0].name,
                    folder,
                    v
        
                }
                console.log(obj)
                fetch(url,{
                    method:"POST",
                    body:JSON.stringify(obj)
                })
                .then(r=>r.text())
          
                .then(data=>fileurl1.value=(data+"/"+fol))
                .then(data=>console.log(fileurl1.value)&(onuploadcomplete (ii)))
                .then(console.log(v) )
            })
            fr.readAsDataURL(file1.files[0])
            fr.onprogress = function(data) {
                if (data.lengthComputable) {
                    var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
                    console.log(progress);
                }
            }
    }
    else{
        alert("Upload the file in correct format")
    }
    }
) 

}

function onuploadcomplete (){

    document.getElementById("loader").style.display="none"; 
    document.getElementById("message").textContent="Upload Successful";
    setTimeout(function () { document.getElementById("load").style.display="none"; },2000);
}

function dels () {
let url2 ="https://script.google.com/macros/s/AKfycbxqjblQueqrincM8sidvm2qNENxddM_NUgEmi_oIee61ciJjj06dEoDz2TCxv9HzovU3w/exec";
let f1name= fileurl1.value;
let foldername12= "1afoo9Ehr8BwFBVqCzU44spPjNm3qtE4A";
let obj2 = {
    f1name,
    foldername12
}
fetch(url2,obj2)
.then(data=>console.log(data))
}
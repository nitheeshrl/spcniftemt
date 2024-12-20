
async function main() {
    var fs = require('fs');
   /*  const sharp = require("sharp");
var inames = [
    'Srivigneswar S',
    'Sathishwaran S',

       ]
       var photourls =[
        'profiles/FSQA - Srivigneshwar.JPG',
        'profiles/FPE - Satishwaran.JPG'
         ]
for(var i =0;i<inames.length;i++){

    var ndir = './user/'+photourls[i];
    var dir = './labels/'+inames[i];
    var mdir = './labels/'+inames[i]+'/';
   fs.mkdirSync(dir, { recursive: true });
    fs.copyFile(ndir, './labels/'+inames[i]+"/1.JPG", (err) => {
        if (err) 
            throw err;
        console.log('source.txt was copied to destination.txt');
    });
      try {
        await sharp (mdir+"1.JPG")
        .rotate(180) // Rotate the image 90 degrees clockwise
        .flip() // Flip the image vertically . flop() // Flip the image horizontally
        .toFile(mdir+"2.JPG") ;
        console.log("Image midified successfully.");
        }
        catch (error) {
        console.error ("Error modifying image:", error);
   
}
}*/
var name = [
    ['Aarthi A','2021U1001'],
    ['Aishwarya Lakshmi S','2021U1002'],
    ['Ajitesh S','2021U1003'],
    ['Akash B','2021U1004'],
    ['Amirtha Varshini A','2021U1005'],
    ['Anandha Keerthy M','2021U1007'],
    ['Anindit Bizy Nair','2021U1008'],
    ['Anusha R','2021U1009'],
    ['Archana P','2021U1010'],
    ['Avantika C','2021U1011'],
    ['Chandrika Devendrappa','2021U1012'],
    ['Chitturi Rohith','2021U1014'],
    ['Cubarani Η','2021U1015'],
    ['David Evander Jebson S','2021U1016'],
    ['Dhanaselvam KR','2021U1017'],
    ['Diana Celcia R','2021U1018'],
    ['Diya Dharshini S','2021U1019'],
    ['Ethaya D','2021U1020'],
    ['Gautam Nayak','2021U1021'],
    ['Ginu Robtus R','2021U1022'],
    ['Guberavishnu S','2021U1024'],
    ['Guguloth Sridhar','2021U1025'],
    ['Himavanth R','2021U1027'],
    ['Jegan P','2021U1028'],
    ['Jenish Daniel B','2021U1029'],
    ['Joshua Charles','2021U1030'],
    ['K Kabilan','2021U1031'],
    ['Karyamsetty Worship','2021U1032'],
    ['Keerthika P','2021U1033'],
    ['Kevin Francis','2021U1034'],
    ['Kisha M','2021U1035'],
    ['Kota Lakshmi Sanjana','2021U1036'],
    ['Lakshmi Narayanan S','2021U1037'],
    ['Lakshmi Sruthi L','2021U1038'],
    ['Lavudya Sai Kumar','2021U1039'],
    ['Mahabir Prasad Swain','2021U1040'],
    ['Merla A P','2021U1041'],
    ['Mohamed Tharif N J','2021U1042'],
    ['Mohannath Shroff J','2021U1043'],
    ['MA Monesh Ram','2021U1044'],
    ['Mudavath Anjali','2021U1046'],
    ['Muthuraja K','2021U1048'],
    ['Nitheesh R L','2021U1049'],
    ['Nithish J P','2021U1050'],
    ['Padmaja M','2021U1052'],
    ['Pranav Nanda Kishore','2021U1053'],
    ['Punithavathi D','2021U1054'],
    ['Rakshithapriya S','2021U1055'],
    ['J Sanjeeth','2021U1056'],
    ['Santhoshkumar P','2021U1057'],
    ['Shivam Jha','2021U1058'],
    ['Sivashree S K','2021U1059'],
    ['Sri Harini S','2021U1060'],
    ['Srinithi C P','2021U1061'],
    ['Srivatsan V','2021U1062'],
    ['Subbu Krishna Sharma GM','2021U1063'],
    ['Suman Kumar','2021U1064'],
    ['Surendar S','2021U1065'],
    ['Tippaleti Srujana','2021U1067'],
    ['Vemula Uharika','2021U1068'],
    ['Vishnu Varthan T','2021U1069'],
    ['Yadla Ganesh Babu','2021U1070'],
    ['Yuvashreekantham R','2021U1071'],
    ['Anjali S','2023P2001'],
    ['Anshida P K','2023P2002'],
    ['Hari Priya J','2023P2004'],
    ['Harish S','2023P2005'],
    ['Hayanthika M S','2023P2006'],
    ['Irfana Z','2023P2007'],
    ['Kadimi Lakshmi Devi','2023P2009'],
    ['Karthick Ajay B','2023P2010'],
    ['Kolli Venkata Naga Mallikarjuna Reddy','2023P2011'],
    ['Nandana M','2023P2012'],
    ['Shaliha A','2023P2013'],
    ['Sruti Chandra','2023P2014'],
    ['Sushmithasri R','2023P2016'],
    ['Abhijith K','2023P3001'],
    ['Ishwarya Lakshmi S','2023P3004'],
    ['Joseph P J','2023P3005'],
    ['Mani Bharathi G','2023P3006'],
    ['Manikandan T','2023P3007'],
    ['Mathangi G','2023P3008'],
    ['Mulukuri Naveena','2023P3009'],
    ['Muthumeena J','2023P3010'],
    ['Rajasri C','2023P3012'],
    ['Shanmugapriya R','2023P3013'],
    ['Srivigneswar S','2023P3014'],
    ['Sujithra M','2023P3015'],
    ['Trivedi Nidhi Deepak','2023P3016'],
    ['Bommi Durga Naga Sai Sri Sruthileena','2023P1001'],
    ['Damini H S','2023P1002'],
    ['Gokul Raj R','2023P1003'],
    ['Midhuna Kurian','2023P1004'],
    ['Parkhe Prajwal Anilkumar','2023P1005'],
    ['Praveena B','2023P1006'],
    ['R B Ramyaa','2023P1007'],
    ['Sathishwaran S','2023P1008'],
    ['Vidhyadharan A','2023P1011'],
    ['Yogesh M A','2023P1012'],
    ['B.Tech Admin','badmin'],
    ['M.Tech Admin','madmin'],
]
const testFolder = './check face/labels/';
for(var i =0;i<name.length;i++){
    console.log(name[i][0])
fs.rename(testFolder+name[i][0],testFolder+name[i][1], err => {
    if (err) throw err;
    console.log(name[i][0]+` was renamed to `+name[i][1]);
});
}
}
main();

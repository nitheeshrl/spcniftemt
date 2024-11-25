
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
const testFolder = './user/profiles/';

fs.readdirSync(testFolder).forEach(file => {
  console.log("'profiles/"+file+"',");
});
}
main();

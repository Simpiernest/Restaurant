const sharp = require('sharp');
const path = require('path');
const dir = 'C:/Users/VillageTech/Downloads';
const files = ['BellaVista_ A Taste Beyond the Ordinary-1.png','BellaVista_ A Taste Beyond Ordinary-2.png','BellaVista Elegant Restaurant Menu-3.png','BellaVista Luxury Restaurant Website Collection-4.png','BellaVista Restaurant_ Our Story-5.png','BellaVista Restaurant Gallery-6.png','BellaVista Guest Stories-7.png','BellaVista Restaurant Contact Page-8.png'];
const crops = [
['hero-home',1,420,65,604,240],['hero-menu',2,445,75,579,195],['hero-about',4,415,60,609,190],['hero-gallery',5,431,79,593,227],['hero-testimonials',6,436,65,588,218],['hero-contact',7,410,66,614,239],
['steak',5,280,774,238,145],['salmon',6,788,1003,198,122],['pasta',5,532,585,252,166],['burger',1,750,464,181,91],
['bruschetta',5,26,930,230,139],['shrimp',2,287,450,216,92],['salad',2,527,450,216,92],['soup',2,769,450,213,92],['risotto',2,529,782,211,82],['chicken',2,768,782,212,82],['special',1,392,876,398,143],
['dining',4,50,266,404,171],['chef',4,50,754,250,152],['produce',4,248,563,275,167],['chef-working',4,773,563,203,167],
['terrace',5,26,577,242,149],['interior',5,279,395,242,286],['cake',5,532,394,252,177],['chef-portrait',5,797,394,201,169],['wine',5,797,576,201,157],['scallops',5,26,394,241,169],['pasta-gallery',5,532,585,252,166],['table',5,532,762,252,154],['exterior',5,797,746,201,172],['woman-chef',5,26,739,241,177],['ingredients',5,271,936,231,133],['sunset',5,511,931,234,139],['cheesecake',5,755,931,242,140],['bar',4,626,1057,177,113],['booth',4,814,1057,178,113],['guest',6,100,305,335,214],['reserve',1,740,1282,284,136],['contact-dining',7,2,1058,602,211],['map',7,340,873,640,166],['avatar-amara',6,505,472,45,45],['avatar-daniel',6,82,654,49,49],['avatar-leila',6,393,654,48,49]
];
(async()=>{for(const [name,i,left,top,width,height] of crops){ const meta=await sharp(path.join(dir,files[i])).metadata(); await sharp(path.join(dir,files[i])).extract({left:Math.round(left*meta.width/1024),top:Math.round(top*meta.height/1536),width:Math.round(width*meta.width/1024),height:Math.round(height*meta.height/1536)}).webp({quality:95}).toFile(`public/assets/${name}.webp`); } console.log(`Extracted ${crops.length} reference photos`);})();

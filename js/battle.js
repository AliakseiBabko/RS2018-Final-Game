
//-----------------------Starfield for the Battlefield Script----------------
let HEIGHT = window.innerHeight, WIDTH = window.innerWidth, starNumber = 150;

function starField (context) {
  let x, y, radius;

  // draw the blank night sky
	const my_gradient = context.createLinearGradient(0, 0, 0, HEIGHT*0.75);
	my_gradient.addColorStop(0, "#33425b");
	my_gradient.addColorStop(1, "#257eb7");
  context.fillStyle = my_gradient;
  context.fillRect(0, 0, WIDTH, HEIGHT);
  
  // save the previous canvas context state
  context.save();
  
  for (let i = 0; i < starNumber; i++) {
    x = Math.random() * WIDTH; // random x position
    y = Math.random() * HEIGHT; // random y position
    radius = Math.random() * 1.2 + 1; // random radius

    // start drawing the star
    context.beginPath();
    context.fillStyle = "#ffffff";
    // draw the star (an arc of radius 2 * pi)
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    // fill the star and stop drawing it
    context.fill();
    context.closePath();
  }
  
  // restore the previous context state
  context.restore();
}

function init () {
  // find the canvas and create its context
  const canvas = document.getElementById('starField'),
      context = canvas.getContext('2d');
  
  // set up the width and height
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  
  // create a star field
  starField(context);
}

init();
//------------------------------Create Monster Script------------------------
//generate and display monster's name
const legs = ["M257.4,347v45c0,0-36,0-48,10","M302.4,347v48c0,0,36,0,48,10"];

const hands = [["M132.4,190c-13,8-32,23-51,22c-15.3-0.8-34-21-41-32", "M428.4,217.7c6,10.3,17.9,29.6,29,32.3c8,2,17-3,22-8","M40.4,148L42.4,165","M16.4,157L30.4,171", "M11.4,180L26.4,183","M486.4,211L478.4,229", "M504.4,220L490.4,232","M510.4,241L491.4,243"], ["M420.4,180c7-9,29-27,54-20s23,43,23,43", "M135.4,181.7c0,0-13-25.7-36-25.7c-27,0-34,18-34,18", "M510.4,209L520.4,223", "M498.4,216L498.4,237", "M486.4,214L478.4,231", "M50.4,182L38.4,199", "M62.4,187L58.4,205", "M75.4,185L78.4,200"], ["M419.4,169c30,11,30,152,30,152", "M134.4,180c-29,14-37,135-37,135", "M82.4,324L72.4,343", "M92.4,329L88.4,349", "M103.4,329L105.4,345", "M458.4,333L463.4,349", "M447.4,333L445.4,355", "M436.4,333L430.4,349"], ["M133.4,182.3c-11,4.7-26,15.7-34,33.7s2,41,12,48", "M424.4,189c26,9,40.5,28,45,44c7,25-4,40-34,60", "M127.4,265L145.4,269", "M116.4,286L125.4,294", "M120.4,275L139.4,285", "M416.4,287L396.4,289", "M419.4,297L405.4,307", "M418.4,316L428.4,304"]];

const torso = [["M373.6,345.3H184.3c-28,0-50.8-22.9-50.8-50.8V140.2c0-28,22.9-50.8,50.8-50.8h189.3c28,0,50.8,22.9,50.8,50.8v154.3C424.4,322.5,401.6,345.3,373.6,345.3z"], ["M353.9,313.5l64.6-126.3c27.5-43.2-6-97.9-60-97.9H198.1c-54,0-87.4,54.6-60,97.9l64.6,126.3C229.6,355.9,326.9,355.9,353.9,313.5z"], ["M128.3,217.3a150,128 0 1,0 300,0a150,128 0 1,0 -300,0"], ["M261.3,81L258.9,104.5", "M239.7,87.8L243.3,104.5", "M289.2,104.5L292.8,89.8", "M307.8,105.4L308.1,91.7", "M323.4,105.4L324.3,90.8", "M340.5,80L342.3,104.5", "M357.6,84.9L356.7,105.4", "M375.6,89.8L372.9,104.6", "M390.5,109.7L391.8,96.6", "M224.4,88.8L223.5,103.5", "M207.7,105.4L207.3,93.7", "M188.4,104.5L189.3,89.8", "M174.5,107.7L171.3,94.7", "M162.6,113.8L151.5,98.6", "M151.5,125.1L142.5,114.2", "M146.2,132.8L132.6,132.8", "M128.1,149.5L142.5,151.4", "M133.5,167.1L140.7,167.1", "M129.9,183.7L142.5,183.7", "M141.6,200.4L131.7,201.3", "M126.3,216.9L141.6,218.9", "M142.5,233.6L132.6,233.6", "M141.6,247.3L134.4,249.2", "M425.1,192.5L413.4,190.5", "M422.4,208.1L415.2,208.1", "M426,224.8L413.4,223.8", "M414.3,241.5L422.4,241.4", "M429.6,257.1L414.3,258", "M413.4,274.7L423.3,274.7", "M414.3,288.4L421.5,290.3", "M142.5,265.2L128.1,264.9", "M141.6,284.4L131.7,281.5", "M144.5,299.1L132.6,299.1", "M149.3,308.9L136.2,315.7", "M157,317.9L149.7,324.5", "M162.3,324.5L162.3,333.3", "M180.3,331.4L174.9,344.1", "M193.8,331.4L193.8,341.2", "M211.8,333.3L211.8,341.2", "M228.9,333.3L232.5,344.1", "M248.7,333.3L246,349", "M268,332.4L265.8,344.1", "M283.3,331.4L283.8,344.1", "M303.6,333.3L300.9,349", "M318.9,331.4L319.8,349", "M336,333.3L336,341.2", "M352.6,331.4L352.2,341.2", "M365.7,332.4L367.5,348", "M383.1,330L382.8,342.2", "M391.8,324.5L398.1,334.3", "M402.7,314.4L409.8,322.3", "M408,306L418.8,306.9", "M412.5,174.9L426,173.9", "M412.5,157.8L423.3,158.3", "M411.8,143.5L423.3,141.6", "M408,130.8L422.4,123", "M274.8,88.8L275.7,105.4", "M401.8,116.7L407.1,109.3", "M362.6,331H192.3c-28,0-50.8-22.9-50.8-50.8V154.8c0-28,22.9-50.8,50.8-50.8h170.3c28,0,50.8,22.9,50.8,50.8v125.3C413.4,308.1,390.6,331,362.6,331z"]];

const eyes = [["M214.4,145.5a27.5,27.5 0 1,0 55,0a27.5,27.5 0 1,0 -55,0", "M280.4,150.5a27.5,27.5 0 1,0 55,0a27.5,27.5 0 1,0 -55,0", "M299.4,150.5a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0", "M235.4,145.5a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0", "M273.4,203.5a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0", "M252.4,203.5a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0"], ["M295.6,41.3a22.2,28.8 0 1,0 44.4,0a22.2,28.8 0 1,0 -44.4,0", "M206.5,37.6a22.2,28.8 0 1,0 44.4,0a22.2,28.8 0 1,0 -44.4,0", "M222.4,43.4a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0", "M310.5,45.6a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0", "M272.4,178.5a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0", "M251.4,178.5a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0", "M233.8,67L245.4,139", "M314.3,70L301.3,139"], ["M222,95.1a26.8,31.5 0 1,0 53.6,0a26.8,31.5 0 1,0 -53.6,0", "M283.8,98.1a26.8,31.5 0 1,0 53.6,0a26.8,31.5 0 1,0 -53.6,0","M267.9,159a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0", "M246.9,159a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0", "M294.4,98.5a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0", "M251.4,92.5a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0"], ["M334.4,162a50,50 0 1,0 100,0a50,50 0 1,0 -100,0", "M111.4,157a50,50 0 1,0 100,0a50,50 0 1,0 -100,0", "M352.4,162a32,32 0 1,0 64,0a32,32 0 1,0 -64,0", "M129.4,157a32,32 0 1,0 64,0a32,32 0 1,0 -64,0", "M284.4,196.5a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0", "M250.4,196.5a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0", "M378.4,158.5a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0", "M148.4,159.5a7.5,7.5 0 1,0 15,0a7.5,7.5 0 1,0 -15,0"]];

const mouth = [["M209.4,267c0,0,7-21,9-43c3,11,11,40,11,40", "M317.4,265c0,0,5-19,9-38c3,20,11,40,11,40", "M191.4,270c0,0,42-7,81-7s81,7,81,7", "M361.4,263c-4,4-6,9-6,15", "M183.4,263c4,6,6,12,6,18"], ["M364.9,255.6c-11.6,0.9-14.4,9.2-15.3,15.8", "M205,286.5c43.6-75,116.3-52,148.3-27", "M192.4,286.5c13.6-1,16.5,4,19.4,10", "M290.4,301c-10.7,8.6-15.8,6.1-21.5,2.8"],["M192.3,245.7c5.6,14.1,32.9,45.1,83.3,45.1c52.1,0,79.8-44.3,83.3-57.3", "M182.9,243.5c6.6,1.5,12.6-3.5,13.8-7.3", "M354.6,227.2c2.8,4.8,6.5,7.6,13.8,6.1"], ["M201.4,252c7,6,27,19,66,19s60-19,68-26", "M323.4,240c1,8,5,17,10,23", "M295.4,251c-0.7,11.9,1.5,19,7,29", "M258.1,258.7c-1.7,6.3-1.7,15.3,1.7,20.6", "M227.1,256.7c-1.7,6.3-1.7,12.3,1.7,17.6", "M321.4,226c-28.9,11.6-51,24-87,20c-10.5-1.2-26.6-15.3-38-9c-7.5,4.2-8.3,12.7-7.1,18.4c2.1,9.8,12.1,17.1,18.6,22.2c20.8,16.4,63.5,22.3,95.3,15.9c14.7-2.9,37.3-16.5,46.2-31.6C361.4,241.7,348.5,219.3,321.4,226z"]];

const name = [["snotty", "puny", "dexterous", "spiteful", "milksop", "drunk", "stupid", "modest", "pimply", "cross-eyed"], ["elf", "dwarf", "goblin", "troll", "orc", "golem", "gnome", "ogre", "unicorn", "griffin"], ["Vova", "James", "Sharikov", "Jacob", "William", "Zhorik", "Michael", "Alexander", "Kuzya", "Daniel"]];

document.getElementById("monsterName").textContent = name[0][randomNumber(9)] + " " + name[1][randomNumber(9)] + " " + name[2][randomNumber(9)];
document.getElementById("playerName").textContent = "player";

//generate and store random number
function randomNumber(max) { return Math.round(Math.random() * max); }
let randomEyes = randomNumber(3), randomMouth = randomNumber(3), randomTorso = randomNumber(3);

//create SVG element
let svgContainer = d3.select("#monster").attr("width", 530).attr("height", 420);
let svgContainer2 = d3.select("#player").attr("width", 530).attr("height", 420);

//draw monster's legs
svgContainer.append("path").attr("id","legs").attr("class","redStrokeNoFill").attr("d", legs);
svgContainer2.append("path").attr("id","legs2").attr("class","greenStrokeNoFill").attr("d", legs);

//draw monster's torso
switch (randomTorso) {
	case 3:
	svgContainer.append("path").attr("id","torso").attr("class","salmonFillNoStroke").attr("d", torso[randomTorso].slice(58,59));
	svgContainer.append("path").attr("id","torsoHair").attr("class","redStrokeNoFill").attr("d", torso[randomTorso].slice(0,58));
	break;
	default:
	svgContainer.append("path").attr("id","torso").attr("class","redStrokeSalmonBackground").attr("d", torso[randomTorso]);
}
svgContainer2.append("path").attr("id","torso2").attr("class","greenStrokeGreenBackground").attr("d", torso[2]);

//draw monster's hands
svgContainer.append("path").attr("id","hands").attr("class","redStrokeNoFill").attr("d", hands[randomNumber(3)]);
svgContainer2.append("path").attr("id","hands2").attr("class","greenStrokeNoFill").attr("d", hands[0]);

//draw monster's mouth
switch (randomMouth) {
	case 0:
	svgContainer.append("path").attr("id","teeth").attr("class","redStrokeWhiteBackground").attr("d", mouth[randomMouth].slice(0,2));
	svgContainer.append("path").attr("id","mouth").attr("class","redStrokeNoFill").attr("d", mouth[randomMouth].slice(2,5));
	break;
	case 3:
	svgContainer.append("path").attr("id","teeth").attr("class","redStrokeWhiteBackground").attr("d", mouth[randomMouth].slice(5,6));
	svgContainer.append("path").attr("id","mouth").attr("class","redStrokeNoFill").attr("d", mouth[randomMouth].slice(0,5));
	break;
	default:
	svgContainer.append("path").attr("id","mouth").attr("class","redStrokeNoFill").attr("d", mouth[randomMouth]);
}
svgContainer2.append("path").attr("id","mouth2").attr("class","greenStrokeNoFill").attr("d", mouth[2]);

//draw monster's eyes
switch (randomEyes) {
	case 1:
	svgContainer.append("path").attr("id","eyeballs").attr("class","redStrokeWhiteBackground").attr("d", eyes[randomEyes].slice(0,2));
	svgContainer.append("path").attr("id","pupilsAndNostrils").attr("class","redFillNoStroke").attr("d", eyes[randomEyes].slice(2,6));
	svgContainer.append("path").attr("id","eyeSticks").attr("class","redStrokeNoFill").attr("d", eyes[randomEyes].slice(6,8));
	break;
	case 2:
	svgContainer.append("path").attr("id","eyeballs").attr("class","redStrokeWhiteBackground").attr("d", eyes[randomEyes].slice(0,2));
	svgContainer.append("path").attr("id","pupilsAndNostrils").attr("class","redFillNoStroke").attr("d", eyes[randomEyes].slice(2,6));		
	break;
	case 3:
	svgContainer.append("path").attr("id","eyeballsOuter").attr("class","redStrokeSalmonBackground").attr("d", eyes[randomEyes].slice(0,2));
	svgContainer.append("path").attr("id","eyeballs").attr("class","redStrokeWhiteBackground").attr("d", eyes[randomEyes].slice(2,4));
	svgContainer.append("path").attr("id","pupilsAndNostrils").attr("class","redFillNoStroke").attr("d", eyes[randomEyes].slice(4,8));
	break;
	default:
	svgContainer.append("path").attr("id","eyeballs").attr("class","redStrokeWhiteBackground").attr("d", eyes[randomEyes].slice(0,2));
	svgContainer.append("path").attr("id","pupilsAndNostrils").attr("class","redFillNoStroke").attr("d", eyes[randomEyes].slice(2,6));
}
svgContainer2.append("path").attr("id","eyeballs2").attr("class","greenStrokeWhiteBackground").attr("d", eyes[2].slice(0,2));
svgContainer2.append("path").attr("id","pupilsAndNostrils2").attr("class","greenFillNoStroke").attr("d", eyes[2].slice(2,6));
//-------------------------Create Explosion Animation------------------------
const fireball = ["M72.2,75.7c-18.6-8.8-44.3-17-65.9-45.8c33.1,16.3,50.8,24.1,68,19.8c-4.9-2.2-16.6-8.7-22.3-16c5.9,2.3,15.9,3.7,25.6,3.4c8.7-0.3,15.5-2.9,22.8-7.1c14.4-8.4,30.1-13,46.9-11.4c34.3,3.3,63.7,39.7,50.7,72.4c-16.2,40.5-60.2,42.6-90.6,25.2c-4.7-2.7-10.1-7.8-16.3-9.6c-8.6-2.6-18.5-2-29.1-5.3C51.2,97.8,34.5,90,28.9,69.8c2.5,2.1,10.2,6,17.2,7.7C56,80,67.1,78.4,72.2,75.7z","M79.9,43.5c11.7,0,25.2-5.1,31.5-8.9c13-7.7,30.5-11,44.6-7.8c29,6.6,46.9,40,33.5,67.5c-12.1,25-45.4,29.5-69.3,18.8c-11-4.9-12.8-10.9-18-14.1c-3.3-2-13.9-2.2-18.9-2.8c-8-1-18.9-2.8-24.9-8.8c16.3,0.4,27.4-7.1,42.6-13.6c-6.6-2.2-26.6-2.1-48-18c25.8,5.1,34.9,2.5,55.5-4.7C108.6,51.1,84.4,48.2,79.9,43.5z","M85.2,90.6c6.5-5,19.8-9.3,29.5-6.2c7.3,2.4,12.3,9.6,20.3,9.8c7,0.1,14.4-4.9,10.1-12.2c-2.9-4.9-11.8-8.6-20.3-10.2c9.8-4.3,32.6-0.3,35.5-9.9c-0.8-14.3-29.6-20.6-39.5-19.1c5.1-5.7,17.2-8.2,24.6-7.6c9.7,0.8,18.1,4.1,26,9.7c16.8,12.1,21.8,31.2,9.7,48.8c-9.6,14.1-30.7,22.5-49.8,15.7c-8.6-3-14-11.9-21.7-16.6C103.6,89,94.6,89.7,85.2,90.6z"];

const explosion = ["M125.8,12.7l-11.6,36.9L81.3,18.6l7.3,40.1L60.5,37L76,68L34.4,54.8l34.8,32.9l-31.9,13.2l31.4,14.5L49.4,147l34.3-23.7l-0.5,21.1l14.5-19.1v23.1l11.1-15.2l7.3,22.4l10.2-19.1l25.6,19.7l-9.7-40.8l43,27.7l-25.6-44.8l47.9-7.3l-46.4-16.5l39.7-40.2l-50.3,23.1l16.9-37.5l-31.5,31.6L125.8,12.7L125.8,12.7zM124.8,19.9l10.6,37.5l25.6-27.7l-15.5,32.9l42.6-21.1l-33.4,35.5L196.4,89l-43,5.3l23.2,38.8l-39.7-22.4l11.1,40.2l-22.7-19.8l-9.7,15.8l-8.2-20.4L99.2,141l1-20.4l-15,17.1l0.5-19.7l-28.5,20.4l15.5-26.3L44,100.9L73.6,89l-32.4-29l39.7,11.9L65.3,43l26.1,22.4l-6.8-38.9l29.5,26.3C114.2,52.8,124.8,19.9,124.8,19.9z","M124.4,20L135,57.6l25.6-27.7l-15.5,32.9l42.5-21.1l-33.4,35.5L196,89.1l-43,5.3l23.2,38.8l-39.6-22.4l11.1,40.2l-22.7-19.8l-9.7,15.8l-8.2-20.4l-8.2,14.5l1-20.4l-15,17.1l0.5-19.7l-28.5,20.4l15.5-26.3L43.7,101l29.5-11.9l-32.4-29L80.4,72L65,43.1l26.1,22.4l-6.8-38.9l29.5,26.3L124.4,20z","M124.2,33.4l9.4,29.9l18.7-21l-13,27.3l35.3-18l-25.4,28.6l28.3,8l-31.2,3.1l16.4,29.4l-30.5-16.9l9.4,37l-19.1-16.6l-6.2,16.2l-8.6-24l-6.2,17.4l2.7-24l-16.7,19.3l0.9-18.2l-23.8,18.8l14.7-22.5l-27.8-6.2l29.8-10l-29.9-25l33.8,11.3l-12-24.4l22.9,20.1L89,35.3l27,26.1L124.2,33.4z","M79,40L43.8,3.3L48.2,0L79,40","M174.4,40.3l46.6-36.1l2.4,4.7L174.4,40.3","M178.6,108.3l48.5,22.9l1.7-3.3L178.6,108.3","M57.1,122.7L13.2,151l-1.4-4.2L57.1,122.7","M0.3,71L0,76.6l58.5,9.3L0.3,71","M130.6,142.3l2.4,27.2l3.6-2.9L130.6,142.3z"];

let svgContainer3 = d3.select("#explosion").attr("width", 1000).attr("height", 300);

svgContainer3.append("path")
.attr("class","fireball")
.attr("d", fireball[0])
.attr("transform", "translate(0 0) scale (0.4 0.4)")
.style("fill", "#e76709")
.style("opacity", 1);

svgContainer3.append("path")
.attr("class","fireball")
.attr("d", fireball[1])
.attr("transform", "translate(0 0) scale (0.4 0.4)")
.style("fill", "#f3a706")
.style("opacity", 1);

svgContainer3.append("path")
.attr("class","fireball")
.attr("d", fireball[2])
.attr("transform", "translate(0 0) scale (0.4 0.4)")
.style("fill", "#fcea01")
.style("opacity", 1);

d3.selectAll(".fireball")
.transition().duration(1500).ease("quad").attr("transform", "translate(720 65) scale (0.7 0.7)").transition().duration(100).style("opacity", 0);

svgContainer3.append("path")
.attr("class","explosion")
.attr("d", explosion[0])
.attr("transform", "translate(720 65) scale (0.2 0.2)")
.style("fill", "#2F4F4F")
.style("opacity", 0);

svgContainer3.append("path")
.attr("class","explosion")
.attr("d", explosion[1])
.attr("transform", "translate(720 65) scale (0.2 0.2)")
.style("fill", "#e76709")
.style("opacity", 0);

svgContainer3.append("path")
.attr("class","explosion")
.attr("d", explosion[2])
.attr("transform", "translate(720 65) scale (0.2 0.2)")
.style("fill", "#fcea01")
.style("opacity", 0);

svgContainer3.append("path")
.attr("class","explosion")
.attr("d", explosion.slice(3,10))
.attr("transform", "translate(720 65) scale (0.2 0.2)")
.style("fill", "#2F4F4F")
.style("opacity", 0);

d3.selectAll(".explosion")
.transition().delay(1000).duration(500).attr("transform", "translate(660 10) scale(1.6 1.6)").transition().duration(300).style("opacity", 1).transition().duration(300).ease("quad").style("opacity", 0);
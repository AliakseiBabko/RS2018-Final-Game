//const isEqual = document.getElementById('isEqual');
const displaySumOfBlues = document.getElementById('displaySumOfBlues');
const displaySumOfReds = document.getElementById('displaySumOfReds');
const more = '&#62;';
const less = '&#60;';
const equal = '&#61;';
let HEIGHT = window.innerHeight, WIDTH = window.innerWidth, starNumber = 150;

// define dataset in JSON format
let randomValue = Math.round(Math.random()*(120-2)+2);
dataset = [
  { x: 100, y: 50, value: 1, movable: 'yes', group: 'none' },
  { x: 200, y: 50, value: 3, movable: 'yes', group: 'none' },
  { x: 300, y: 50, value: 9, movable: 'yes', group: 'none' },
  { x: 400, y: 50, value: 27, movable: 'yes', group: 'none' },
	{ x: 500, y: 50, value: 81, movable: 'yes', group: 'none' },
  { x: 100, y: 150, value: randomValue, movable: 'no', group: 'none' },
];

//draw starfield in the background
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

//define counters
let sumOfReds = randomValue;
let sumOfBlues = 0;

// define drag behavior
const drag = d3.behavior.drag()
  .origin(Object)
  .on('drag', function(d) {
    d.x = d3.event.x;
    d.y = d3.event.y;
    draw();
  });

// create SVG background
const svg = d3.select('#playingField')
  .append('svg')
  .attr('width', 700)
  .attr('height', 400);
	
svg.append('rect')
      .attr('x', 40)
      .attr('y', 150)
      .attr('width', 275)
      .attr('height', 250)
			.attr('fill', 'none')
			.attr('stroke', 'grey')
			.attr('stroke-width', 1);
			
svg.append('rect')
      .attr('x', 380)
      .attr('y', 150)
      .attr('width', 275)
      .attr('height', 250)
			.attr('fill', 'none')
			.attr('stroke', 'grey')
			.attr('stroke-width', 1);
	
// create draw function
function draw() {  
  const g = svg.selectAll('g')
    .data(dataset);
  
  gEnter = g
    .enter()
    .append('g')
    .call(drag);

  g.attr('transform', (d) => move(d) )
	  .attr('fill', (d) => assignColor(d) );
	
  gEnter.append('circle')			
    .style("filter", "url(#dropShadow)")
	  .attr('r', 30);
		
  gEnter.append('text')
		.text((d) => d.value)		
    .attr('x', (d) => checkNumberLength(d.value) )
    .attr('y', 9)
		.style('font-size', '26px')
    .style('fill', 'white');
}

//make only particular elements movable
function move(d) {
		if (d.movable === 'yes') { return 'translate(' + d.x + ' ,' + d.y + ')'; }
		return 'translate(600,350)';
}

//assigh color based on position
function assignColor(d) {
		if (d.group === 'green') { return 'green';}
		if (d.x > 410 && d.y > 180 || d.movable === 'no') { d.group = 'red'; displayValues(d); return 'red'; }
		if (d.x > 70 && d.x < 285 && d.y > 180) { d.group = 'blue'; displayValues(d); return 'blue'; }
		d.group = 'none';
		return 'grey';
}

//check number length to place it in the center
function checkNumberLength(number) {
	 if (number > 99) { return -21; }
	 if (number > 9) { return -14; }
	 return -7;
}

function displayValues (d) {

		sumOfReds = d3.values(dataset).filter((d) => d.group === 'red').map((d) => d.value).reduce((a,c) => a + c);
		
		if (d3.values(dataset).filter((d) => d.group === 'blue').length) {
				sumOfBlues = d3.values(dataset).filter((d) => d.group === 'blue').map((d) => d.value).reduce((a,c) => a + c);} else { sumOfBlues = 0; }
				
		if (sumOfBlues > sumOfReds) {
				isEqual.innerHTML = more;
		}
		if (sumOfBlues < sumOfReds) {
				isEqual.innerHTML = less;
		}
		if (sumOfBlues === sumOfReds) {
				isEqual.innerHTML = equal;
				d3.values(dataset).filter((d) => d.group === 'blue' || d.group === 'red').forEach((d) => d.group = 'green');
				draw();
				setTimeout(function() {alert('You win! Dood job!');}, 500);
		}
		
		displaySumOfBlues.textContent = 'SUM: '+ sumOfBlues;
		displaySumOfReds.textContent = 'SUM: '+ sumOfReds;
}

//drop shadow filter
const filter = svg.append("filter")
    .attr("id", "dropShadow")
    .attr("height", "130%")		
    .attr("width", "130%");		

filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 4)
    .attr("result", "blur");

filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 2)
    .attr("dy", 4)
    .attr("result", "offsetBlur");

const feMerge = filter.append("feMerge");
feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

// run draw function firsthand
draw();

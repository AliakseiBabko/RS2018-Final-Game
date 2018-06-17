import './css/index2.css';
import _ from 'lodash';

const dragdrop = require('./json/dragdrop.json');
const dragdrop_keys = _.keys(dragdrop);
const e = document.querySelector('#e');

let random = Math.floor(Math.random()*_.size(dragdrop));
let thisword = dragdrop_keys[random]
const arr = _.shuffle(thisword);
arr.unshift('');

const a1 = '<span draggable="true" ondragstart="drag(event)" id="drag1"  width="88" height="31">' + arr[1] +'</span>';
const b2 = '<span draggable="true" ondragstart="drag(event)" id="drag2" width="88" height="31">' + arr[2] +'</span>';
const c3 = '<span draggable="true" ondragstart="drag(event)" id="drag3"  width="88" height="31">' + arr[3] +'</span>';
const d4 = '<span draggable="true" ondragstart="drag(event)" id="drag4" width="88" height="31">' + arr[4] +'</span>';
const e5 = '<span draggable="true" ondragstart="drag(event)" id="drag5"  width="88" height="31">' + arr[5] +'</span>';
const f6 = '<span draggable="true" ondragstart="drag(event)" id="drag6" width="88" height="31">' + arr[6] +'</span>';
const g7 = '<span draggable="true" ondragstart="drag(event)" id="drag7"  width="88" height="31">' + arr[7] +'</span>';
const h8 = '<span draggable="true" ondragstart="drag(event)" id="drag8" width="88" height="31">' + arr[8] +'</span>';
const i9 = '<span draggable="true" ondragstart="drag(event)" id="drag9"  width="88" height="31">' + arr[9] +'</span>';
const j10 = '<span draggable="true" ondragstart="drag(event)" id="drag10" width="88" height="31">' + arr[10] +'</span>';
const k11 = '<span draggable="true" ondragstart="drag(event)" id="drag11"  width="88" height="31">' + arr[11] +'</span>';
const l12 = '<span draggable="true" ondragstart="drag(event)" id="drag12" width="88" height="31">' + arr[12] +'</span>';
const m13 = '<span draggable="true" ondragstart="drag(event)" id="drag13"  width="88" height="31">' + arr[13] +'</span>';
const n14 = '<span draggable="true" ondragstart="drag(event)" id="drag14" width="88" height="31">' + arr[14] +'</span>';
const o15 = '<span draggable="true" ondragstart="drag(event)" id="drag15"  width="88" height="31">' + arr[15] +'</span>';

const nodes_array = [a1,b2,c3,d4,e5,f6,g7,h8,i9,j10,k11,l12,m13,n14,o15];

const dropped = document.querySelector('#dropped');
const toclone = document.querySelector('#toclone');

for (let i = 0; i < arr.length-1; i++) {
	dropped.appendChild(toclone.cloneNode(true));
}

const dropped_items = Array.from(dropped.children);

for (let i = 0; i < arr.length-1; i++) {
_.slice(dropped_items, 1, arr.length)[i].innerHTML = nodes_array[i];
}

const button = document.querySelector('#button');

button.addEventListener('click', () => {
	let total = '';
	for (let i = 0; i < arr.length; i++) {
		total += dropped_items[i].textContent;
	}
	if (_.trim(total) == thisword) {
		e.textContent = 'CORRECT!';
		e.style.color = 'green';
		e.style.fontSize = '40px';
	} else {
		e.textContent = 'WRONG! The correct answer is ' + thisword;
		e.style.color = 'red';
		e.style.fontSize = '25px';
	}
});



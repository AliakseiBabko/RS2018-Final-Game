//import avg from './some.js';
//console.log(avg(1333, 244, 28));

import _ from 'lodash';
import './css/index.css';

const a = document.querySelector('#a');
const b = document.querySelector('#b');
const c = document.querySelector('#c');

let signs = ['-', '*', '+', '/']; 
let aa = Math.floor(Math.random() * 100);
let bb = signs[Math.floor(Math.random() * 4)];
let cc = Math.floor(Math.random() * 100);


function find_cc() {
	if (bb === '/' && aa % cc !== 0) {
		cc = Math.floor(Math.random() * 100);
		find_cc();
		if (localStorage.correctAnswer){
		localStorage.removeItem('correctAnswer');
		localStorage.correctAnswer = _.divide(aa, cc);
		}
	}
	else if (bb === "*") {
		cc = Math.floor(Math.random() * 16);
		if (localStorage.correctAnswer){
		localStorage.removeItem('correctAnswer');
		localStorage.correctAnswer = _.multiply(aa, cc);
		}
	}
	else if (bb === '-') {
		if (localStorage.correctAnswer){
		localStorage.removeItem('correctAnswer');
		localStorage.correctAnswer = _.subtract(aa, cc);
		}
	}
	else if (bb === '+') {
		if (localStorage.correctAnswer){
		localStorage.removeItem('correctAnswer');
		localStorage.correctAnswer = _.add(aa, cc);
		}
	}
}
find_cc();

a.textContent = aa;
b.textContent = bb;
c.textContent = cc;

const answer = document.querySelector('#answer');
const confirmation = document.querySelector('#confirmation');

confirmation.addEventListener('click', () => {
	localStorage.answer = answer.value;
	if (Number(localStorage.answer) === Number(localStorage.correctAnswer)) {
		answer.style.backgroundColor = "yellow";
		e.textContent = 'CORRECT!';
		e.style.color = 'green';
		e.style.fontSize = '40px';
	} else {
		e.textContent = 'WRONG! The correct answer is ' + localStorage.correctAnswer;
		e.style.color = 'red';
		e.style.fontSize = '25px';
	}
});

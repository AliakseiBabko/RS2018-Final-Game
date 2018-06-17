import './css/index.css';
import _ from 'lodash';

const jjson = require('./json/dictionary.json');
const invert_jjson = _.invert(jjson);
const dict_keys = _.keys(jjson);
const d = document.querySelector('#d');
const e = document.querySelector('#e');

let var_key = dict_keys[Math.floor(Math.random() * _.size(jjson))];

d.textContent = invert_jjson[jjson[var_key]];

const answer = document.querySelector('#answer');
const confirmation = document.querySelector('#confirmation');

localStorage.removeItem('answer');

confirmation.addEventListener('click', () => {
	localStorage.answer = answer.value;
	let check = 0;
	if (localStorage.answer === jjson[var_key]) {
		answer.style.backgroundColor = "yellow"; 
		check += 1;
	} else {
		for (let i = 0; i < _.size(jjson); i++) {
			if (localStorage.answer === jjson[var_key][i]) {
				answer.style.backgroundColor = "yellow"; 
				check += 1;
			} 
		}
	}
	if (check == 1) {
		e.textContent = 'CORRECT!';
		e.style.color = 'green';
		e.style.fontSize = '40px';
		
	} else {
		e.textContent = 'WRONG! The correct answer is ' + jjson[var_key];
		e.style.color = 'red';
		e.style.fontSize = '25px';
	}
});



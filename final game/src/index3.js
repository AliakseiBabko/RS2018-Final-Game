import './css/index.css';
import _ from 'lodash';

const ajson = require('./json/foraudio.json');
const dict_keys = _.keys(ajson);
const block_d = document.querySelector('#d');
const block_e = document.querySelector('#e');
const var_key = dict_keys[Math.floor(Math.random() * _.size(ajson))];
const answer = document.querySelector('#answer');
const confirmation = document.querySelector('#confirmation');
const speaker = document.querySelector('#speak');
const speaks = [
	{
		'name': 'Zuzana',
		'lang': 'en-US'
	}
];

speaker.addEventListener('click', () => {
	const speech = new SpeechSynthesisUtterance();
	speech.rate = 1;
	speech.pitch = 1;
	speech.volume = 1;
	speech.text =  var_key; 

	const voice = speaks[0];
	speech.voiceURI = voice.name;
	speech.lang = voice.lang;
	speechSynthesis.speak(speech);
});

localStorage.removeItem('answer');
confirmation.addEventListener('click', () => {
	localStorage.answer = answer.value;
	let check = 0;
	if (localStorage.answer === ajson[var_key]) {
		answer.style.backgroundColor = "yellow"; 
		check += 1;
	} else {
		for (let i = 0; i < _.size(ajson); i++) {
			if (localStorage.answer === ajson[var_key][i]) {
				answer.style.backgroundColor = "yellow"; 
				check += 1;
			} 
		}
	}
	if (check == 1) {
		block_e.textContent = 'CORRECT!';
		block_e.style.color = 'green';
		block_e.style.fontSize = '40px';	
	} else {
		block_e.textContent = 'WRONG! The correct answer is ' + ajson[var_key];
		block_e.style.color = 'red';
		block_e.style.fontSize = '25px';
	}
});


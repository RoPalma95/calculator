const display = document.querySelector('.display');
const numbers = [...document.querySelectorAll('.number')];
const point = document.querySelector('.float-point');
const operators = [...document.querySelectorAll('.operator')];
const clear = document.querySelector('.clear');
const del = document.querySelector('.backspace');
const equals = document.querySelector('.equals');
let operator = '';
let a = 0;
let b = 0;
let pointAvailable = true;
let tracker = 1;

display.textContent = 0;

numbers.forEach(number => number.addEventListener('click', writeNumber));
point.addEventListener('click', writeFloat);
operators.forEach(operator => operator.addEventListener('click', getOperator));
clear.addEventListener('click', clearVariables);
del.addEventListener('click', deleteNumber);
equals.addEventListener('click', makeCalc);

function writeNumber(e) {
	if(!tracker){
		display.textContent += e.target.textContent;
	} else {
		display.textContent = '';
		display.textContent += e.target.textContent;
		tracker = 0;
	}
}

function writeFloat(e) {
	if(!tracker) {
		display.textContent += e.target.textContent; 
	} else {
		display.textContent = 0;
		display.textContent += e.target.textContent;
		tracker = 0;
	}
	deactivateFloatPoint();
}

function deleteNumber() {
	let dispContent = display.textContent.split('');
	dispContent.pop();
	display.textContent = dispContent.join('');
}

function activateFloatPoint() {
	pointAvailable = true;
	point.addEventListener('click', writeFloat);
}

function deactivateFloatPoint() {
	pointAvailable = false;
	point.removeEventListener('click', writeFloat);
}

function getNumber() {
	return +display.textContent;
}

function getOperator(e) {
	if(a) {
		b = getNumber();
		a = operate(operator, a, b);
		display.textContent = a;
		operator = e.target.textContent;
	} else {
		a = getNumber();
		operator = e.target.textContent;
	}
	if(!pointAvailable)	activateFloatPoint();
	tracker += 1; 
}

function clearVariables() {
	display.textContent = 0;
	a = 0;
	b = 0;
	if(!pointAvailable)	activateFloatPoint();
	tracker += 1;
}

function makeCalc() {
	b = getNumber();
	display.textContent = operate(operator, a, b);
	a = 0;
	b = 0;
	if(!pointAvailable)	activateFloatPoint();
	tracker += 1;
}

const operations = {
	'+': function(a, b) {  //addition
		return a + b;
		},
	'‐': function (a , b) { //subtraction
		return a - b;
		},
	'⨯': function (a, b) {  //multiplication
		return a * b;
		},
	'÷': function (a, b) {  //divition
		if(b === 0) {
			clearVariables();
			return 'REALITY BROKEN';
		}
		return a / b;
	},
};

function operate(operator, a, b) {
	return operations[operator](a, b);
}


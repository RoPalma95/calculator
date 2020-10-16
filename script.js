const display = document.querySelector('.display');
const numbers = [...document.querySelectorAll('.number')];
const point = document.querySelector('.float-point');
const operators = [...document.querySelectorAll('.operator')];
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');
let operator = '';
let a = 0;
let b = 0;
let tracker = 1;

display.textContent = 0;

numbers.forEach(number => number.addEventListener('click', writeNumber));
point.addEventListener('click', writeFloat);
operators.forEach(operator => operator.addEventListener('click', getOperator))
clear.addEventListener('click', clearVariables)
equals.addEventListener('click', makeCalc)

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
	display.textContent += e.target.textContent;
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
	tracker += 1; 
}

function clearVariables() {
	display.textContent = 0;
	a = 0;
	b = 0;
	tracker += 1;
}

function makeCalc() {
	b = getNumber();
	display.textContent = operate(operator, a, b);
	a = 0;
	b = 0;
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


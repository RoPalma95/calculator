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
let tracker = true;

display.textContent = 0;

//**** mouse functionality ****
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
		tracker = false;
	}
}

function writeFloat(e) {
	if(!tracker) {
		display.textContent += e.target.textContent; 
	} else {
		display.textContent = 0;
		display.textContent += e.target.textContent;
		tracker = false;
	}
	deactivateFloatPoint();
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
	tracker = true; 
}

function makeCalc() {
	b = getNumber();
	display.textContent = operate(operator, a, b);
	a = 0;
	b = 0;
	if(!pointAvailable)	activateFloatPoint();
	tracker = true;
}

//**** keyboard functionality **** (needs adjustments)
document.addEventListener('keydown', typeNumber);
document.addEventListener('keydown', typeOperator);
document.addEventListener('keydown', typeFloat);
document.addEventListener('keydown', keyboardClear);
document.addEventListener('keydown', keyboardCalc);
document.addEventListener('keydown', backspace);

function typeNumber(e) {
	if(!isNaN(e.key)) {
		if(!tracker){
			display.textContent += e.key;
		} else {
			display.textContent = '';
			display.textContent += e.key;
			tracker = false;
		}
	}
}

function typeOperator(e) {
	if(e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/'){
		if(a) {
			b = getNumber();
			a = operate(operator, a, b);
			display.textContent = a;
			operator = e.key;
		} else {
			a = getNumber();
			operator = e.key;
		}
		if(!pointAvailable)	activateFloatPoint();
		tracker = true;
	} 
}

function typeFloat(e) {
	if(e.key == '.') {
		if(!tracker) {
			display.textContent += e.key; 
		} else {
			display.textContent = 0;
			display.textContent += e.key;
			tracker = false;
		}
		deactivateFloatPoint();
	}
}

function keyboardClear(e) {
	if(e.key == 'Escape') clearVariables();
}

function keyboardCalc(e) {
	if(e.key == 'Enter') makeCalc();
}

function backspace(e) {
	if(e.key == 'Backspace') deleteNumber();
}

//**** misc functions ****
function getNumber() {
	return +display.textContent;
}

function clearVariables() {
	display.textContent = 0;
	a = 0;
	b = 0;
	if(!pointAvailable)	activateFloatPoint();
	tracker = 1;
}

function deleteNumber() {
	let dispContent = display.textContent.split('');
	dispContent.pop();
	display.textContent = dispContent.join('');
}

function activateFloatPoint() {
	pointAvailable = true;
	point.addEventListener('click', writeFloat);
	document.addEventListener('keydown', typeFloat);
}

function deactivateFloatPoint() {
	pointAvailable = false;
	point.removeEventListener('click', writeFloat);
	document.removeEventListener('keydown', typeFloat);
}

const operations = {
	'+': function(a, b) {  //addition
		return a + b;
	},
	'‐': function (a , b) { //subtraction
		return a - b;
	},
	'-': function (a , b) { //subtraction
		return a - b;
	},
	'⨯': function (a, b) {  //multiplication
		return a * b;
	},
	'*': function (a, b) {  //multiplication
		return a * b;
	},
	'÷': function (a, b) {  //divition
		if(b === 0) {
			clearVariables();
			return 'REALITY BROKEN';
		}
		return a / b;
	},
	'/': function (a, b) {  //divition
		if(b === 0) {
			clearVariables();
			return 'REALITY BROKEN';
		}
		return a / b;
	},
};

function operate(operator, a, b) {
	return Math.round(operations[operator](a, b) * 100000) / 100000;  //rounded to 5 decimal places
}


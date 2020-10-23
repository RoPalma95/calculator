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

//**** keyboard functionality **** may need optimization
document.addEventListener('keydown', keybordFunctionality)


function keybordFunctionality(e) {
	if(!isNaN(e.key)) {			// type numbers
		if(!tracker){
			display.textContent += e.key;
		} else {
			display.textContent = '';
			display.textContent += e.key;
			tracker = false;
		}
	} else if(e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/'){		// type and capture operators
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
	} else if(e.key == '.' && pointAvailable) {		// type and activate/deactivate floating point
		if(!tracker) {
			display.textContent += e.key; 
		} else {
			display.textContent = 0;
			display.textContent += e.key;
			tracker = false;
		}
		deactivateFloatPoint();
	} else if(e.key == 'Escape') clearVariables();		// clear with Escape
	else if(e.key == 'Enter') makeCalc();		// make calculation with Enter
	else if(e.key == 'Backspace') deleteNumber();		// backspace
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
	tracker = true;
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
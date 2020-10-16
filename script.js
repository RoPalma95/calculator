const display = document.querySelector('.display');
const numbers = [...document.querySelectorAll('.number')];
const operators = [...document.querySelectorAll('.operator')];
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');
let operator = '';
let a = 0;
let b = 0;

numbers.forEach(number => number.addEventListener('click', writeNumber));
operators.forEach(operator => operator.addEventListener('click', writeOperator))
clear.addEventListener('click', clearDisp)
equals.addEventListener('click', makeCalc)

function writeNumber(e) {
	display.textContent += e.target.textContent;
}

function getNumber() {
	return +display.textContent;
}

function writeOperator(e) {
	a = getNumber();
	clearDisp();
	operator = e.target.textContent;
}

function clearDisp() {
	display.textContent = '';
}

function makeCalc() {
	b = getNumber();
	clearDisp();

	// console.log(a,b,operator);
	let result = operate(operator, a, b);
	display.textContent = result;
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
		return a / b;
	},
};

function operate(operator, a, b) {
	return operations[operator](a, b);
}


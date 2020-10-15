let operations = {
	'+': function(a, b) {  //addition
		return a + b;
		},
	'-': function (a , b) { //subtraction
		return a - b;
		},
	'*': function (a, b) {  //multiplication
		return a * b;
		},
	'/': function (a, b) {  //divition
		return a / b;
	},
};

function operate(operator, a, b) {
	return operations[operator](a, b);
}


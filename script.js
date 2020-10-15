let operations = {
	'+': function(a, b) {
		return a + b;
		},
	'-': function (a , b) {
		return a - b;
		},
	'*': function (a, b) {
		return a * b;
		},
	'/': function (a, b) {
		return a / b;
	},
};

function operate(operator, a, b) {
	return operations[operator](a, b);
}


var code, stack, position;
var output, variables, funcpos;
var temppos, exitcondition
var ifstage, testval, test
var functions;
var funccode;

function check() {
	currChar = code[position];
	if (currChar == "P") {
		output += stack[stack.length-1];
		position += 1
	} else if (".0123456789".indexOf(currChar) !== -1) {
		try {
			n = "";
			while ("0123456789.".indexOf(code[position]) !== -1) {
				n += code[position];
				position += 1;
			}
			stack.push(Number(n));
		} catch(e) {
			stack.push(Number(n));
		}
	} else if (currChar == " ") {
		position += 1;
	} else if (currChar == "+") {
		A = stack.pop();
		B = stack.pop();
		stack.push(B+A);
		position += 1;
	} else if (currChar == "-") {
		A = stack.pop();
		B = stack.pop();
		stack.push(B-A);
		position += 1;
	} else if (currChar == "*") {
		A = stack.pop();
		B = stack.pop();
		stack.push(B+A);
		position += 1;
	} else if (currChar == "/") {
		A = stack.pop();
		B = stack.pop();
		stack.push(B/A);
		position += 1;
	} else if (currChar == "^") {
		A = stack.pop();
		B = stack.pop();
		stack.push(Math.pow(B,A));
		position += 1;
	} else if (currChar == "=") {
		A = stack.pop();
		B = stack.pop();
		if (A==B) {
			stack.push(1);
		} else {
			stack.push(0);
		}
		position += 1
	} else if (currChar == ">") {
		A = stack.pop();
		B = stack.pop();
		if (B>A) {
			stack.push(1);
		} else {
			stack.push(0);
		}
		position += 1
	} else if (currChar == "<") {
		A = stack.pop();
		B = stack.pop();
		if (B<A) {
			stack.push(1);
		} else {
			stack.push(0);
		}
		position += 1
	} else if (currChar == "&") {
		A = stack.pop();
		B = stack.pop();
		stack.push(B&&A)
		position += 1
	} else if (currChar == "|") {
		A = stack.pop();
		B = stack.pop();
		stack.push(A||B);
		position += 1
	} else if (currChar == '"') {
		string = "";
		position += 1;
		while (code[position] != '"') {
			string += code[position];
			position += 1
		}
		stack.push(string);
		position += 1;
	} else if (currChar == "~") {
		if ("(){}+-naod@;|r~*/%I<>=^vLP_`&.$".indexOf(code[position+1]) === -1) {
			variables[code[position+1]] = stack[stack.length-1];
			position += 2;
		} else {
			// raise Name Error
			document.getElementById("output").style.color = "red";
			output = "Name Error: " + code[position+1] + " at position " + (position+1) + " is a reserved keyword";
			position = code.length * 2;
		}
	} else if (code[position] == "I") {
		stdin = eval(input.shift());
		stack.push(stdin);
		
		position += 1
	} else if (currChar == "(") {
		exitcondition.push(stack.pop());
		temppos.push(position + 1);
		position += 1;
	} else if (currChar == ")") {
		if (stack[stack.length-1] == exitcondition[exitcondition.length-1]) {
			position += 1;
			exitcondition.pop();
			temppos.pop();
		} else {
			position = temppos[temppos.length-1];
		}
	} else if (currChar == "{") {
		if (ifstage == 1) {
			position += 1;
		} else if (ifstage == 2) {
			if (!test) {
				try {
					while (code[position] != "}") {
						position += 1;
					}
					ifstage = 3
				} catch(e) {
					// Do nothing
				}
			} else {
				position += 1;
			}
		} else if (ifstage == 3) {
			position += 1
		}
		
	} else if (currChar == "}") {
		if (ifstage == 1) {
			ifstage = 2
			if (stack.pop() == 1) {
				test = true;
			} else {
				test = false;
			}
			position += 1;
		} else if (ifstage == 2) {
			ifstage = 1;
			test = true;
			position += 1;
			if (code[position] == "{") {
				while (code[position] != "}") {
					position += 1;
				}
			}
			position += 1;
		} else if (ifstage == 3) {
			ifstage = 1;
			test = true;
			position += 1;			
		}
	} else if (currChar == "£") {
		stack.pop();
		position += 1;
	} else if (currChar == "%") {
		stack.unshift(stack.pop());
		position += 1;
	} else {
		if (variables.hasOwnProperty(code[position])) {
			stack.push(variables[code[position]]);
			position += 1;
		} else {
			variables[code[position]] = 0;
			stack.push(0);
			position += 1;
		}
	}
	document.getElementById("output").value = output;
	return position;
}

function runCode() {
	while(position < code.length){
		position = check();
	}
	console.log(position);
}

function interpreter() {
	code = document.getElementById("code").value;
	position = 0;
	stack = [];
	variables = {};
	exitcondition = [];
	temppos = [];
	output = "";
	
	ifstage = 1;

	input = document.getElementById("input").value.split("\n");

	document.getElementById("output").value = output;
	document.getElementById("output").style.color = "black";
	
	functions = {};
	funcpos = [];
	funccode = [];
	
	runCode();
	
	document.getElementById("output").value = output;
}	
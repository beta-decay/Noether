var code, stack, position;
var output, variables, funcpos;
var temppos, exitcondition, delaypos;
var ifstage, testval, test;
var functions;
var funccode;

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

function check() {
	currChar = code[position];
	if (currChar == "P") {
		output += stack[stack.length-1];
		position += 1
	} else if (".0123456789N".indexOf(currChar) !== -1) {
		try {
			n = "";
			while ("0123456789.N".indexOf(code[position]) !== -1) {
				if (code[position] == "N") {
					n += "-";
				} else {
					n += code[position];
				}
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

		if (typeof B == "string" && typeof A != "string") {
			stack.push(B.slice(0, A) + B.slice(A+1, B.length));
		} else if (typeof B == "string" && typeof A == "string") {
			var regex = new RegExp(A,'g');
			stack.push(B.replace(regex,''));
		} else {
			stack.push(B-A);
		}

		position += 1;
	} else if (currChar == "*") {
		A = stack.pop();
		B = stack.pop();
		if (typeof B == "string") {
			stack.push(B.repeat(A));
		} else {
			stack.push(B*A);
		}
		position += 1;
	} else if (currChar == "/") {
		A = stack.pop();
		B = stack.pop();
		
		if (typeof B == "string" && typeof A != "string") {
			stack.push(B[A]);
		} else if (typeof B == "string" && typeof A == "string") {
			if (B.indexOf(A) === -1) {
				stack.push(0);
			} else {
				stack.push(1);
			}
		} else {
			stack.push(B/A);
		}

		position += 1;
	} else if (currChar == "^") {
		A = stack.pop();
		B = stack.pop();
		if (typeof B == "string" && typeof A == "string") {
			x = B.split(A);
			for (var i = 0; i < x.length; i++) {
				stack.push(x[i]);
			}
		} else {
			stack.push(Math.pow(B,A));
		}
		
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
		if ("(){}+-*/^=><&|\"~ _@;#%$!?ABDILNPRSTUW".indexOf(code[position+1]) === -1) {
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
	} else if (currChar == "_") {
		A = stack.pop();
		if (typeof A == "string") {
			stack.push(A.toLowerCase());
		} else {
			stack.push(Math.floor(A));
		}

		position += 1;
	} else if (currChar == "U") {
		A = stack.pop();
		if (typeof A == "string") {
			stack.push(A.toUpperCase());
		} else {
			stack.push(Math.ceil(A));
		}

		position += 1;
	} else if (currChar == "R") {
		A = stack.pop();
		if (typeof A == "string") {
			stack.push(A.shuffle());
		} else {
			stack.push(Math.floor(Math.random()*A+0.5));
		}

		position += 1;
	} else if (currChar == "B") {
		A = stack.pop()
		if (typeof A == "string") {
			stack.push(A.charCodeAt(0));
		} else {
			stack.push(String.fromCharCode(A));
		}
		position += 1;
	} else if (currChar == "@") {
		output = '';
		position += 1;
	} else if (currChar == ";") {
		A = stack.pop();
		if (typeof A != "string") {
			var delaypos = position+1;
			setTimeout(function(){position = delaypos;runCode();}, delay*1000);
			return code.length*2;
		} else {
			stack.push(A);
		}
		position += 1;
	} else if (currChar == "D") {
		A = stack.pop();
		if (typeof A != 'string') {
			var date = new Date();
			if (A === 0) {
				num = date.getSeconds();
			} else if (A == 1) {
				num = date.getMinutes();
			} else if (A == 2) {
				num = date.getHours();
			} else if (A == 3) {
				num = date.getDate();
			} else if (A == 4) {
				num = date.getMonth();
			} else if (A == 5) {
				num = date.getFullYear();
			} else if (A == 6) {
				num = date.toISOString();
			} else {
				num = date.getTime();
			}
			stack.push(num);
		}
		position += 1;
	} else if (currChar == "S") {
		A = stack.pop();
		B = stack.pop();
		C = stack.pop();

		if (typeof C == "string" && typeof B != "string" && typeof A != "string") {
			stack.push(C.slice(B,A));
		} else {
			stack.push(C);
			stack.push(B);
			stack.push(A);
		}

		position += 1;
	} else if (currChar == "L") {
		A = stack.pop();

		if (typeof A == "string") {
			stack.push(A.length);
		} else {
			stack.push(Math.log10(A));
		}

		position += 1;
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
			if (code[position+1] == "{") {
				position += 1;
				while (code[position] != "}") {
					position += 1;
				}
			}
			ifstage = 1;
			test = true;
			position += 1;
		} else if (ifstage == 3) {
			ifstage = 1;
			test = true;
			position += 1;			
		}
	} else if (currChar == "#") {
		stack.pop();
		position += 1;
	} else if (currChar == "%") {
		stack.unshift(stack.pop());
		position += 1;
	} else if (currChar == "T") {
		A = stack.pop();
		B = stack.pop();

		mode = A;
		n = 100000000;

		if (mode == 0 || mode == "sin") {
			stack.push(Math.round(Math.sin(B)*n)/n);
		} else if (mode == 1 || mode == "cos") {
			stack.push(Math.round(Math.cos(B)*n)/n);
		} else if (mode == 2 || mode == "tan") {
			stack.push(Math.round(Math.tan(B)*n)/n);
		} else if (mode == 3 || mode == "asin") {
			stack.push(Math.round(Math.asin(B)*n)/n);
		} else if (mode == 4 || mode == "acos") {
			stack.push(Math.round(Math.acos(B)*n)/n);
		} else if (mode == 5 || mode == "atan") {
			stack.push(Math.round(Math.atan(B)*n)/n);
		} else if (mode == 6 || mode == "DtoR") {
			stack.push(B*Math.PI/180);
		} else if (mode == 7 || mode == "RtoD") {
			stack.push(B*180/Math.PI);
		} else if (mode == 8 || mode == "pi") {
			stack.push(B);
			stack.push(Math.PI);
		} else if (mode == 9 || mode == "tau") {
			stack.push(B);
			stack.push(2*Math.PI);
		} else if (mode == 10 || mode == "abs") {
			stack.push(Math.abs(B));
		}

		position += 1;
	} else if (currChar == "W") {
		A = stack.pop();

		if (typeof A == "string") {
			stack.push(parseInt(A));
		} else {
			stack.push(A.toString());
		}

		position += 1;
	} else if (currChar == "A") {
		mode = stack.pop();

		if (mode == 0 || mode == "alpha") {
			stack.push("abcdefghijklmnopqrstuvwxyz");
		} else if (mode == 1 || mode == "ALPHA") {
			stack.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
		} else if (mode == 2 || mode == "nums") {
			stack.push("0123456789");
		} else if (mode == 3 || mode == "pi") {
			stack.push(Math.PI);
		} else if (mode == 4 || mode == "e") {
			stack.push(Math.E);
		}

		position += 1;
	} else if (currChar == "$") {
		stack = stack.reverse();
		
		position += 1;
   	} else if (currChar == "?") {
        	output += "\n";
        	position += 1;
    	} else if (currChar == "!") {
        	position += 1;
		if (variables.hasOwnProperty(code[position])) {
        		if (typeof variables[code[position]] != "string") {
            			variables[code[position]] += 1;
				stack.push(variables[code[position]]);
        		}
		} else {
			variables[code[position]] = 1;
			stack.push(variables[code[position]]);
		}
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

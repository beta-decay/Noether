import re, random, time, math, datetime, sys

def number(x):
    try:
        return int(x)
    except:
        return float(x)

def check():
    global code, stack, position, output, variables, funcpos, temppos, exitcondition, delaypos, ifstage, testval, test, functions, funccode
    
    currChar = code[position]
    if currChar == "P":
        output += str(stack[-1])
        position += 1
    elif currChar in ".0123456789N":
        try:
            n = ""
            while code[position] in "0123456789.N":
                if code[position] == "N":
                    n += "-"
                else:
                    n += code[position]
                
                position += 1
                
            stack.append(number(n))
        except:
            stack.append(number(n))
        
    elif currChar == " ":
        position += 1
    elif currChar == "+":
        A = stack.pop()
        B = stack.pop()
        stack.append(B+A)
        position += 1
    elif currChar == "-":
        A = stack.pop()
        B = stack.pop()

        if type(B) == str and type(A) != str:
            stack.append(B[0:A] + B[A+1:])
        elif type(B) == str and type(A) == str:
            stack.append(re.sub(regex,'',B))
        else:
             stack.append(B-A)

        position += 1
    elif currChar == "*":
        A = stack.pop()
        B = stack.pop()

        stack.append(B*A)
        
        position += 1
    elif currChar == "/":
        A = stack.pop()
        B = stack.pop()
        
        if type(B) == str and type(A) != str:
            stack.append(B[A])
        elif type(B) == str and type(A) == str:
            if not A in B:
                stack.append(0)
            else:
                stack.append(1)
            
        else:
            stack.append(B/A)
        
        position += 1
    elif currChar == "^":
        A = stack.pop()
        B = stack.pop()
        if type(B) == str and type(A) == str:
            x = B.split(A)
            for i in x:
                stack.append(i)
                
        else:
            stack.append(B**A)
        
        position += 1
    elif currChar == "=":
        A = stack.pop()
        B = stack.pop()
        
        if A == B:
            stack.append(1)
        else:
            stack.append(0)
        
        position += 1
    elif currChar == ">":
        A = stack.pop()
        B = stack.pop()
    
        if B>A:
            stack.append(1)
        else:
            stack.append(0)
        
        position += 1
    elif currChar == "<":
        A = stack.pop()
        B = stack.pop()
        
        if B<A:
            stack.append(1)
        else:
            stack.append(0)
        
        position += 1
    elif currChar == "&":
        A = stack.pop()
        B = stack.pop()

        stack.append(B and A)
        
        position += 1
    elif currChar == "|":
        A = stack.pop()
        B = stack.pop()
        stack.append(A or B)
        position += 1
    elif currChar == '"':
        string = ""
        position += 1
        
        while code[position] != '"':
            string += code[position]
            position += 1
        
        stack.append(string)
        position += 1
        
    elif currChar == "~":
        if not code[position+1] in "(){}+-*/^=><&|\"~ _@;#%$!?ABDILNPRSTUW":
            variables[code[position+1]] = stack[-1]
            position += 2
            
        else:
            # raise Name Error
            raise NameError(str(code[position+1]) + " at position " + str(position+1) + " is a reserved keyword")
            position = len(code) * 2
        
    elif code[position] == "I":
        stdin = eval(input())
        stack.append(stdin)
        
        position += 1
        
    elif currChar == "_":
        A = stack.pop()
        if type(A) == str:
            stack.append(A.lower())
        else:
            stack.append(int(A))

        position += 1
    elif currChar == "U":
        A = stack.pop()
        if type(A) == str:
            stack.append(A.upper())
        else:
            stack.append(int(A+1))

        position += 1
    elif currChar == "R":
        A = stack.pop()
        if type(A) == str:
            stack.append(''.join(random.sample(A,len(A))))
        else:
            stack.append(int(random.random()*A+0.5))

        position += 1
    elif currChar == "B":
        A = stack.pop()
        if type(A) == str:
            stack.append(ord(A))
        else:
            stack.append(chr(int(A)))

        position += 1
    elif currChar == "@":
        output = ''
        position += 1
    elif currChar == ";":
        A = stack.pop()
        if type(A) != str:
            time.sleep(A)
        else:
            stack.append(A)
        
        position += 1
    elif currChar == "D":
        A = stack.pop()
        if type(A) != str:
            date = datetime.datetime.now()
            if A == 0:
                num = date.second()
            elif A == 1:
                num = date.minute()
            elif A == 2:
                num = date.hour()
            elif A == 3:
                num = date.day()
            elif A == 4:
                num = date.month()
            elif A == 5:
                num = date.year()
            elif A == 6:
                num = date.isoformat()
            else:
                num = date.timestamp()
            
            stack.append(num)
        
        position += 1
    elif currChar == "S":
        A = stack.pop()
        B = stack.pop()
        C = stack.pop()

        if type(C) == str and type(B) != str and type(A) != str:
            stack.append(C[B:A])
        else:
            stack.append(C)
            stack.append(B)
            stack.append(A)

        position += 1
        
    elif currChar == "L":
        A = stack.pop()

        if type(A) == str:
            stack.append(len(A))
        else:
            stack.append(math.log(A,10))

        position += 1
        
    elif currChar == "(":
        exitcondition.append(stack.pop())
        temppos.append(position + 1)
        position += 1
    elif currChar == ")":
        if stack[-1] == exitcondition[-1]:
            position += 1
            exitcondition.pop()
            temppos.pop()
        else:
            position = temppos[-1]
        
    elif currChar == "{":
        if ifstage == 1:
            position += 1
        elif ifstage == 2:
            if not test:
                try:
                    while code[position] != "}":
                        position += 1
                    
                    ifstage = 3
                except:
                    pass
                
            else:
                position += 1
            
        elif ifstage == 3:
            position += 1
        
            
    elif currChar == "}":
        if ifstage == 1:
            ifstage = 2
            if stack.pop() == 1:
                test = True
            else:
                test = False
            
            position += 1
        elif ifstage == 2:
            if code[position+1] == "{":
                position += 1
                while code[position] != "}":
                    position += 1
            
            ifstage = 1
            test = True
            position += 1
        elif ifstage == 3:
            ifstage = 1
            test = True
            position += 1			
        
    elif currChar == "#":
        stack.pop()
        position += 1
    elif currChar == "%":
        stack.insert(0,stack.pop())
        position += 1
            
    elif currChar == "T":
        A = stack.pop()
        B = stack.pop()

        mode = A
        n = 100000000

        if mode == 0 or mode == "sin":
            stack.append(round(math.sin(B)*n)/n)
        elif mode == 1 or mode == "cos":
            stack.append(round(math.cos(B)*n)/n)
        elif mode == 2 or mode == "tan":
            stack.append(round(math.tan(B)*n)/n)
        elif mode == 3 or mode == "asin":
            stack.append(round(math.asin(B)*n)/n)
        elif mode == 4 or mode == "acos":
            stack.append(round(math.acos(B)*n)/n)
        elif mode == 5 or mode == "atan":
            stack.append(round(math.atan(B)*n)/n)
        elif mode == 6 or mode == "DtoR":
            stack.append(B*math.pi/180)
        elif mode == 7 or mode == "RtoD":
            stack.append(B*180/math.pi)
        elif mode == 8 or mode == "pi":
            stack.append(B)
            stack.append(math.pi)
        elif mode == 9 or mode == "tau":
            stack.append(B)
            stack.append(2*math.pi)
        elif mode == 10 or mode == "abs":
            stack.append(abs(B))

        position += 1
        
    elif currChar == "W":
        A = stack.pop()

        if type(A) == str:
            stack.append(number(A))
        else:
            stack.append(str(A))

        position += 1
        
    elif currChar == "A":
        mode = stack.pop()

        if mode == 0 or mode == "alpha":
            stack.append("abcdefghijklmnopqrstuvwxyz")
        elif mode == 1 or mode == "ALPHA":
            stack.append("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
        elif mode == 2 or mode == "nums":
            stack.append("0123456789")
        elif mode == 3 or mode == "pi":
            stack.append(math.pi)
        elif mode == 4 or mode == "e":
            stack.append(math.e)

        position += 1
        
    elif currChar == "$":
        stack = stack[::-1]
            
        position += 1
        
    elif currChar == "?":
        output += "\n"
        position += 1
        
    elif currChar == "!":
        position += 1
        if code[position] in variables:
            if type(variables[code[position]]) != str:
                variables[code[position]] += 1
                stack.append(variables[code[position]])

        else:
            variables[code[position]] = 1
            stack.append(variables[code[position]])
        
        position += 1
        
    else:
        if code[position] in variables:
            stack.append(variables[code[position]])
            position += 1
        else:
            variables[code[position]] = 0
            stack.append(0)
            position += 1
    
    return position

def runCode():
    global code, stack, position, output, variables, funcpos, temppos, exitcondition, delaypos, ifstage, testval, test, functions, funccode
    while position < len(code):
        position = check()


def interpreter():
    global code, stack, position, output, variables, funcpos, temppos, exitcondition, delaypos, ifstage, testval, test, functions, funccode

    fname = sys.argv[1]

    with open(fname, "r") as f:
        code = f.read()
    
    position = 0
    stack = []
    variables = {}
    exitcondition = []
    temppos = []
    output = ""
    
    ifstage = 1
    functions = {}
    funcpos = []
    funccode = []
    
    runCode()

    print(output)

interpreter()

# Noether
Named after the mathematician [Emmy Noether](http://en.wikipedia.org/wiki/Emmy_Noether), Noether is a RPN ([Reverse Polish Notation](https://xkcd.com/645/)) stack-based programming language with similarities to the [Fourier programming language](https://github.com/beta-decay/Fourier). In particular, Noether was designed to be a more functional and more useful version of Fourier.

## Control Flow

### If Statements

If statements are defined using curly brackets

***If-then***

An if-then statement is defined like so:

    {<expression>}{<true code>}
    
If the stack at `<expression>` ends at 1, then the code at `<true code>` is run. Otherwise, the program continues past the if statement.

***If-then-else***

An if-then-else statement is defined like so:

    {<expression>}{<true code>}{<false code>}
    
If the stack at `<expression>` ends at 1, then the code at `<true code>` is run. Otherwise, the code at `<false code>` is run.

### While loop

A loop is defined using parentheses like so:

    (<code>)
    
At the `(`, the exit condition for the loop is popped off the stack. If the top of the stack at `)` equals the exit condition, then the loop ends and the program continues. Otherwise, the code goes back to `(` and it loop again.

## Built-in Functions

These are the functions which exist in Noether. They are subject to change without prior notice.

### Zero argument functions

These functions do not pop anything off the stack

***@***

 - Clears the output screen
 
---

***%***

 - Rotates the stack
 
---

***I***

 - Pushes the user input
 
 ---
 
 ***N***
 
 - Negates any number which follows it. E.g. `N12P` outputs `-12`.
 
### Single argument functions

All of these functions except P pop the  top item off the stack

***P***

 - **All types:** Prints the top item of the stack
 
---

***_***

 - **Number:** Floors the number and returns the result
 - **String:** Makes all characters in the string lowercase
 
---

***U***

 - **Number:** Ceilings the number and returns the result
 - **String:** Makes all characters in the string uppercase
 
---

***R***

 - **Number:** Returns a random number from 0 to the given number
 - **String:** Shuffles the characters in the string
 
---

***D***

 - **Number:** The number given is the mode number (see *Date Modes* below) which dicates the part of the date pushed to the stack
 
---

***;***

 - **Number:** Pauses the program for the given number of seconds

---

***L***

 - **Number:** Returns the log 10 of the number
 - **String:** Returns the length of the string
 
---

***#***

 - **All types:** Pops the top item off  the string and does nothing
 
 ---
 
 ***W***
 
 - **Number:** Converts number to string
 - **String:** Converts string to number
 
 ---
 
 ***A***
 
 - **Number:** Returns one of the stored constants according to the mode number (see *Constant Modes* below)
 - **String:** Returns one of the stored constants according to the mode name (see *Constant Modes* below)

### Double argument functions

All of these functions pop the top two items off the stack

***+***

 - **Number and a Number:** adds the two  numbers and pushes the result
 - **String and a Number:** converts the number to a string, concatenates it to the string and pushes the result
 - **String and a String:** concatenates the strings and pushes the result
 
---
 
***-***
 
 - **Number and a Number:** subtracts the two  numbers and pushes the result
 - **String and a Number:** deletes the character at the given index and pushes the result
 - **String and a String:** removes characters according to the given regex string from the first string and pushes the result
 
---
 
***\****
 
 - **Number and a Number:** Multiplies the two numbers and pushes the result
 - **String and a Number:** String multiplication
 
---
 
***/***
 
 - **Number and a Number:** Divides the two numbers and pushes the result
 - **String and a Number:** Pushes the character at the given index of the string
 - **String and a String:** Returns true if the string contains the given substring and false if not
 
---

***^***

 - **Number and a Number:** Raises one number to the power of the other number and returns the result
 - **String and a String:** Splits the first string by the second string and pushes all parts to the stack individually
 
---

***=***

 - **All types:** Returns true if top two items are equal and false if not
 
---

***>***

 - **Number and a Number:** Returns true if the first number is greater than the second number
 
---

***<***

 - **Number and a Number:** Returns true if the first number is less than the second number
 
---

***&***

 - **All types:** Performs a bitwise AND operation on the two top items of the stack
 
---

***|***

 - **All types:** Performs a bitwise OR operation on the top two items of the stack
 
 ---
 
 ***T***
 
  - **Number and a Number:** The first number is the number which is passed to the trig function, the second is the mode number (see *Trig Modes* below)
  - **String and a Number:** The number is the number which is passed to the trig function and the string is the mode name (see *Trig Modes* below)
 
### Three argument functions

These functions pop three items off the stack

***S***

 - **String, Number *A*, Number *B*:** Slices the string from position A to position B
 
### Date Modes
 
The function D pops the mode number off the stack:

0. Pushes the number of seconds in the time
1. Pushes the number of minutes in the time
2. Pushes the number of hours in the time
3. Pushes the number of days in the date  
4. Pushes the number of months in the date
5. Pushes the current year
6. Pushes the ISO date string
  
Any other number will mean that D pushes the UNIX timestamp.

### Trig Modes

The function T pops the number, *x* and the mode number/name:

0. **sin:** Pushes the sine of x in radians
1. **cos:** Pushes the cosine of x in radians
2. **tan:** Pushes the tangent of x in radians
3. **asin:** Pushes the arcsine of x
4. **acos:** Pushes the arccosine of x
5. **atan:** Pushes the arctangent of x
6. **DtoR:** Converts x from degrees to radians
7. **RtoD:** Converts x from radians to degrees
8. **pi:** Pushes the value of pi (nothing is popped)
9. **tau:** Pushes the value of tau (2\*pi) [nothing is popped]

### Constant Modes

The function A pops the mode number/name:

0. **alpha:** Pushes the string "abcdefghijklmnopqrstvwxyz"
1. **ALPHA:** Pushes the string "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
2. **nums:** Pushes the string "0123456789"
3. **pi:** Pushes the value of pi
4. **e:** Pushes the value of e (the base of the natural logarithm)

# Noether
Named after the mathematician Emmy Noether, Noether is a revse polish notation, stack-based programming language with similarities to the Fourier programming language. In particular, Noether was designed to be a more functional and more useful version of Fourier.

***WIP***

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
 
### Three argument functions

These functions pop three items off the stack

***S***

 - **String, Number *A*, Number *B*:** Slices the string from position A to position B
 
### Date Modes
 
The function D pops the mode number off the stack:
 - **0:** Pushes the number of seconds in the time
 - **1:** Pushes the number of minutes in the time
 - **2:** Pushes the number of hours in the time
 - **3:** Pushes the number of days in the date  
 - **4:** Pushes the number of months in the date
 - **5:** Pushes the current year
 - **6:** Pushes the ISO date string
  
Any other number will mean that D pushes the UNIX timestamp.

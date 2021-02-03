<h3 align="center">Treatment Decision Solver</h3>

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

</div>

---

<p align="center"> Job application coding test
</p>

## 📝 Table of Contents

- [Problem Statement](#problem_statement)
- [Idea / Solution](#idea)
- [Dependencies / Limitations](#limitations)
- [Installing and Running](#getting_started)
- [Technology Stack](#tech_stack)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)

## Problem Statement <a name = "problem_statement"></a>

In an hospital, doctors examine multiple patients. For simplicity, let’s assume that after an examination a doctor suggests whether or not a patient should undergo treatment. It is common, however, that some patients are examined by more than one doctor, and that doctors do not agree in their suggestions: for the same patient, doctors A and B can suggest treatment, while doctor C might suggest not to treat. To solve the disputes, you have been asked to write a program that will consider all the suggestions from doctors and will decide which patients should be treated and which patients should not in a way that maximizes the number of satisfied doctors.

EXAMPLE:  with 4 doctors and 3 patients

 - Doctor A: Treat patients 1 and 2. Do not treat patient 3.
 - Doctor B: Do not treat patient 2.
 - Doctor C: Treat patient 3. Do not treat patient 1.
 - Doctor D: No suggestions.

In this example we can satisfy 3 doctors (B, C and D) by treating only patient 3 and not treating 1 and 2.

#### INPUT
The first line contains the number of doctors d.
The second line contains the number of patients p.

After that, d lines indicate the suggestions from each doctor. Each line contains:
 -  A sequence of integers between 0 and p-1 indicating which patients are suggested for treatment by this doctor. Note that this sequence can be empty meaning that doctor didn’t make any suggestion. Note that the indices of the patients is 0-based.
Separator symbol #.
 -  A sequence of integers between 0 and p-1 indicating which patients are suggested for non treatment by this doctor. Note that this sequence can be empty meaning that doctor didn’t make any suggestion.

#### OUTPUT
The output should be a single integer between 0 and d-1 indicating the maximum number of doctors that can be satisfied.

Note that you DO NOT need to provide the list of patients to treat. You DO NOT need to compute that explicitly (although you can do it if you consider it necessary).


## 💡 Idea / Solution <a name = "idea"></a>

~While it is possible to accurately calculate all possible combinations of suggestions this technique quickly reaches its limit as the dataset increases exponentially with the number of doctors and patients. 

My method consists in looping over the suggestions array and comparing the first doctor's suggestions to her's peer's. At the begining of each iteration, I shuffle the list of suggestions in order to get a better sample of all the possibilities. Every time, I compare the number of doctors who agree together and put it down as the potential maximum value if it is higher than the last. 

To increase further the sample size and so the accuracy of my result, I run the loop as often as the suqre number of doctors. 

I admit, this solution might be sligtly slower than the first one for small datasets but this tradeof yields the expected results for the largest ones in a fraction of the time it would take to calculate all possible combinations.~

I compute the conflicts that each doctor has with the others. Then I loop through the doctors' list and remove the one who appears most often in the total number of conflicts until there are no more conflicts.

If several doctors appear the same number of times in the list of conflicts, I take the one that has the most conflicts of its own



## ⛓️ Dependencies / Limitations <a name = "limitations"></a>

- I first created a node module to be able to run the program. Then I made a basic react app using the same module as an example for a more user friendly experience.
- They both use node and dependancies that you have to install in orer to run the programm.
- Alternatively, The app is also hosted to codesandbox so you don't have to download or install anything. You can view the code and see the result directly in the browser as you would on your coputer.


## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development
and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

You will need node js v12 or higher and either npm or yarn installed for the dependencies.

This was coded on a Windows machine but it should work the same on a Mac 

## Installing and Running

After downloading the files, you will frst need to install dependancies  

#### CLI version:

Inside treatment_decisions_solver, run: 
```
yarn install
```
Launch program with
```
node ./index.js
```
A command prompt will ask the path of your input file and log the result in the terminal. The input must be a .txt file


#### Codesanbox:

Go to the [sandbox](https://codesandbox.io/s/patient-treatment-solver-1cs55). There is nothing to install or launch. A working preview of the app is visible and you can interract with it via dragging your input in the dropzone or clicking on it. The result will appear on screen.

Codesandbox is based on visual studio code editor. You can view the files as you would in te editor.

By clicking on `Tests` under the share button, you can see the results of the tests input I was given.


## ⛏️ Built With <a name = "tech_stack"></a>

- [Reactjs](https://reactjs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@frenelou](https://github.com/frenelou) - front-end developer

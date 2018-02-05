![Logo](https://github.com/NickTheDev/typetrial/blob/master/design/logo.png?raw=true) 
# Typetrial 
[Typetrial](https://nickthedev.github.io/typetrial) is an attempt to create modern typing test app. In an effort to keep the project simple and succinct, the app is been restrained to a single page view.
It is built for use on desktop as well as mobile, and is fully responsive. 

## Screenshots


![Screenshots](https://github.com/NickTheDev/typetrial/blob/master/design/ui.png?raw=true)


## Exams
To start an exam in [Typetrial](https://nickthedev.github.io/typetrial), begin typing in the input box. A timer for two minutes will begin, and when it reaches zero the exam
 will end and a report will be generated.

After starting the exam, a sentence will be displayed on the screen and you will be prompted to type it in. After typing it, clicking 
the space bar will shuffle the sentence randomly.

## Speed calculations.
In an effort to calculate an accurate words per minute speed, a certain procedure is used. The amount of mistyped characters will
be subtracted from the total number of characters typed. The amount will then be divided by the average word length (5) to get an
estimate of the words typed. The word count will finally be divided by 120 seconds.
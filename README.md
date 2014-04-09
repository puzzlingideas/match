Match
=====

## What is Match

Match is a fast and quick to develop game engine writtern entirely in Javascript.

## What we aim at

We aim at making the most intuitive yet powerful game engine that can make your games playable across all devices and browser.

## API

To see the API please go to www.puzzlingideas.com/match/api

## Game development techniques

You can develop games in match using OOP or any other development paradigm you like, but to better harness the power of the comunity we decided to support a pattern we often call Behaviour Entity Attribute (BEA), which is very similar to Component Entity System (CES).
The goal here is to create and manage entities which are made of attributes and behaviours. 
Behaviours are in charge of changing attributes and think of attributes as plain data.

So lets say you have a Ninja with an attribute called health and a behaviour called getDamageWhenYouGetHit. This way, whenever the Ninja gets hit by something that behaviour will reduce it's health.
What could we do if we just wanted our Ninja to become invinsible? Well that one is easy with BEA, just remove the getDamageWhenYouGetHit from Ninja and you're all set. Yes, you could have used an "if" statement, but when the code gets bigger you would end up with tons of "ifs" statements. This way you just add and remove behaviours and also avoid wierd hierarchy trees that you would definatelly face if you used OOP.

## Examples

In the tests directory you'll find examples to play with and learn more about Match and BEA.

## Community

Match is open source so please feel free to ask any questions about Match, open issues and fork it as you like.

## More information?

You can find more about Match at www.puzzlingideas.com/match

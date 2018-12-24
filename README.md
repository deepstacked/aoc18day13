This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Mad Cart Madness

This is a project in solving Advent of Code 2018 day 13 part 1 and part 2 [AoC2018Day13 Rules](https://adventofcode.com/2018/day/13). In addition, to solving it for AoC, the project was used as a practice grounds for continuing to learn React/Redux along with Javascript/JSX. While AoC can certainly be solved with other paradigms (C#, python, php) this implementation helps strengthen my skills on the front end side. This is my 2nd React/Redux project to setup and complete.

### Dependencies:

```
    "babel-cli": "^6.26.0",
    "babel-preset-react-app": "^3.1.2",
    "bootstrap": "^4.1.3",    
    "react": "^16.6.3",
    "react-devtools": "^3.4.3",
    "react-dom": "^16.6.3",
    "react-redux": "^6.0.0",
    "react-scripts": "2.1.1",
    "reactstrap": "^6.5.0",
    "redux": "^4.0.1",
    "redux-devtools-extension": "^2.13.7",
    
```

### Things I learned or improved on in this project:

* Improved: Setting up a Redux/React project starting from CRA
* Improved: Understanding on Redux's handling of state
* Learned: Returning multiple variables from a function (i.e. `let {a, b} = fn()` or `({a, b} = fn())`). 
* Learned: Layering multiple svg elements within a main svg. 
* Learned: `<defs />` to hide patterns in an svg element
* Learned: How to prevent unnecessary render by putting custom code in shouldComponentUpdate
* Learned: More info about selectors. Ended up not needing them for this project but my understanding of when and how I would use the reselect library has greatly increased.
* Improved: Understanding of the capabilities of bootstrap and reactstrap. Looked at react-bootstrap for the bootstrap implementation but current documentation was mostly based on bootstrap 3.x vs 4. reactstrap is geared or made the transition to bootstrap 4+.
* Learned: How to properly set timer using NodeJS.timer (setInterval). Clean up done in componentWillUnMount and automatically when conditions are met in componentDidUpdate.
* Learned: How to control the svg viewport sizing.
* Learned: How to create gitHub issues and link them to my pushes.
* Learned: gitHub markdown

### UI
*Start state UI:

![start state UI](https://github.com/deepstacked/aoc18day13/blob/master/mad_carts_start.png "Start state UI")
*Solved state UI:
![solved state UI](https://github.com/deepstacked/aoc18day13/blob/master/mad_carts_solved.png "Solved state UI")


### Fun things:

* I did not look at any other day 13 solutions until I had solved part 1. Some pretty cool visualizations are out there for this puzzle.
* Kept track of all tracks, direction and turns because I want to display updated positions of all the carts after 1 tick.
* Watching the "carts" go around on the track.
* There's room for improvement in speeding up the `doOneTurn -> update state -> remake carts and cartinfos` loop. doOneTurn is fast.
* No error checking because I believe in defensive programming so errors are reduced. Also `try...catch` blocks end up covering up errors unintentionally. A production app that retrieves data from a database would have such `try...catch` blocks because you can only be so defensive in your programming. This app is a closed loop (input does not change)



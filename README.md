# Hacker News Feed

## Overview

The popular news site Hacker News (HN) run by YCombinator provides interesting links to news articles and blog posts that are related to information technology.

This project provides a more eye-pleasing version of the top 500 stories listed on HN.

## The Design

This solution is implemented in **JavaScript** and **CSS Grid** using the library **ReactJS**.

The interface is designed for web big-screens using CSS Grid, but it is fully responsive and works flawlessly on _small-screens_ (480px) in portrait orientation.

The stories are loaded using the _HN official API_: https://github.com/HackerNews/API.

The page is _loaded on demand_ while scrolling the stories: it enhances the user experience with a faster loading time and reduces the data consumption.

Each Story contains:

| Field  | Description                         |
| ------ | ----------------------------------- |
| score  | The story's score                   |
| title  | The title of the story              |
| author | The username of the story's author. |
| text   | The first comment                   |

Each Story has two states: closed and expanded.

- While the story is _closed_ the first comment contains a shortened text.
- While the story is _expanded_ the first comment is fully visible, it is possible to visit the actual news clicking on the _Title_ and to upvote it too clicking on the _Score_.

## How to install the project

To install the dependencies of the project run the command below from the root of the project.

```bash
npm install
```

## How to run the tests

The application has been developed using a Test Driven Development (**TDD**) approach.

To start the tests run the command below from the root of the project.

```bash
npm test
```

## How to run the application

To start the application run the command below from the root of the project and visit the url http://localhost:3000/.

```bash
npm start
```

## How it looks

The application shows the top 500 stories listed on HN.
It shows each Story [score, title, author, text] loaded in a grid template with shortened text.

![Web Interface][web_closed]

On the click event the grid items expand revealing the text with more text.

![Web Interface Expanded][web_expanded]

It also works on mobile resolutions.

![Mobile Interface][mobile_closed]

![Mobile Interface Expanded][mobile_expanded]

[mobile_closed]: /designs/HN_initial_480p_closed.png
[mobile_expanded]: /designs/HN_initial_480p_expanded.png
[web_closed]: /designs/HN_initial_1920p_closed.png
[web_expanded]: /designs/HN_initial_1920p_expanded.png

## What's next

- Complete the test suite with code refactoring
- Handle the double click for text selection on stories
- Create a configuration module for centralized url and constants handling

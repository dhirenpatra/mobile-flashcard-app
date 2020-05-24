# mobile-flashcard-app

This project is a mobile app that allows users to participate in daily quiz and he/ she can check knowledge based on the result of the quiz.

## Functionality of Application

> User has the following features

    - Create a deck
    - Add Card to the deck
    - Remove the deck
    - After adding card to a deck he has 2 options :
        - Start Quiz
        - Add Card

## Create A Deck

User need to give a deck name in order to enable the add button for the deck. Initially deck will contain 0 card.

## Add card to the Deck

Once user added a deck he has an option to add a card / question to deck. Add Question view is presented with 2 text boxes to provide non-empty-spaced question and answer and after validating this user input card is added to the deck and the deck view will update with the number of cards present in the deck.

## Remove the Deck

User has an option of deleting the deck.

## Start Quiz

This feature is enabled for all decks with cards. Deck with no cards has no option to play quiz.

- In Quiz a screen presented with the current question and a button to show the answer and user can show the answer and click on the correct or incorrect guess button.
- After answering all question he will be taken to the results page and will be shown with the result.
- It will give 2 more options as well.
  - Retry the Quiz.
  - Back to Deck view.

## Score View:

This is the screen where the user will be presented with the progress start and will be given the colored representation of the result.

- Green ( outstanding )
- Yellow ( average )
- Red ( need improvement )

## Getting Started With Flash Card App

- install all dependencies with `yarn install`
- start application with `yarn start`

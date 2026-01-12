# UI Rough Draft

![Hangman Frontend Components Mockup](/src/assets/hangman_component_mockup.png)


# :clipboard:This project will comprise of several **core** components listed below:

- [ ] OAuth :triangular_flag_on_post:
- [ ] Leaderboard :1234:
- [ ] Timer :hourglass:
- [ ] Game (I/O) :video_game:
- [ ] Profile :file_folder:
- [ ] Database :link:


## OAuth :triangular_flag_on_post:

This component is more functional rather than physical. The purpose is to allow users to save their score and be added to the scoreboard. Some logic is needed here to prompt users to login, most likely a popup after first game is finished and a permanent block next to leaderboard component.


## Leaderboard :1234:

One of the prime reasons for this project, I have a future project that is a lot more purpose-driven that will also require a leaderboard. Different displays of the leaderboard with be 1 day, 1 week, and all-time. Weighing the choices of having the leaderboard it's own table in my DB or rendered and queried from the user table. *Will give an update on my decision later.*


## Timer :hourglass:

This is something I just recently thought of that will improve user experience a lot by adding some stakes. I want to implement it as bar waning from right to left. 1 min to 45 seconds is probably good.


## Game :video_game:

The biggest component, obviously. :triumph: I think it's best to break it down into three aspects; **frontend**, **game flow**, and **scoring system**:

### Frontend Render

This will consist of the body parts in boxes :sweat:, the word to be solved, and popup keyboard. Now that I think about it, ***future updates could consist of hints and multiple sections not limited to vocabulary, maybe even selectable sections*** Currently I will set it up to where vocabulary words are fetched from a dictionary API.

### Game Flow

1. User Clicks Play Game
2. Word is fetched; fill-in-the-blank, body parts, and keyboard rendered; timer starts
3. Conditional #1
```
if (correctInput)
  fillLetters(input)
else
  hangTheMan()
```
4. Conditional #2
```
switch (gameEnd){
  case "player wins":
    displayWinPopup()
    break

  case "out of time":
  case "out of guesses":
    displayLossPopup()
    break

  default:
}
calculateScore()
displayStats() // score, time spent, word
updateDB()

if (firstGame)
  displayLoginPopup()

playAgain() //or see leaderboard
```

### Scoring

Score will be calculated on game end and will be a result of multiple factors: time left, guesses left, letters left *if* full word is guess, and letters correct *if* out of guesses or time.


## Profile :file_folder:

A small popup showing player stats: username, games completed, full word guesses, 1 day score, 1 week score, all-time score, date joined, etc. Have to filter out bad names. Info will be pulled from database.


## Database :link:

User table - Essentially a collection of Profiles + OAuth verification
Scoreboard - Username and score (probably not going to exist)


> ### Later feature updates include but are not limited to ***audio, animations, difficulty levels, other languages, multiplayer, etc.***
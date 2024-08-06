## 🚧 Currently under development 🚧

# Learn From Your Mistakes 2.0 - Lichess Improvement 

**Learn From Your Mistakes 2.0**, an enhancement to the popular "Learn From Your Mistakes" feature on Lichess. This repository provides a more engaging and efficient way to review and learn from your chess games by serving mistake puzzles in bulks


## Preview

<div style="display: flex; justify-content: center; align-items: center;">
  <img src="https://github.com/user-attachments/assets/89fa642b-9040-46cc-b0bc-b9d17320d7d8" alt="description" style="width: 430px; height: 490px; margin-right: 10px;" />
  <img src="https://github.com/user-attachments/assets/71a8065a-251a-4dd8-bb6e-65ff46e1fd2e" alt="description" style="width: 430px; height: 490px;" />
</div>





## Features

- **Puzzle Format Games**: Play games in a puzzle format in bulk, allowing you to practice and learn from multiple mistakes efficiently.
- **Time Period Specification**: Specify a time period to filter games so that you can focus on recent games or any other time frame.

## How It Works

1. Gathers data from game in the specified time period for the specified user
2. Collects FENs of positions where the errors (inaccuracies, blunders and mistakes) occurred
3. Serves all of the puzzles in 1 large collection
   
#### NOTE : Only games that you have analyzed will be included. After playing, simply click the button displayed below:

![image](https://github.com/user-attachments/assets/28e50257-8364-4f6d-b1fb-be08e9e10ec0)



## Installation

1. Install the dependencies:
   ```bash
   npm install
2. Start the application
    ```bash
    npm run dev

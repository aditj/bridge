Hello! Check out our wiki! 
## The components include: 
### a. Server
   - #### Database
     - ##### User, where each user has the following attributes
       - Username, Password Hash
       - Games they have played
       - Some rating/ranking maybe
       - Current Game
     - ##### Games, where each game has the following attributes
       - Game ID
       - Players Involved
       - Game type
       - Move History in the appropriate format
   - #### Game Server monitoring each running game 
     - This can be the existing boardgame.io's [`Lobby`](https://boardgame.io/documentation/#/api/Lobby) object.

### b. Gameplay - Each game on the server has gameplay which has two components
   - #### Game Definition - boardgame.io's [`Game`](https://boardgame.io/documentation/#/api/Game) Object
     - Setup
     - Moves, Turns and Phases
     - Gameplay
   - #### Board Definition - boardgame.io's [`Board`](https://boardgame.io/documentation/#/api/Client) Object
     - How the board looks - UI
     - How the user interacts - UX

### c. UI 
   - #### UI of the lobby/authentication/profile page
   - #### UI of the game - stored in 'Board' definition.
## UML Diagram
![](https://i.ibb.co/kDr9tGj/photo-2020-06-01-15-25-01.jpg)

## Notes/ Future Features
- Ideally, there should be an option for turning on `anonymous play` for each game.
- Old games can be used to create new/interesting games

## How do the different functions/objects/files/components connect with each other?
![](https://github.com/aditj/bridge/blob/master/file_explanation.svg)

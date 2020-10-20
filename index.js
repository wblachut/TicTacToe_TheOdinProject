const ticTacToeModule = (() => {

  const newGameWindow = document.querySelector('.new-game-window');
  const newGameButton = document.querySelector('.new-game-button');
  const startGameButton = document.querySelector('.start-game-button');
  const playerOneName = document.getElementById('player-one-input');
  const playerTwoName = document.getElementById('player-two-input');
  const mainDiv = document.querySelector('.main-div');
  const checkboxAI = document.getElementById('checkbox-ai');
  const p2Form = document.getElementById('p2-li');

  let _Multiplayer = '';

  newGameButton.addEventListener('click', popUpNewGameWindow);
  startGameButton.addEventListener('click', requestGameStart);
  checkboxAI.addEventListener('click', toggleMultiplayerDisplay);
  popUpNewGameBtn();

    function popUpNewGameBtn() {
      newGameButton.classList.add('active');
    }

    function popUpNewGameWindow() {
      newGameWindow.classList.add('active');
      if (document.querySelector('.result-div')) {
        mainDiv.removeChild(document.querySelector('.result-div'))
      }
    }

    function hideNewGameWindow() {
      newGameWindow.classList.remove('active');
    }

    function hideNewGameButton() {
      newGameButton.classList.remove('active');
    }
    
    function toggleMultiplayerDisplay() {
      if (checkboxAI.checked === true) {  
        playerTwoName.value = 'Computer';
        p2Form.style.visibility = "hidden";
      } else {
        playerTwoName.value = '';
        p2Form.style.visibility = "visible";
      }
      _toggleMultiplayerStatus();
    }
    
    function _toggleMultiplayerStatus() {
      if (checkboxAI.checked === true) {  
        _Multiplayer = false; 
      } else {
        _Multiplayer = true;
      }
      return {_isMultiplayer: _Multiplayer};
    }

    // ********* 
  const game = (() => {
     
    const _playerCreator = (name, marker, who = 'player') => {
       return {
         name,
         marker,
         who,
       };
     }
     
    const playerOne = _playerCreator('player One', '✗');
    const playerTwo = _playerCreator('player Two', '◯');
     
    const _winArrays = [
       [0,1,2],[3,4,5],[6,7,8], 
       [0,3,6],[1,4,7],[2,5,8], 
       [0,4,8],[2,4,6] ];
       
    function _makeEmptyBoard() {
      _board = ['','','','','','','','',''];
      return _board
    }
        
        function startGame() {
          _makeEmptyBoard();
          _setGameType();
          _setPlayers();
          console.log(`Multiplayer: ${_Multiplayer}, ${playerOne.name} vs ${playerTwo.name}`);
          hideNewGameButton();
          hideNewGameWindow();
          _createDOMGameBoard();

          let _activeMarker = playerOne.marker;
          
          const _gameCells = Array.from(document.querySelectorAll('.game-cell'));
          _gameCells.forEach(cell => cell.addEventListener('click', makeMove));
          
          
          function makeMove(e) {
            if (e.target.textContent == '') {
              e.target.textContent = _activeMarker;
              updateGameboardArray();
              checkGameStatus();
              checkForAIMove();
              changeMarker();
            }
            
            function updateGameboardArray() {
              pressedCellNumber = e.target.id;
              _board[pressedCellNumber] = _activeMarker;
            } 
            
          }
          function changeMarker() {
            _activeMarker == playerOne.marker ? _activeMarker  = playerTwo.marker : _activeMarker = playerOne.marker
          }
          
          function checkForAIMove() {
            if (_Multiplayer == false) {
              changeMarker();
              makeAIMove();  
            } else {  
              return
            }
          }
          
          function makeAIMove() {
            getRandomCell();
            if (_board[randomCell] == '') {
              _board[randomCell] = _activeMarker;
              _gameCells[randomCell].textContent = _activeMarker;
              checkGameStatus();
            } else {
              makeAIMove()
            }
          }
          
          function getRandomCell() {
            return randomCell = Math.round(Math.random()*9)
          }
          
          function checkGameStatus() {
            if (checkForWinner()) {
              endGame(_activeMarker);
              console.log('winner is :', _activeMarker, 'finished', _finished);
            } else if (isATie()) {
              endGame('tie');
            } else {
              return
            }

            function isATie() {
              return _board.every(cell => cell != '')
            } 
            function setMarkerToCheck(sub) {
              return _board[sub] === _activeMarker;
            }
            function checkIfEveryHas(subArray) {
              return (subArray.every(setMarkerToCheck));
            }
            function checkForWinner() {
              return (_winArrays.some(checkIfEveryHas));
            } 
          }
          
          return {playerOne, playerTwo}
        }
          
    function endGame(result) {
     console.log('End of the Game, ', result , 'wins')
     removeGameBoard();
     createResultAnnouncer(result);    
     popUpNewGameBtn();   
      return _finished
   }
     
         function _setPlayers() {
           playerOne.name = playerOneName.value;
           playerTwo.name = playerTwoName.value; 
         }
         
         function _setGameType() {
           if (checkboxAI.checked === false) {  
             _Multiplayer = true
           } else {
             _Multiplayer = false
           } return {_MultiplayerStatus: _Multiplayer};
         }
         
         function _createDOMGameBoard() {
           const _gameBoard = document.createElement('div');
           _gameBoard.classList.add('game-board');
           for (let i = 0; i < 9; i++) {
             const _gameCell = document.createElement('div');
             _gameCell.classList.add('game-cell');
             _gameCell.id = i;
             _gameBoard.appendChild(_gameCell)
             mainDiv.appendChild(_gameBoard)
           } return {_gameBoard}
         }
         
         function removeGameBoard() {
           mainDiv.removeChild(document.querySelector('.game-board'));
         }
         
         function createResultAnnouncer(result) {
           const resultDiv = document.createElement('div');
           resultDiv.classList.add('result-div');
           mainDiv.appendChild(resultDiv);
           announceResult(result);
           
           function announceResult(result) {
             if (result == playerOne.marker) {
               resultDiv.textContent = `${playerOne.name} is a winner!`;
             } else if (result == playerTwo.marker) {
               resultDiv.textContent = `${playerTwo.name} is a winner!`;
             } else {
               resultDiv.textContent = `It's a Tie!`;
             }
           }
         }
         return {startGame}
  })();
        
  function requestGameStart(e) {
    if (playerOneName.value == '' || playerTwoName.value == '') {
      return
    }
    e.preventDefault();
    game.startGame();
  }


})();
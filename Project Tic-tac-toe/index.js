const ticTacToeModule = (() => {

  const newGameWindow = document.querySelector('.new-game-window');
  const newGameButton = document.querySelector('.new-game-button');
  const startGameButton = document.querySelector('.start-game-button');
  const playerOneName = document.getElementById('player-one-input');
  const playerTwoName = document.getElementById('player-two-input');
  const mainDiv = document.querySelector('.main-div');
  const checkboxAI = document.getElementById('checkbox-ai');
  const p2Form = document.getElementById('p2-li');

  let _isMultiplayer = '';
  let _gameType = '';

  const init = (() => {
    (() => newGameButton.classList.add('active'))();

    newGameButton.addEventListener('click', popUpNewGameWindow);
    startGameButton.addEventListener('click', startGame);
    checkboxAI.addEventListener('click', toggleMultipalyerDisplay);

   })();
   

    function popUpNewGameWindow() {
      newGameWindow.classList.add('active');
    }

    function hideNewGameWindow() {
      newGameWindow.classList.remove('active');
    }
    
    
    function startGame() {


      chceckMultiplayer();
      setGameType();


      console.log(_gameType);

   



      // add on click change value function depending on marker
      // start update gameboard function
      //  check gameStatus

      const playerCreator = (name, mark, _status = status) => {
        return {
          name,
          mark,
          _status,
          playerInfo: () => {
            console.log({name, mark, _status});
          }};
      }
  
      const playerOne = playerCreator(playerOneName.value, 'X');
      const playerTwo = playerCreator(playerTwoName.value, 'O');
      playerOne.playerInfo();
      playerTwo.playerInfo();

      hideNewGameWindow();
      createDOMGameBoard();

      const gameBoard = (() => {
        // debugger;
        const _baseGameBoard = [,,,,,,,,,];
        const _gameCells = Array.from(document.querySelectorAll('.game-cell'));
  
          gameType = _gameType

          _gameCells.forEach(cell => cell.addEventListener('click', makeMove));
            function makeMove(e) {
              debugger;
              console.log(e);
            }


      })();

  



      
    }


    function endGame() {
      console.log('End of the Game')
      //%%%%%%%%%%%%%%%%%%%
    }


    function toggleMultipalyerDisplay() {
      if (checkboxAI.checked === true) {  
        _isMultiplayer = false;
        p2Form.style.visibility = "hidden";
      } else {
        _isMultiplayer = true;
        p2Form.style.visibility = "visible";
      } return {_isMultiplayer: _isMultiplayer};
    }
    
    function chceckMultiplayer() {
      // try one more time to use ternary operator ???
      if (checkboxAI.checked === true) {  
        _isMultiplayer = false;
      } else {
        _isMultiplayer = true;
      } return {_isMultiplayer: _isMultiplayer};
    }
  
    function setGameType() {
      if (_isMultiplayer === true) {
        _gameType = 'Multiplayer'
      } else {
        _gameType = 'vs AI'
      }  return {_gameType}
    }




    function createDOMGameBoard() {
      const _gameBoard = document.createElement('div');
      _gameBoard.classList.add('game-board');
      for (let i = 0; i < 9; i++) {
        const _gameCell = document.createElement('div');
        _gameCell.classList.add('game-cell');
        _gameBoard.appendChild(_gameCell)
        mainDiv.appendChild(_gameBoard)
      } return 
    }

    function removeGameBoard() {
      mainDiv.removeChild(this._gameBoard);
    }

    // function makeMove() {
    //   _gameCells = Array.from(document.querySelectorAll('.game-cell'));
    //   array.forEach(cell => cell.addEventListener(click, )
        
    //   });
    //   console.log('test');
    // }

  
   



    /// endline
    })();
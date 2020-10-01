
const ticTacToeApp = {

    init: function() {
      this.catcheDOM();
      this.bindEvents();
      this.game();
    },
        catcheDOM: function() {
        
        },
  
        bindEvents: function() {
          
        },    
        game: () => { // I can use arrow functions to create modules, right?
          // const player (name, status) = >
          //     name,
          //     status,
          //   return {(name, status)};

          createPlayer(name) {
            return {
              name,
              status,

              play() {
                console.log('I play the tic-tac-toe game');
                }
            }; 
        }; //game end
    },
}
  
  
/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) { 
  var solution = new Board({n:n}); 
 
  if(n === 1){
    solution.togglePiece(0,0);
    return solution.rows();
  }

  var findSolution = function(numRooksLeft){ 
    if(!numRooksLeft){
      return;
    }
     //iterationg the rows
    for(var i = 0; i < n; i++){ 
      //iterating columns
      for(var j = 0; j < n; j++){ 
        //if cell is empty, put in place
        if(solution.get(i)[j]){   // false
          continue; //go to next column
        }
        solution.togglePiece(i, j); //sets rook in place   
        if(!solution.hasAnyRooksConflicts()){    
          findSolution(numRooksLeft - 1); //goes to next rook
        }else{
        solution.togglePiece(i, j); // goes to next column    
        }
      }
    }
  }

  findSolution(n);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  
  var findSolution = function(row){
    if(row === n){
      solutionCount++;
      return;
    }

    for(var i = 0; i < n; i++){
      board.togglePiece(row, i);
      if(!board.hasAnyRooksConflicts() ){
        findSolution(row + 1);
      }
      board.togglePiece(row, i);
    }
  }

  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var solution = undefined;
 
  if(n === 1){
    board.togglePiece(0,0);
    return board.rows();
  }


  var findSolution = function(row) {
    if (row === n) {
      solution = _.map(board.rows(), function(r) {
        return r.slice();
      })
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        findSolution(row + 1);
      } // had else
      board.togglePiece(row, i);
    }
  }

  findSolution(0);


  // var findSolution = function(numQueensLeft){ 
  //   if(numQueensLeft === 0){
  //     solution = board.rows();
  //     return;
  //   }
  //    //iterationg the rows
  //   for(var i = 0; i < n; i++){ 
  //     //iterating columns
  //     for(var j = 0; j < n; j++){ 
  //       //if cell is empty, put in place
  //       if(board.get(i)[j]){   
  //         continue; //go to next column
  //       }
  //       board.togglePiece(i, j); //sets rook in place   
  //       if(!board.hasAnyQueensConflicts()){    
  //         findSolution(numQueensLeft - 1); //goes to next rook
  //       }else{
  //         board.togglePiece(i, j); // goes to next column    
  //       }
  //     }
  //   }
  // }

  // findSolution(n);

  console.log('Single solution for ' + n + ' Queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  
  var findSolution = function(row){
    if(row === n){
      solutionCount++;
      return;
    }

    for(var i = 0; i < n; i++){
      board.togglePiece(row, i);
      if(!board.hasAnyQueensConflicts() ){
        findSolution(row + 1);
      }
      board.togglePiece(row, i);
    }
  }

  findSolution(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

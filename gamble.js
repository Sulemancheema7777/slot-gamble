//1. deposit some money
//2. determine number of lines to bet on
//3. collect a bet amount
//4. spin the slot machine
//5. check if the user wins
//6. give the user winning money
//7. play again or handle losing case

const prompt = require("prompt-sync")();
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT ={
    A:2,
    B:4,
    C:6,
    D:8
};
const SYMBOLS_VALUES ={
    A:5,
    B:4,
    C:3,
    D:2
};
const deposit = () =>{
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberdepositAmount = parseFloat(depositAmount);
        if(isNaN(numberdepositAmount) || numberdepositAmount <= 0){
            console.log('Please enter a valid number, try again');
        }else{
            return numberdepositAmount;
        }
    }
};

const numberofLines = () =>{
    while(true){
        const lines = prompt("Enter the number of lines you want to bet on between (1-3): ");
        const numberoflines = parseFloat(lines);
        if(isNaN(numberoflines) || numberoflines <= 0 || numberoflines >3){
            console.log('Please enter valid number of lines, try again');
        }else{
            return numberoflines;
        }
    }
};

const getBet = (balance,lines) =>{
    while(true){
        const bet = prompt("Enter the bet amount per line: ");
        const numberBet = parseFloat(bet);
        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines ){
            console.log(`Cant bet more than ${balance/lines} per line`);
        }else{
            return numberBet;
        }
    }
};
const spin = ()=>{
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
       for(let i=0;i<count;i++){
        symbols.push(symbol);
       }
    }
    
    const reels = [];
    for(let i=0;i<ROWS;i++){
        reels.push([]);
        const reelsymbols = [...symbols];
        for(let j=0;j<COLS;j++){
            const randomIndex = Math.floor(Math.random() * reelsymbols.length);
            const selectedSymbol = reelsymbols[randomIndex];
            reels[i][j]=selectedSymbol;
            //console.table(reels);
            reelsymbols.splice(randomIndex,1);
        }
    }
    return reels;
};

const printRows = (reels)=>{
    for(let i=0;i<ROWS;i++){
        let rowString = '';
      for(let j=0;j<COLS;j++){
        rowString += reels[i][j];
        if(j < COLS-1){
            rowString += ' | ';
        }
      } 
      console.log(rowString);   
    }
    
};

const getWinnings = (bet,reels,numberoflines)=>{
   let winnings = 0;
   for(let i=0;i<numberoflines;i++){
    let allSame = true;
     for(let j=0;j<COLS-1;j++){
          if(reels[i][j] !== reels[i][j+1]){
             allSame=false;
             break;
           }
        }
     if(allSame){
       winnings += bet*SYMBOLS_VALUES[reels[i][i]]
     } 
   }
   return winnings;
}
const game = ()=>{
    let balance = deposit();
    while(true){
      console.log('Your balance is $' +balance);
      const numberoflines = numberofLines();
      let bet = getBet(balance,numberoflines);
      balance -= bet * numberoflines;
      const reels = spin();
      printRows(reels);
      const winamount = getWinnings(bet,reels,numberoflines);
      balance+=winamount;
      console.log('You won $'+winamount);
      if(balance <=0){
        console.log('You ran out of balance');
        break;
      }
      const playAgain = prompt('if you want to continue press y else press any key: ');
      if(playAgain != 'y') break;
    };
  
}
game();
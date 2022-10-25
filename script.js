// setting the global variables that will be used throughout the game

const healthP1 = document.getElementById('health-p1');
const healthP2 = document.getElementById('health-p2');
const resultDisplay = document.getElementById('result');
const resetBtn = document.getElementById('reset');
const player1Name = document.getElementById("player1-name");
const player2Name = document.getElementById("player2-name");



// on window load definition

window.onload = () => {
  player1Name.innerText = prompt("Name of player 1:");
  player2Name.innerText = prompt("Name of player 2:");
  document.addEventListener('keydown', fightGame.start());
  resetBtn.addEventListener('click', () => fightGame.reset());
}


// class implementation

class Game {
    constructor() {
      this.isOver = false;
    }

    start() {
      document.addEventListener('keydown', startGame);

    }

    trackEnemyHealth(player) {
      if(player.health <= 0) {
        this.isOver = true;
      }
    }

    declareWinner(player) {
      if(this.isOver == true) {
        document.getElementById('victory').play();
        resultDisplay.innerHTML = `<h2 style="background-color: lightgreen">${player.name} won!</h2>`;
      }
  }

    
    end() {
      if(this.isOver == true) {
        document.removeEventListener('keydown', startGame);
      }
  }

   reset() {
       healthP1.innerHTML = "<h3>Health: 100</h3>";
       healthP2.innerHTML = "<h3>Health: 100</h3>";
       resultDisplay.innerHTML = "";
       player1 = new Player("player 1");
       player2 = new Player("player 2");
       this.isOver = false;
       this.start();
   }
    

}

class Player {
    constructor(name, health = 100, damagingAttack = 8, healingCapacity = 6) {
        this.name = name;
        this.health = health;
        this.damagingAttack = damagingAttack;
        this.healingCapacity = healingCapacity;
    }

    attack(player) {
      if(player.health > 0) {
        player.health -= this.damagingAttack;
      } 

    }

    heal() {
      if(this.health < 100) {
         this.health += this.healingCapacity;
      } else if(this.health >= 100) {
        alert(`${this.name} fully healed!`);

       }
    }
}

// instance of the game class

let fightGame = new Game();


// two instances of the player class

let player1 = new Player("player 1");
let player2 = new Player("player 2");


// function to update the dom

const updateDom = (domElem, player) => {
  domElem.innerHTML = `<h3>Health: ${player.health}</h3>`;
  
}


// keydown events

const startGame = (e) => {
  if(e.key == "q") {
    player1.attack(player2);
    document.getElementById('punch-p1').play();
    updateDom(healthP2, player2);
    fightGame.trackEnemyHealth(player2);
    fightGame.declareWinner(player1);
    fightGame.end();



  } else if(e.key == "a") {
    player1.heal();
    document.getElementById('heal-p1').play();
    updateDom(healthP1, player1);


  } else if(e.key == "p") {
    player2.attack(player1);
    document.getElementById('punch-p2').play();
    updateDom(healthP1, player1);
    fightGame.trackEnemyHealth(player1);
    fightGame.declareWinner(player2);
    fightGame.end();



    
  } else if(e.key == "l") {
    player2.heal();
    document.getElementById('heal-p2').play();
    updateDom(healthP2, player2);
    
  }
}




/*
** CLASS DECLARATIONS **
*/

// Enemies the player must avoid
class Enemy {
  constructor() {
    // The image for our enemies, this uses a helper to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Assign random starting position to the enemy object
    this.x = -100 - (Math.random() * 500);
    this.y = 60 + (Math.floor(Math.random() * 3) * 83);
    // Assign random speed to the enemy object
    this.speed = 150 + (Math.floor(Math.random() * 300));
  };

  // Update the enemy's position
  // Parameter: dt, a time delta between ticks
  update(dt) {

    // Check if enemy has moved offscreen,
    // re-set speed & position of enemy if so
    if (this.x > 500) {
      this.x = -100 - (Math.random() * 500);
      this.y = 60 + (Math.floor(Math.random() * 3) * 83);
      this.speed = 150 + (Math.floor(Math.random() * 300));
    }

    // Multiply any movement by the dt parameter to ensure the game runs
    // at the same speed for all computers.
    this.x += (this.speed * dt);

    // Continously check if the player has collided with an enemy,
    // re-set the player to starting position if a collision happens
    if (checkCollision()) {
      setTimeout(function() {
        player.x = 200;
        player.y = 320;
      }, 100);
    }

  }

  // Draw the enemy on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}


// The player
class Player {
  constructor() {
    // Assign a random character to the player object when instantiated
    const plyrImages = [
      'images/char-boy.png',
      'images/char-cat-girl.png',
      'images/char-horn-girl.png',
      'images/char-pink-girl.png',
      'images/char-princess-girl.png'
    ];
    const charIndex = Math.floor(Math.random() * 5);
    this.plyrImage = plyrImages[charIndex];
    this.x = 200;
    this.y = 320;
  }

  // Required from engine.js and based on project rubric,
  // but player position is actually updated in the handleInput method.
  update() {
  }

  // Draw the player on the screen
  render() {
    ctx.drawImage(Resources.get(this.plyrImage), this.x, this.y);

    // Check if player has reached the goal, and re-instatiate player if so.
    // Also displays congratulatory message.
    if (player.y < 0) {
      setTimeout(function() {window.alert("you win!");}, 1);
      player = new Player();
    }
  }

  // Update user position based on input from keyboard.
  handleInput(dir) {
    switch (dir) {
      case 'left':
        if (player.x > 0) {
          player.x -= 100;
          break;
        }
        break;
      case 'right':
        if (player.x < 400) {
          player.x += 100;
          break;
        }
        break;
      case 'up':
        if (player.y > 0) {
          player.y -= 83;
          break;
        }
        break;
      case 'down':
        if (player.y < 350) {
          player.y += 83;
          break;
        }
        break;
      default:
        break;
    };
  }
}

/*
** FUNCTION DECLARATIONS **
*/

// Function to check for collisions, runs inside enemy.update method
function checkCollision() {
  for (const enemy of allEnemies) {
    const xdiff = player.x - enemy.x;
    const ydiff = player.y - enemy.y;
    if (ydiff > 0 && ydiff < 15 && xdiff > -50 && xdiff < 75) {
      return true;
    }
  }
}

/*
** CODE EXECUTED ON LOAD **
*/

// Instatiate the player
let player = new Player();

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
for (var i = 0; i < 3; i++) {
  allEnemies.push(new Enemy());
}

// Listens for key presses and sends the key to the Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

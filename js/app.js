// Enemies our player must avoid
class Enemy {
  constructor() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Assign random starting position to the enemy object
    this.x = -100 - (Math.random() * 500);
    this.y = 60 + (Math.floor(Math.random() * 3) * 83);
    // Assign random speed to the enemy object
    this.speed = 150 + (Math.floor(Math.random() * 300));
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Check if enemy has moved offscreen, re-set speed & position of enemy if so
    if (this.x > 500) {
      this.x = -100 - (Math.random() * 500);
      this.y = 60 + (Math.floor(Math.random() * 3) * 83);
      this.speed = 150 + (Math.floor(Math.random() * 300));
    }

    this.x += (this.speed * dt);

    if (checkCollision()) {
      setTimeout(function() {
        player = new Player();
      }, 100);
    };
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.plyrImage = 'images/char-boy.png';
    this.x = 200;
    this.y = 320;
  }

  update() {
  }

  render() {
    ctx.drawImage(Resources.get(this.plyrImage), this.x, this.y);
  }

  handleInput(dir) {
    switch (dir) {
      case 'left':
        if (player.x > 0) {
          player.x -= 100;
          break;
        } else {
          break;
        };
      case 'right':
        if (player.x < 400) {
          player.x += 100;
          break;
        } else {
          break;
        };
      case 'up':
        if (player.y > 0) {
          player.y -= 83;
          break;
        } else {
          break;
        };
      case 'down':
        if (player.y < 350) {
          player.y += 83;
          break;
        } else {
          break;
        };
      default:
        break;
    };
  }
}

// Function to check for collisions, runs inside enemy.update method
function checkCollision() {
  for (const enemy of allEnemies) {
    const xdiff = player.x - enemy.x;
    const ydiff = player.y - enemy.y;
    if (ydiff > 0 && ydiff < 15 && xdiff > -50 && xdiff < 75) {
      return true;
    };
  }
}

// Now instantiate your objects.
// Place the player object in a variable called player
let player = new Player();

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
for (var i = 0; i < 3; i++) {
  allEnemies.push(new Enemy());
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

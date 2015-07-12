ig.module(
        'game.entities.player'
    )
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityPlayer = ig.Entity.extend({
            // Define the size of the entity based of the size of the image loaded.
            size: {
                x: 99,
                y: 75
            },
            // Create a new animSheet for our player's spaceShip and the dimensions of the image.
            animSheet: new ig.AnimationSheet('media/PNG/playerShip1_red.png', 99, 75),
            // Create a variable to hold the velocity of the player.
            PlayerVel: 250,
            // Change the max velocity of the entity from the default settings.
            maxVel: {
                x: 400,
                y: 200
            },
            // Create a timer to act as countdown for the weapon on the ship.
            laserTimer: new ig.Timer(),
            // Define the collision properties of the entity.
            collides: ig.Entity.COLLIDES.FIXED,
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,
            // Create two new sounds to be used for the laser when fired.
            laserSound: new ig.Sound('media/Sounds/laser1.ogg'),
            laserSound: new ig.Sound('media/Sounds/laser1.mp3'),

            init: function(x, y, settings) {

                this.parent(x, y, settings);
                // Add a new animation state.
                this.addAnim('idle', 1, [0]);
                // Set the laserTimer to 0.85 seconds.
                this.laserTimer.set(0.85);
                // Turn down the volume of the laserSound.
                this.laserSound.volume = 0.35;

            },

            update: function() {

                this.parent();
                // Use the input bindings created in the GameWorld to allow the player to move their ship.
                if (ig.input.state('Left')) {
                    this.vel.x -= this.PlayerVel;
                } else if (ig.input.state('Right')) {
                    this.vel.x += this.PlayerVel;
                } else {
                    this.vel.x = 0;
                }
                // Limit the movement of the player to ensure they don't go off screen.
                if (this.pos.x < 0) {
                    this.pos.x = 0;
                } else if (this.pos.x > ig.system.width - this.size.x) {
                    this.pos.x = ig.system.width - this.size.x;
                }
                // Once the 'laserTimer' counts down to 0; reset the count down, spawn in the laser (ships weapon) at players position with some adjustments and play the laser sound.
                if (this.laserTimer.delta() > 0) {

                    this.laserTimer.reset();

                    ig.game.spawnEntity(EntityLaser, this.pos.x + 45, this.pos.y - 54);

                    this.laserSound.play();

                }

            },
            // Check to see if the player collides with other entities (enemies).
            check: function(other) {
                // If they do kill the other entities and the player in addition to removing one life.
                other.kill();
                this.kill();
                ig.game.playerLives--;

            },

            draw: function() {
                this.parent();
            }

        });

        EntityLaser = ig.Entity.extend({
            // Define the size of the entity based of the size of the image loaded.
            size: {
                x: 9,
                y: 54
            },
            // Create a new animSheet for our laser and the dimensions of the image.
            animSheet: new ig.AnimationSheet('media/PNG/Lasers/laserRed01.png', 9, 54),
            // Create a variable to hold the velocity of the laser.
            LaserVel: 350,
            // Change the max velocity from the defaults.
            maxVel: {
                x: 250,
                y: 450
            },
            // Define collision properties of the laser.
            collides: ig.Entity.COLLIDES.FIXED,
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,

            init: function(x, y, settings) {

                this.parent(x, y, settings);
                // Add a new animation state.
                this.addAnim('idle', 1, [0]);

            },

            update: function() {

                this.parent();
                // Move the laser by taking the 'laserVel' away from the vel.
                this.vel.y -= this.LaserVel;
                // If the laser ever reaches the top of the screen then kill it to remove it from the game.
                if (this.pos.y < 0 - this.size.y) {
                    this.kill();
                }
            },
            // Check to see if the laser collides with other entities (enemies).
            check: function(other) {
                // If they do kill the other entitiy and the laser that made the collision in addition to adding 10 points to the player's score.
                other.kill();
                this.kill();
                ig.game.playerScore += 10;

            },

            draw: function() {
                this.parent();
            }

        });

    });

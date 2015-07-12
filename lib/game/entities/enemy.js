ig.module(
        'game.entities.enemy'
    )
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityEnemy = ig.Entity.extend({
            // Define the size of the entity based of the size of the image loaded.
            size: {
                x: 93,
                y: 84
            },
            // Change the max velocity from the default settings.
            maxVel: {
                x: 350,
                y: 350
            },
            // Create a new animSheet for our enemy's spaceShip and the dimensions of the image.
            animSheet: new ig.AnimationSheet('media/PNG/Enemies/enemyBlack1.png', 93, 84),
            // Define the collision properties of the entity.
            collides: ig.Entity.COLLIDES.FIXED,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,

            init: function(x, y, settings) {

                this.parent(x, y, settings);
                // Add a new animation state.
                this.addAnim('idle', 1, [0]);

            },

            update: function() {

                this.parent();
                // Move enemy down the screen with a velocity of 100.
                this.vel.y += 100;
                // If the enemy ever reaches the bottom of the screen then kill it to remove it from the game.
                if (this.pos.y > ig.system.height) {
                    this.kill();
                }

            },

            draw: function() {
                this.parent();
            }

        });
    });

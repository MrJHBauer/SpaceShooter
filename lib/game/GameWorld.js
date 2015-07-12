ig.module(
        'game.GameWorld'
    )
    .requires(
        'impact.game',
        'impact.font',
        'game.entities.player',
        'game.entities.enemy'
    )
    .defines(function() {

        GameWorld = ig.Game.extend({
            // Load a font
            font: new ig.Font('media/KenPixel.font.png'),
            // Create a variable to hold the map array that shall be used within the backgroundmaps.
            map: null,
            // Create varibles to hold the players score and lives.
            playerScore: 0,
            playerLives: 3,

            init: function() {
                // Define the map array to use image provided, creating a purple starfield as a background.
                this.map = [
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1],

                ];
                // Create the backgroundmap with a tilesize of 256, using the array created above and the tile located within the Backgrounds folder.
                this.backgroundMaps.push(new ig.BackgroundMap(256, this.map, 'media/Backgrounds/Purple.png'));
                // Create input to allow the player to control the ship in addition to restarting when needed.
                ig.input.bind(ig.KEY.LEFT_ARROW, 'Left');
                ig.input.bind(ig.KEY.RIGHT_ARROW, 'Right');

                ig.input.bind(ig.KEY.R, 'Restart');
                // Spawn the player's spaceship at the coords given.
                this.spawnEntity(EntityPlayer, (ig.system.width / 2) - 50, ig.system.height - 100);
            },

            update: function() {

                this.parent();
                // Get all of the Enemy Entities that are currently active within the Game. Creates an array.
                var enemies = this.getEntitiesByType(EntityEnemy);
                // Get the Player Entity currently within the Game. Creates an array
                var player = this.getEntitiesByType(EntityPlayer);
                // Check to see if there is one player within the game.
                if (player.length != 0) {
                    if (enemies.length < 2) { // If there is then check to see if the number of enemies within the game is less than two.
                        // If there less than two enemies within the game then spawn an new enemy within the game at random coords.
                        // These random coords are any where within width of the screen and 30 pixels above the height of screen.
                        // These allows the enemies to spawn somewhere outside of view.
                        this.spawnEntity(EntityEnemy,
                            Math.floor(Math.random() * (ig.system.width - 100)) + 2, -Math.floor(Math.random() * ig.system.height) - 30);
                    }
                } else if (player.length === 0 && enemies.length < 1 && this.playerLives >= 1) {
                    // This else if checks to see the it is save to spawn the player into the game.
                    // This means that the player is dead, there are no enemies on the screen and the player still has lives to use.
                    // If this all true then spawn the player into the same place the original spawn.
                    this.spawnEntity(EntityPlayer, (ig.system.width / 2) - 50, ig.system.height - 100);
                }

                if (this.playerLives < 1 && ig.input.pressed('Restart')) { // Check to see if the player has lost all of the lives and wants to restart by pressing the 'Restart' key.
                    // If so resest the score and lives.
                    this.playerScore = 0;
                    this.playerLives = 3;
                    // And reset the position of screen.
                    this.screen.y = 0;
                }

                if (this.playerLives < 1) {
                    // If the player has lost all of the lives move the screen up just like on the main menu to create the illusion of moving starfield background.
                    this.screen.y++
                        if (this.screen.y > 256) {
                            this.screen.y = 0;
                        }
                }

            },

            draw: function() {

                this.parent();
                // Draw different piece of text depending on the current gameState which is determine based on the number of lives the player has.
                if (this.playerLives >= 1) {
                    this.font.draw('Score: ' + this.playerScore, 10, 10, ig.Font.ALIGN.LEFT);
                    this.font.draw('Lives: ' + this.playerLives, ig.system.width - 10, 10, ig.Font.ALIGN.RIGHT);
                } else if (this.playerLives < 1) {
                    this.font.draw('GAMEOVER', ig.system.width / 2, 50, ig.Font.ALIGN.CENTER);
                    this.font.draw('Final Score: ' + this.playerScore, ig.system.width / 2, 70, ig.Font.ALIGN.CENTER);
                    this.font.draw("Press 'R' To Restart", ig.system.width / 2, ig.system.height - 50, ig.Font.ALIGN.CENTER);
                }

            }
        });
    });

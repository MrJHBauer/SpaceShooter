ig.module(
        'game.main'
    )
    .requires(
        'impact.game',
        'impact.font',
        'game.GameWorld'
    )
    .defines(function() {

        Main = ig.Game.extend({
            // Load font.
            font: new ig.Font('media/KenPixel.font.png'),
            // Create a variable to hold the map array that shall be used within the backgroundmaps.
            map: null,

            init: function() {
                // Define the map array to use image provided, creating a purple starfield as a background.
                this.map = [
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1],
                ];
                // Create the backgroundmap with a tilesize of 256, using the array created above and the tile located within the Backgrounds folder.
                this.backgroundMaps.push(new ig.BackgroundMap(256, this.map, 'media/Backgrounds/purple.png'));
                // Create input to allow the player to start the game with the 'Space' key.
                ig.input.bind(ig.KEY.SPACE, 'Start');

            },

            update: function() {

                this.parent();

                if (ig.input.pressed('Start')) {
                    // If the key binded to 'Start' is presed then change the game from the current one to the GameWorld.
                    ig.system.setGame(GameWorld);
                }
                // This allows the backround to move up in a continuous loop
                this.screen.y++; // Increment the vertical position of the screen
                if (this.screen.y > 256) { // Check to see the screen exceeds 256 - dimensions of the tile used in the backgroundmap
                    this.screen.y = 0; // If it does exceed set it 0 so the background doesn't disappear
                }

            },

            draw: function() {

                this.parent();
                // Draw the different peices of text to the main menu screen.
                this.font.draw('Space Shooter', ig.system.width / 2, 50, ig.Font.ALIGN.CENTER);

                this.font.draw("Press 'Space' To Start", ig.system.width / 2, ig.system.height - 150, ig.Font.ALIGN.CENTER);

                this.font.draw("Art By KENNEY.NL", 10, ig.system.height - 25, ig.Font.ALIGN.LEFT);
                this.font.draw("POWERED BY IMPACTJS", ig.system.width / 2, ig.system.height - 75, ig.Font.ALIGN.CENTER);
                this.font.draw("@JACK_HODGKISS", ig.system.width - 10, ig.system.height - 25, ig.Font.ALIGN.RIGHT);

            }
        });

        // Start the Game with 60fps, a resolution of 320x240, scaled
        // up by a factor of 2
        ig.main('#canvas', Main, 60, 540, 680, 1);

    });

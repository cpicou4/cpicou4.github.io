var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1,
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:600,y:335},
                {type: 'sawblade',x:900,y:410},
                {type: 'box',x:1500,y:groundY - 20}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        for (var i = 0; i < levelData.gameItems.length;i++) {
           var gameItem = levelData.gameItems[i];
            if (gameItem.type === "sawblade") {
            createSawBlade(gameItem.x,gameItem.y);
         }
            else if (gameItem.type === "box") {
                createBox(gameItem.x,gameItem.y);
            }
        }

        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;

            myObstacle.onPlayerCollision = function() {
                console.log('The sawlade has hit Halle');
                game.changeIntegrity(-10);
                myObstacle.fadeOut();
            }
      }
        function createBox(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var  myBox = game.createObstacle(hitZoneSize,damageFromObstacle);
            myBox.x = x;
            myBox.y = y;
            game.addGameItem(myBox);
            var shape = draw.rect(50, 50, '#2d1606');
            myBox.addChild(shape);
            shape.x = -25;
            shape.y = -25;

            myBox.onPlayerCollision = function() {
                console.log('The box has hit Halle');
                game.changeIntegrity(-10);
                myBox.fadeOut();
            }
        }
        function createEnemy(x, y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-15);
                enemy.fadeOut();
            };
            enemy.onProjectileCollision = function() {
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                enemy.shrink();
            };
        };
            createEnemy(400,groundY-10);
            createEnemy(800,groundY-100);
            createEnemy(1200,groundY-50);

        function createReward(x,y){
            var reward = game.createGameItem('reward', 25);
            var star = draw.bitmap('img/sawblade.png');
            star.x = -25;
            star.y = -25;
            reward.addChild(star);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = 0;
            reward.rotationalVelocity = 0;

            reward.onPlayerCollision = function() {
                console.log('Halle has collected reward');
                game.increaseScore(800);
                reward.shrink();
            }
        }
        createReward(1300,groundY-100);
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
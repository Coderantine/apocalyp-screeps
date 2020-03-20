var harvestingStrategy = require('strategy.harvesting');
var roomLevelingStrategy = require('strategy.roomLeveling');
var protectionStrategy = require('strategy.protection');
var buildingStrategy = require('strategy.building');

module.exports.loop = function () {
    
    for(var roomName in Game.rooms) {
        var room = Game.rooms[roomName];
        
        roomLevelingStrategy.run(room);
        harvestingStrategy.run(room);
        protectionStrategy.run(room);
        buildingStrategy.run(room);
    }
 
}
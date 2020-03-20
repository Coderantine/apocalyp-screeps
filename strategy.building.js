var helpers = require('helpers');
var roleBuilder = require('role.builder');

const MAX_BUILDERS = 2; 
const BUILDER_PER_CONSTRUCTION_SITE = 1;
const BUILDER_ROLE_NAME = 'builder';

var buildingStrategy = {
    run: function(room) {
       var constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
       var roomSpawns = room.find(FIND_MY_SPAWNS);
        if(roomSpawns.length == 0) {
            return;
        }
        
        var builders = _.filter(Game.creeps, c => c.memory.role == BUILDER_ROLE_NAME && c.memory.assignedRoomName == room.name);
        if(builders.length >= MAX_BUILDERS) {
            return;
        }
        
        for(var constructionSite of constructionSites) {
            var creepsAsignedToSite = _.filter(Game.creeps, c => c.memory.role == BUILDER_ROLE_NAME && c.memory.assignedRoomName == room.name && c.memory.assignedConstructionSiteId == constructionSite.id);
            if(creepsAsignedToSite.length < BUILDER_PER_CONSTRUCTION_SITE) {
                
                if(!helpers.isSafe(constructionSite, roomSpawns[0])) {
                    continue;
                }
                
                var randomId = _.random(10000, 99999);
                roomSpawns[0].spawnCreep(roleBuilder.body, `${room.name}.${roomSpawns[0].id}.${BUILDER_ROLE_NAME}.${randomId}`, 
                {
                    memory: {
                        role : BUILDER_ROLE_NAME,
                        assignedRoomName: room.name,
                        assignedSourceId: roomSpawns[0].id,
                        assignedConstructionSiteId: constructionSite.id
                    }
                });
            }
       }
       
        var builders = _.filter(Game.creeps, c => c.memory.assignedRoomName == room.name && c.memory.role == BUILDER_ROLE_NAME);
        for(var builder of builders) {
            roleBuilder.run(builder);
        }
    },
}

module.exports = buildingStrategy;
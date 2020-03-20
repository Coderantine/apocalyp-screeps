var helpers = require('helpers');
var roleHarvester = require('role.harvester');

const HARVESTER_PER_SOURCE = 2;
const HARVESTER_ROLE_NAME = 'harvester';

var harvestingStrategy = {
    run: function(room) {
        var sources = room.find(FIND_SOURCES_ACTIVE);
        if(sources.length == 0) {
            return;
        }
        
        var roomSpawns = room.find(FIND_MY_SPAWNS);
        if(roomSpawns.length == 0) {
            return;
        }
        
        for(var source of _.shuffle(sources)) {
            var creepAsignedToSource = _.filter(Game.creeps, c => c.memory.role == HARVESTER_ROLE_NAME && c.memory.assignedRoomName == room.name && c.memory.assignedSourceId == source.id);
            if(creepAsignedToSource.length < HARVESTER_PER_SOURCE) {
                
                if(!helpers.isSafe(source, roomSpawns[0])) {
                    continue;
                }
                
                var randomId = _.random(10000, 99999);
                roomSpawns[0].spawnCreep(roleHarvester.body, `${room.name}.${roomSpawns[0].id}.${HARVESTER_ROLE_NAME}.${randomId}`, 
                {
                    memory: {
                        role : HARVESTER_ROLE_NAME,
                        assignedRoomName: room.name,
                        assignedSourceId: source.id,
                        assignedStorageId: roomSpawns[0].id
                    }
                });
            }
        }

        var harvesters = _.filter(Game.creeps, c => c.memory.assignedRoomName == room.name && c.memory.role == HARVESTER_ROLE_NAME)
        for(var harvester of harvesters) {
            roleHarvester.run(harvester);
        }
        
    },
}

module.exports = harvestingStrategy;
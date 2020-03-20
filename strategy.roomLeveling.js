var roleRoomLevelUpgrader = require('role.roomLevelUpgrader');

const ROOM_LEVEL_UPGRADER_PER_STORAGE = 2;
const ROOM_LEVEL_UPGRADER_ROLE_NAME = 'roomLevelUpgrader';
const MIN_CREEPS_TO_START_ROOM_LEVELING = 3;

var roomLevelingStrategy = {
    run: function(room) {
        var allCreeps = _.filter(Game.creeps, (c) => c.memory.assignedRoomName == room.name);
        if(allCreeps.length < MIN_CREEPS_TO_START_ROOM_LEVELING) {
            return;
        }
        
        if(room.controller.level == 8) {
            return;
        }
        
        var storages = room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER);
                }});

        var roomSpawns = room.find(FIND_MY_SPAWNS);
        if(roomSpawns.length == 0) {
            return;
        }
        
        var shuffledStorages = _.shuffle(storages);
        
        for(var storage of shuffledStorages) {
            var creepAsignedToStorage = _.filter(Game.creeps, c => c.role = ROOM_LEVEL_UPGRADER_ROLE_NAME && c.memory.assignedRoomName == room.name && c.memory.assignedSourceId == storage.id);
            if(creepAsignedToStorage.length < ROOM_LEVEL_UPGRADER_PER_STORAGE) {
                var randomId = _.random(10000, 99999);
                roomSpawns[0].spawnCreep(roleRoomLevelUpgrader.body, `${room.name}.${roomSpawns[0].id}.${ROOM_LEVEL_UPGRADER_ROLE_NAME}.${randomId}`, 
                {
                    memory: {
                        role : ROOM_LEVEL_UPGRADER_ROLE_NAME,
                        assignedRoomName: room.name,
                        assignedSourceId: storage.id
                    }
                });
            }
        }

        var roomLevelUpgraders = _.filter(Game.creeps, c => c.memory.assignedRoomName == room.name && c.memory.role == ROOM_LEVEL_UPGRADER_ROLE_NAME)
        for(var levelUpgrader of roomLevelUpgraders) {
            roleRoomLevelUpgrader.run(levelUpgrader);
        }
        
    },
}


module.exports = roomLevelingStrategy;
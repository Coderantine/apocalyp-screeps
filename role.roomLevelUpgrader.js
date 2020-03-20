var roleRoomLevelUpgrader = {
    body: [WORK, CARRY, MOVE],
    run: function(creep) {
        if(creep.memory.assignedSourceId == undefined) {
            creep.say("No source asigned.");
            return;
        }
        debugger;
        var source = Game.getObjectById(creep.memory.assignedSourceId);

        if(source == null) {
            creep.say("Wrong source assigned.");
            return;
        }
        
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            if(creep.withdraw(source, RESOURCE_ENERGY, creep.store.getFreeCapacity(RESOURCE_ENERGY)) != OK) {
                creep.moveTo(source.pos)
            }
        } else {
            
            if(creep.upgradeController(creep.room.controller) != OK) {
                creep.moveTo(creep.room.controller.pos);
            }
        }
    }
}

module.exports = roleRoomLevelUpgrader;
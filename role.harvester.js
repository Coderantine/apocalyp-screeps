var roleHarvester = {
    body: [WORK, CARRY, MOVE, MOVE],
    run: function(creep) {
        if(creep.memory.assignedSourceId == undefined) {
            creep.say("No source asigned.");
            return;
        }

        if(creep.memory.assignedStorageId == undefined) {
            creep.say("No storage asigned.");
            return;
        }

        var source = Game.getObjectById(creep.memory.assignedSourceId);
        var storage = Game.getObjectById(creep.memory.assignedStorageId);

        if(source == null) {
            creep.say("Wrong source assigned.");
            return;
        }

        if(storage == null) {
            creep.say("Wrong storage assigned.");
            return;
        }

        if(creep.store.getFreeCapacity(RESOURCE_ENERGY) != 0) {
            if(creep.harvest(source) != OK) {
                creep.moveTo(source.pos)
            }
        } else {
            if(creep.transfer(storage, RESOURCE_ENERGY, creep.store.getUsedCapacity(RESOURCE_ENERGY)) != OK) {
                creep.moveTo(storage.pos);
            }
        }
    }
}

module.exports = roleHarvester;
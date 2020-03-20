var roleBuilder = {
    body: [WORK, WORK, CARRY, MOVE],
    run: function(creep) {
        if(creep.memory.assignedSourceId == undefined) {
            creep.say("No source asigned.");
            return;
        }
        
        if(creep.memory.assignedConstructionSiteId == undefined) {
            creep.say("No construction site asigned.");
            return;
        }

        var source = Game.getObjectById(creep.memory.assignedSourceId);
        if(source == null) {
            creep.say("Wrong source assigned.");
            return;
        }
        
        var cosntructionSite = Game.getObjectById(creep.memory.assignedConstructionSiteId);
        if(cosntructionSite == null) {
            creep.say("Wrong construction site.");
            return;
        }
        
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            if(creep.withdraw(source, RESOURCE_ENERGY, creep.store.getFreeCapacity(RESOURCE_ENERGY)) != OK) {
                creep.moveTo(source.pos)
            }
        } else {
            if(creep.build(cosntructionSite) != OK) {
                creep.moveTo(cosntructionSite.pos);
            }
        }
    }
}

module.exports = roleBuilder;
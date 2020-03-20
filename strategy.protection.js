var protectionStrategy = {
    run: function(room) {
       var hostileStructures = room.find(FIND_HOSTILE_STRUCTURES);
       var hostileCreeps = room.find(FIND_HOSTILE_CREEPS);
       
       if(hostileStructures.length > 0) {
           
       }
       
       if(hostileCreeps.length > 0) {
       }
       
    },
}


module.exports = protectionStrategy;
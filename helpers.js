const MIN_RANGE_FOR_SAFE_ENTITY = 5;

var helpers = {
    isSafe: function(source, destination) {
        var enemyCreepsNearSource = source.pos.findInRange(FIND_HOSTILE_CREEPS, MIN_RANGE_FOR_SAFE_ENTITY);
        if(enemyCreepsNearSource.length > 0) {
            return false;
        }
        
        var enemyCreepsNearDestination = destination.pos.findInRange(FIND_HOSTILE_CREEPS, MIN_RANGE_FOR_SAFE_ENTITY);
        if(enemyCreepsNearDestination.length > 0) {
            return false;
        }
        
        return true;
    }
}

module.exports = helpers;
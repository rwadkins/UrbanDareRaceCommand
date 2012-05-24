function Team() {
	this.bonuses = [];
	this.members = [];
}

Team.prototype.getRawTime = function() {
    var time = 0;
    var phoneyStart;
    var finished
    
    if (this.finished) {
        finshed = this.finished;
        if( typeof finished !== "Date" ) {
            finished = new Date(this.finished);
        }
        phoneyStart = new Date().today()
        time = finished - phoneyStart;
        if (app.currentRace && app.currentRace.start) {
            time = finished - app.currentRace.start;
        }
    }
    
    return time;
}

Team.prototype.getAdjustedTime = function() {
    var time = this.getRawTime();
    var i;
    var l = this.bonuses.length;
    var MILLS_IN_MIN = 60000;
    
    if (time) {
        for (i = 0; i < l; i += 1) {
            time = new Date(time - this.bonuses[i].amount * MILLS_IN_MIN);
        }    
    }
    
    return time;
}

Team.prototype.getBonuses = function() {
    var bonuses = 0;
    var i;
    var l = this.bonuses.length;
    
    for (var i = 0; i < l; i += 1) {
        bonuses += (this.bonuses[i].amount * 1);
    }
    
    return bonuses;
}

Team.prototype.getNamesString = function() {
    var nameString = '';
    var i = 0;
    var l = this.members.length;
    var names = [];
    for (i = 0; i < l; i += 1) {
        names.push([this.members[i].firstName, this.members[i].lastName].join(" "));
    }
    
    nameString = names.join(", ");
    
    return nameString;
}

Team.prototype.getFinishString = function() {
    var finishString = "";
    var rawT;
    var bonuses;
    var adjT;
    
    if (this.finished) {
        rawT = formatMilliseconds(this.getRawTime());
        bonuses = this.getBonuses();
        adjT = formatMilliseconds(this.getAdjustedTime());
        
        finishString = "<div class='teamTime'>" + 
                       "<span class='rawTime'>" + rawT + "</span>" +
                       "<span class='bonuses'> -" + bonuses + " Bonuses:</span>" +
                       "<span class='adjTime'>" + adjT + "</span>" +
                       "</div>"; 
    }
    
    return finishString;
}

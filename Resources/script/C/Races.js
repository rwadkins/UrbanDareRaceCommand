function Races(races) {
    var _this = this;
	this.races = races || [];
    this.racesList = new RacesList(this.races);
    this.racesList.render();
    this.racesList.itemClickCB = function() {
        _this.raceEditHandler.apply(_this, arguments);
    }
    var newRaceBtn = document.getElementById("raceNew");
    
    //instantiate a new racesList and fill with data    
    newRaceBtn.onclick = function() {
        _this.raceNewHandler.apply(_this, arguments);
    }
}

Races.prototype.createRace = function(race) {
	this.races.push(race);
	
	this.racesList.render();
	return race;
}

Races.prototype.getRace = function(raceNumber) {
	this.currentRace = this.races[raceNumber];
	return this.currentRace;
}

Races.prototype.startRace = function(raceStart) {
	var race = this.currentRace;
	
	race.start = raceStart;
}

Races.prototype.raceNewSaveHandler = function(race) {
    this.createRace.call(this, race);
}

Races.prototype.raceEditSaveHandler = function(race) {
    this.racesList.render();
    return race;
}

Races.prototype.raceNewHandler = function(e) {
    var _this = this;
    this.raceEdit = new RaceEdit( undefined, "add");
    // this.raceEdit.mode = "add";
    this.raceEdit.saveCB = function(race) {
        _this.raceNewSaveHandler.call(_this, race);
    };
}

Races.prototype.raceEditHandler = function(race) {
    var _this = this;
    this.raceEdit = new RaceEdit(race,"edit")
    // this.raceEdit.mode = "edit";
    this.raceEdit.saveCB = function(race) {
        _this.raceEditSaveHandler.call(_this, race);
    };
    app.currentRace = race;
    this.raceEdit.openRaceCB = this.openRaceCB;    
}



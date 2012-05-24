function RaceStart(race) {
    var saveBtn = document.getElementById("raceStartSave");
    var cancelBtn = document.getElementById("raceStartReset");
    
    var _this = this;
    
    this.fillRaceStartData(race);    
    this.race = race;
    
    this.el = document.getElementById("race_start");
    this.show();
    
    saveBtn.onclick = function() {
        _this.raceStartSaveHandler.apply(_this, arguments);
    };
    
    cancelBtn.onclick = function() {
        _this.raceStartResetHandler.apply(_this, arguments);
    };
}

RaceStart.prototype = new EditForm();
RaceStart.prototype.constructor = RaceStart;

RaceStart.prototype.raceStartSaveHandler = function(e) {
    var dtString = document.getElementsByName("raceStart")[0].value;
    
    //TODO: validation: derp
    var dt = new Date().fromTimeString(dtString);
    this.race.start = dt.valueOf();
    
    this.clearFields();
    this.hide();
}

RaceStart.prototype.raceStartResetHandler = function(e) {
    this.clearFields();
    this.hide();    
}

RaceStart.prototype.fillRaceStartData = function(race) {
    var dt = new Date();
    
    if (race.start) {
        dt = new Date(race.start);
    }
    
    document.getElementsByName("raceStart")[0].value = dt.toSimpleTimeString();
}

// RaceStart.prototype.show = function() {
    // this.el.style.display = "block";
// }
// 
// RaceStart.prototype.hide = function() {
    // this.el.style.display = "none";
// }

RaceStart.prototype.clearFields = function() {
    document.getElementsByName("raceStart")[0].value = "";
}

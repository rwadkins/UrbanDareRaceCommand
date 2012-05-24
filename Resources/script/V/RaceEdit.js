function RaceEdit(race, mode) {
    
    var saveBtn = document.getElementById("raceSave");
    var cancelBtn = document.getElementById("raceReset");
    var openBtn = document.getElementById("raceOpen");
    var startBtn = document.getElementById("raceStart");
    var addBonusBtn = document.getElementById("raceAddBonus");
    
    var _this = this;
    this.mode = mode;
    
    if (race) {
        this.fillRaceData(race);
    }
    else {
        race = new Race();
    }
    this.race = race;
    this.el = document.getElementById("race_edit");

    document.getElementById("raceBonusList").onclick = function () {
        _this.bonusClickHandler.apply(_this, arguments);
    }
 
    this.show();
        
    saveBtn.onclick = function() {
        _this.raceSaveHandler.apply(_this, arguments);
    }
    
    cancelBtn.onclick = function() {
        _this.raceResetHandler.apply(_this, arguments);
    }
    
    openBtn.onclick = function() {
        _this.raceOpenHandler.apply(_this, arguments);
    }
    
    startBtn.onclick = function() {
        _this.raceStartHandler.apply(_this, arguments);
    }
    
    addBonusBtn.onclick = function() {
        _this.raceBonusAddHandler.apply(_this, arguments);
    }
}

RaceEdit.prototype = new EditForm();
RaceEdit.prototype.constructor = RaceEdit;

RaceEdit.prototype.raceSaveHandler = function(e) {
    //validation duh
    this.race.date = document.getElementsByName("raceDate")[0].value;
    this.race.location = document.getElementsByName("raceLocation")[0].value;
    
    this.saveCB(this.race);
    
    this.clearFields();
    this.hide();
    app.saveData()
};

RaceEdit.prototype.raceResetHandler = function(e) {
    this.clearFields();
    this.hide();
};

RaceEdit.prototype.fillRaceData = function(race) {
    document.getElementsByName("raceDate")[0].value = race.date;
    document.getElementsByName("raceLocation")[0].value = race.location;
    
    // handle bonuses
    if (this.mode = "edit") {
        document.getElementById("raceStart").style.display = '';
        document.getElementById("raceOpen").style.display = '';
        document.getElementById("raceAddBonus").style.display = '';
        if (race.bonuses) {
            this.listBonuses(race.bonuses);
        }
    }
} 

// RaceEdit.prototype.show = function() {
    // this.el.style.display = 'block';
// }
// 
// RaceEdit.prototype.hide = function() {
    // this.el.style.display = "none";
// }

RaceEdit.prototype.clearFields = function() {
    document.getElementsByName("raceDate")[0].value = "";
    document.getElementsByName("raceLocation")[0].value = "";
    document.getElementById("raceStart").style.display = 'none';
    document.getElementById("raceOpen").style.display = 'none';
    document.getElementById("raceAddBonus").style.display = 'none';
}

RaceEdit.prototype.raceOpenHandler = function() {
    this.openRaceCB(this.race);
    this.hide();
}

RaceEdit.prototype.raceStartHandler = function(e) {
    this.raceStart = new RaceStart(this.race);
}

RaceEdit.prototype.raceBonusAddHandler = function(e) {
    var _this = this;
    this.addBonus = new BonusEdit(this.race, "add");
    this.addBonus.bonusUpdateCB = function() {
        _this.listBonuses.call(_this, this.race.bonuses);
    }
}

RaceEdit.prototype.listBonuses = function(bonuses) {
    var l = bonuses.length;
    var i = 0;
    var html = "";
    var bonus;
    
    for (i = 0; i < l; i += 1) {
        bonus = bonuses[i]
        html += "<bonus data-index='" + i + "' class='bonusEntry subList'>" +
                "<span 'bonusName'>" + [bonus.name, bonus.amount].join(": ") + "</span>" +
                "<a>x</a></span>";
    }
    
    document.getElementById("raceBonusList").innerHTML = html;
}

RaceEdit.prototype.bonusClickHandler = function(e) {
    var target = e.target;
    var liTarget;
    var i;
    var index;
    var bonus;
    
    if (target.tagName === "BONUS") {
        liTarget = target;
    }
    else if (target.parentElement.tagName === "BONUS") {
        liTarget = target.parentElement
    }
    else {
        return;
    }
    index = liTarget.attributes[0].value
    
    if (target.tagName === "A") {
        this.race.bonuses.splice(index,1);
        this.listBonuses(this.race.bonuses);
    }
    else {
        bonus = this.race.bonuses[index];
        var _this = this;
        this.addBonus = new BonusEdit(this.race, "edit", bonus);
        this.addBonus.bonusUpdateCB = function() {
            _this.listBonuses.call(_this, this.race.bonuses);
        }
    }

}

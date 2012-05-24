function Teams(race, backBtnCB, importBtnCB) {
    var _this = this;
    var newTeamBtn = document.getElementById("teamNew");
    var backBtn = document.getElementById("teamBack");
    var importBtn = document.getElementById("teamImport");
    var exportBtn = document.getElementById("teamExport");
    this.race = race;
    
    if (race.teams) {
        this.teamPrototyper(this.race.teams);
        exportBtn.style.display = "";
    }
    else {
        importBtn.style.display = "";
    }
    
    this.teamList = new TeamsList(race);
    this.teamList.render();
    this.teamList.itemClickCB = function() {
        _this.teamEditHandler.apply(_this,arguments);
    };
    
    newTeamBtn.onclick = function() {
        _this.teamNewHandler.apply(_this, arguments);
    };
    backBtn.onclick = backBtnCB;
    importBtn.onclick = importBtnCB;
    exportBtn.onclick = function() {
        _this.teamsExport.apply(_this, arguments);
    }
    
}

Teams.prototype.teamNewSaveHandler = function(team) {
    this.race.teams.push(team);
    
    this.teamList.render();
    return team;
};

Teams.prototype.teamEditSaveHandler = function(team) {
    this.teamList.render()
    return team;
};

Teams.prototype.teamNewHandler = function(e) {
    var _this = this;
    this.teamEdit = new TeamEdit();
    this.teamEdit.mode = "add";
    this.teamEdit.saveCB = function(team) {
        _this.teamNewSaveHandler.call(_this, team);
    };
};

Teams.prototype.teamEditHandler = function(team) {
    var _this = this;
    
    this.teamEdit = new TeamEdit(team);
    this.teamEdit.mode = "edit";
    this.teamEdit.saveCB = function(team) {
        _this.teamEditSaveHandler.call(_this,team);
    };
};

Teams.prototype.teamPrototyper = function(teams) {
    var _this = this;
    var i;
    var l = teams.length;
    
    if (! teams.prototyped ) {
        for (i = 0; i < l; i += 1) {
            teams[i].__proto__ = Team.prototype;
        }
    }
    
    teams.prototyped = true;
    
};

Teams.prototype.teamsExport = function() {
    var teams = this.teamList.teamsCache;
    var i = 0;
    var l = teams.length;
    var m = 0;
    var ml = 0;
    var t = ""
    var membersStrings = [];
    var outputString = "";
    
    for (i = 0; i < l; i += 1) {
        t = teams[i];
        
        ml = t.members.length;
        membersStrings = [];
        for (m = 0; m < ml; m += 1) {
            membersStrings.push([t.members[m].firstName, t.members[m].lastName].join(" "));
        }
        
        outputString += [
            i,
            t.number,
            t.name,
            membersStrings.join(" & "),
            ( t.finished ? formatMilliseconds(t.getRawTime()) : ""),
            ( t.finished ? t.getBonuses() : ""),
            ( t.finished ? formatMilliseconds(t.getAdjustedTime()) : ""),
        ].join(", ") + "\n"
    }
    
    console.log(outputString);
}

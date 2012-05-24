function UrbanDareCommand() {
    var _this = this;
    // initate a storage object and retrieve stored data
    var stor = new Lawnchair({
            name : "UrbanDareCommand"
        }, function(obj) {
            this.get('appData', function(rec) {
                //console.log('loaded record');
                //console.log(rec);
                var races;
                if (rec) {
                    //console.log('we have data, triggering data_changed');
                    races = rec.obj;
                }
                _this.races = new Races(races);
                _this.races.openRaceCB = function() {
                    _this.openRaceHandler.apply(_this, arguments);
                }                   
            })
        });
    // instantiate a raceList controller and pass in data (maybe)
    
    //garbage below here.
    // var races = [
        // {
            // date: '5/12/2012', 
            // location: 'New York',
            // bonuses: [
                // {
                    // name: "bonus 1",
                    // amount: 5
                // },
                // {
                    // name: "bonus 2",
                    // amount: 10
                // }
            // ],
            // teams: [
                // function () {
                    // var t = new Team();
                    // t.number = 20;
                    // t.name = "Other Team";
                    // return t;
                // }(),
                // function () {
                    // var t = new Team();
                    // t.number = 1;
                    // t.name = "Brookhouse Boys";
                    // return t;
                // }()
            // ]
        // }
    // ];
    
    
    document.body.onkeydown = function() {
        _this.keyHandler.apply(_this, arguments);
    }
}

UrbanDareCommand.prototype.keyHandler = function(e) {
    //console.log(e)
    if(this.currentRace && e.keyCode == 113) {
        this.teamFinish = new TeamFinish(this.currentRace.teams);
    }
    else if (e.target.name === "teamFinishNumber" && e.keyCode === 13) {
        document.getElementById("teamFinishSave").onclick();
    }

}
UrbanDareCommand.prototype.openRaceHandler = function(race) {
    var _this = this;
    var backBtnCB = function() {
        _this.closeRaceHandler.apply(_this, arguments);
    }
    var importBtnCB = function() {
        _this.ImportTeams.call(_this, race);
    }
    this.races.racesList.hide();
    this.teams = new Teams(race, backBtnCB, importBtnCB);
    this.teams.teamList.show();
    this.currentRace = race;
}

UrbanDareCommand.prototype.closeRaceHandler = function() {
    this.teams.teamList.hide();
    this.currentRace = undefined;
    this.races.racesList.show();
}

UrbanDareCommand.prototype.saveData = function() {
    var _this = this;
    
    var stor = new Lawnchair({
        name : "UrbanDareCommand"
    }, function(obj) {
        this.save({
            key : 'appData',
            obj : _this.races.races
        });
    });

}

UrbanDareCommand.prototype.nukeData = function() {
    new Lawnchair({
        name : "UrbanDareCommand"
    }, function(obj) {
        this.nuke();
    });

}

UrbanDareCommand.prototype.ImportTeams = function(race) {
    var _this = this;
    
    if (race.teams && race.teams.length) {
        return;
    }
    
    if (Titanium) {
        Titanium.UI.openFileChooserDialog(function(files) {
            fileChooserHandler.call(_this, race, files)
        } );
    }
    
    function fileChooserHandler(race, files) {
        var file = files.shift();
        var line;
        var rec;
        
        var fs = Titanium.Filesystem.getFileStream(file);
        
        fs.open(Titanium.Filesystem.MODE_READ);
        line = fs.readLine();
        line = fs.readLine();
        
        while( line != null) {
            rec = line.toString().splitCSV(",");
            
            if (rec[1] || rec[2] || rec[3]) {
                team = new Team();
                
                team.number = rec[0];
                member = {
                    firstName: rec[1],
                    lastName: rec[2],
                    email: rec[3]
                }
                team.members.push(member);
                if(rec[4] || rec[5] || rec[6]) {
                    member = {
                        firstName: rec[4],
                        lastName: rec[5],
                        email: rec[6]
                    }
                    team.members.push(member);
                }
                race.teams.push(team);
            }
            line = fs.readLine();
        }
        
        fs.close();
        app.teams.teamList.render();
    }
}
document.body.onload = function () {
    app = new UrbanDareCommand();
}



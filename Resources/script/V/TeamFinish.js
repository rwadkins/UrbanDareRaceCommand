function TeamFinish(teams, team) {
    var saveBtn = document.getElementById("teamFinishSave");
    var cancelBtn = document.getElementById("teamFinishReset");
    
    var _this = this;
    
    this.fillTeamFinishData(team);
    this.team = team;
    this.teams = teams;
    
    this.el = document.getElementById("team_finish");
    this.show();
    document.getElementsByName("teamFinishNumber")[0].focus();
    saveBtn.onclick = function() {
        _this.teamFinishSaveHandler.apply(_this, arguments);
    }
    
    cancelBtn.onclick = function() {
        _this.teamFinishResetHandler.apply(_this, arguments);
    }
}

TeamFinish.prototype = new EditForm();
TeamFinish.prototype.constructor = TeamFinish;

TeamFinish.prototype.teamFinishSaveHandler = function(e) {
    var dtString = document.getElementsByName("teamFinishTime")[0].value;
    var teamNumber = document.getElementsByName("teamFinishNumber")[0].value;
    var i;
    var l = this.teams.length;
    
    for (i = 0; i < l; i += 1) {
        if (this.teams[i].number == teamNumber) {
            this.teams[i].finished = new Date().fromTimeString(dtString).valueOf();
            break;
        }
    }
    
    //callback to refresh teams list with new sort
    app.teams.teamList.render();
    
    this.clearFields();
    this.hide();
    app.saveData();
}

TeamFinish.prototype.teamFinishResetHandler = function(e) {
    this.clearFields();
    this.hide();
}

TeamFinish.prototype.fillTeamFinishData = function(team) {
    var dt = new Date();
    
    document.getElementsByName("teamFinishTime")[0].value = dt.toSimpleTimeString();
    
}

TeamFinish.prototype.clearFields = function(team) {
    document.getElementsByName("teamFinishNumber")[0].value = "";
    document.getElementsByName("teamFinishTime")[0].value = "";
}

// TeamFinish.prototype.show = function() {
    // this.el.style.display = "block";
// }
// 
// TeamFinish.prototype.hide = function() {
    // this.el.style.display = "none";
// }

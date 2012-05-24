function TeamEdit(team, mode) {
    var saveBtn = document.getElementById("teamSave");
    var cancelBtn = document.getElementById("teamReset");
    var addMemberBtn = document.getElementById("teamAddMember");
    var addBonusBtn = document.getElementById("teamAddBonus");
    var _this = this;
    this.mode = mode;
    
    if (team) {
        this.fillTeamData(team);
    }
    else {
        team = new Team();
    }
    
    this.team = team;
    this.el = document.getElementById("team_edit");
    
    document.getElementById("teamMemberList").onclick = function () {
        _this.memberClickHandler.apply(_this, arguments);
    }
    
    document.getElementById("teamBonusList").onclick = function() {
        _this.bonusClickHandler.apply(_this, arguments);
    }
    
    this.show();
    
    saveBtn.onclick = function() {
        _this.teamSaveHandler.apply(_this, arguments);
    };
    
    cancelBtn.onclick = function() {
        _this.teamResetHandler.apply(_this, arguments);
    };
    
    addMemberBtn.onclick = function() {
        _this.teamAddMemberHandler.apply(_this, arguments);
    };
    
    addBonusBtn.onclick = function() {
        _this.teamAddBonusHandler.apply(_this, arguments);
    };
}

TeamEdit.prototype = new EditForm();
TeamEdit.prototype.constructor = TeamEdit;

TeamEdit.prototype.teamSaveHandler = function(e) {
    this.team.number = document.getElementsByName("teamNumber")[0].value;
    this.team.name = document.getElementsByName("teamName")[0].value;
    
    this.saveCB(this.team);
    
    this.clearFields();
    this.hide();
    app.saveData();
};

TeamEdit.prototype.teamResetHandler = function(e) {
    this.clearFields();
    this.hide();
};

TeamEdit.prototype.fillTeamData = function(team) {
    document.getElementsByName("teamNumber")[0].value = team.number;
    document.getElementsByName("teamName")[0].value = team.name;
    
    if (this.mode = "edit") {
        document.getElementById("teamAddMember").style.display = "";
        document.getElementById("teamAddBonus").style.display = "";
        if (team.members) {
            this.listMembers(team.members);
        }
        if (team.bonuses) {
            this.listBonuses(team.bonuses);
        }
    }
    //handle Bonuses
}

TeamEdit.prototype.clearFields = function() {
    document.getElementsByName("teamNumber")[0].value = "";
    document.getElementsByName("teamName")[0].value = "";
    document.getElementById("teamAddMember").style.display = "none";
    document.getElementById("teamAddBonus").style.display = "none";
}

TeamEdit.prototype.teamAddMemberHandler = function(e) {
    var _this = this;
    this.addMember = new MemberEdit(this.team, "add");
    this.addMember.memberUpdateCB = function() {
        _this.listMembers.call(_this, this.team.members);
    }
}

TeamEdit.prototype.listMembers = function(members) {
    var l = members.length;
    var i = 0;
    var html = "";
    var member;
    
    for (i = 0; i < l; i += 1) {
        member = members[i]
        html += "<member data-index='" + i + "' class='memberEntry subList'>" +
                "<span 'memberName'>" + [member.firstName, member.lastName].join(" ") + "</span>" +
                "<a>x</a></member>";
    }
    
    document.getElementById("teamMemberList").innerHTML = html;
}

TeamEdit.prototype.memberClickHandler = function(e) {
    var target = e.target;
    var liTarget;
    var i;
    var index;
    var member;
    
    if (target.tagName === "MEMBER") {
        liTarget = target;
    }
    else if (target.parentElement.tagName === "MEMBER") {
        liTarget = target.parentElement
    }
    else {
        return;
    }
    index = liTarget.attributes[0].value
    
    if (target.tagName === "A") {
        this.team.members.splice(index,1);
        this.listMembers(this.team.members);
    }
    else {
        member = this.team.members[index];
        var _this = this;
        this.addMember = new MemberEdit(this.team, "edit", member);
        this.addMember.memberUpdateCB = function() {
            _this.listMembers.call(_this, this.team.members);
        }
    }
    app.saveData();
}

TeamEdit.prototype.listBonuses = function(bonuses) {
    var l = bonuses.length;
    var i = 0;
    var html = "";
    var bonus;
    
    for (i = 0; i < l; i += 1) {
        bonus = bonuses[i]
        html += "<bonus data-index='" + i + "' class='bonusEntry subList'>" +
                "<span 'bonusName'>" + [bonus.name, bonus.amount].join(": ") + "</span>" +
                "<a>x</a></bonus>";
    }
    
    document.getElementById("teamBonusList").innerHTML = html;
}

TeamEdit.prototype.bonusClickHandler = function(e) {
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
        this.team.bonuses.splice(index,1);
        this.listBonuses(this.team.bonuses);
        this.teamBonusEdit.fillTeamBonusData();
    }
    app.saveData();
}

TeamEdit.prototype.teamAddBonusHandler = function(e) {
    var _this = this;
    if (! this.team.bonuses) {
        this.team.bonuses = [];
    } 
    this.teamBonusEdit = new TeamBonusEdit(this.team.bonuses);
    this.teamBonusEdit.addBonusCB = function() {
        _this.listBonuses.call(_this, _this.team.bonuses);
    }
    app.saveData();
}

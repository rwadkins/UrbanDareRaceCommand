function TeamBonusEdit(bonuses) {
    var doneBtn = document.getElementById("teamBonusDone");
    
    var _this = this;
    
    this.bonuses = bonuses;
    
    this.el = document.getElementById("team_bonus_edit");
    
    this.fillTeamBonusData();
    this.show();
    
    document.getElementById("teamRaceBonusList").onclick = function () {
        _this.teamRaceBonusItemClickHandler.apply(_this, arguments);
    }
    
    doneBtn.onclick = function() {
        _this.teamRaceBonusDoneClickHandler.apply(_this,arguments);
    }
}

TeamBonusEdit.prototype = new EditForm();
TeamBonusEdit.prototype.constructor = TeamBonusEdit;

TeamBonusEdit.prototype.teamRaceBonusDoneClickHandler = function(e) {
    this.hide();
}

// TeamBonusEdit.prototype.show = function() {
    // this.el.style.display = 'block';
// }
// 
// TeamBonusEdit.prototype.hide = function() {
    // this.el.style.display = "none";
// }

TeamBonusEdit.prototype.fillTeamBonusData = function() {
    var prunedBonuses = this.pruneRaceBonuses();
    this.listBonuses(prunedBonuses);    
};

TeamBonusEdit.prototype.pruneRaceBonuses = function() {
    var raceBonuses = app.currentRace.bonuses.slice(0);
    var l = this.bonuses.length;
    // var i;
    var j;
    
    for (var i = 0; i < l; i += 1) {
        console.log(i);
        j = raceBonuses.indexOf(this.bonuses[i]);
        if ( j != -1 ) {
            raceBonuses.splice(j,1);
        }
    }
    
    return raceBonuses;
}

TeamBonusEdit.prototype.listBonuses = function(bonuses) {
    var l = bonuses.length;
    var i = 0;
    var html = "";
    var bonus;
    this.bonusesCache = bonuses;
    for (i = 0; i < l; i += 1) {
        bonus = bonuses[i]
        html += "<bonus data-index='" + i + "' class='bonusEntry subList'>" +
                "<span 'bonusName'>" + [bonus.name, bonus.amount].join(": ") + "</span>" +
                "</span>";
    }
    
    document.getElementById("teamRaceBonusList").innerHTML = html;
}

TeamBonusEdit.prototype.teamRaceBonusItemClickHandler = function(e) {
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
    
    this.bonuses.push(this.bonusesCache[index]);
    this.addBonusCB();
    this.fillTeamBonusData();
    app.saveData();
}

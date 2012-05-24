function TeamsList(race) {
    var _this = this;
    this.race = race;
    if (! this.race.teams ) {
        this.race.teams = [];
    }
    this.el = document.getElementById("teams_list");
    this.el.onclick = function() {
        _this.itemListClickHandler.apply(_this, arguments);
    }
    
    this.teamsCache = [];
}

TeamsList.prototype.sortList = function(teams) {
    var list = teams.slice(0);
    list.sort(function(a,b) {
        var aTime, bTime;
        aTime = a.getAdjustedTime();
        bTime = b.getAdjustedTime();
        
        if ( aTime === 0 && bTime !== 0 ) {
            return 1;
        }
        else if (aTime !== 0 && bTime === 0) {
            return -1
        }
        else if (aTime > bTime) {
            return 1;
        }
        else if (aTime < bTime) {
            return -1;
        }
        else if (a.number > b.number) {
            return 1;
        }
        else if (b.number < a.number) {
            return -1;
        }
        return 0;
            
    })
    
    return list;
}

TeamsList.prototype.fillList = function(teams) {
    var l = teams.length;
    var i = 0;
    var html = "";
    
    for (i = 0; i < l; i += 1) {
        html += this.itemRender(teams[i],i);
    }
    
    this.el.innerHTML = html;
}

TeamsList.prototype.render = function() {
    var teams = this.sortList(this.race.teams);
    this.fillList(teams);
}

TeamsList.prototype.itemRender = function(team, i) {
    this.teamsCache[i] = team;
    
    //data-index must remain the first attribute
    return "<li data-index='" + i + "'>" +
           "<span class='teamNumber teamItemDetail'>" + team.number + "</span> " +
           "<span class='teamName teamItemDetail'>" + (team.name || team.getNamesString()) + "</span>" +
           team.getFinishString() +
           "<span class='teamPos teamItemDetail'>" + (i * 1 + 1) + "</span>" +
           "</li>";
}


TeamsList.prototype.itemListClickHandler = function(e) {
    var target = e.target;
    var liTarget; 
    var i;
    var team;
    
    if (target.tagName === "LI") {
        liTarget = target;
    }
    else if (target.parentElement.tagName === "LI") {
        liTarget = target.parentElement
    }
    else {
        // not an element we care about
        return;
    }
    
    team = this.teamsCache[liTarget.attributes[0].value]
    this.itemClickCB(team);
}

TeamsList.prototype.show = function() {
    this.el.parentElement.parentElement.removeClass("hidden");
}

TeamsList.prototype.hide = function() {
    this.el.parentElement.parentElement.addClass("hidden");
}

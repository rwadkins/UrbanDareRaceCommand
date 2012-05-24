function RacesList(races) {
    var _this = this;
    this.races = races;
    
    this.el = document.getElementById("race_list");
    this.el.onclick = function () {
        _this.itemListClickHandler.apply(_this, arguments);
    }
    //sort the races list
    
    this.racesCache = [];
}

RacesList.prototype.sortList = function(races) {
    var list = races.slice(0);
    
    list.sort(function(a,b) {
        var aDate, bDate;
        
        aDate = new Date(a.date);
        bDate = new Date(b.date);
        
        if (aDate > bDate) {
            return -1;
        }
        else if (aDate < bDate) {
            return 1;
        }
        else if (a.location.toLowerCase() > b.location.toLowerCase()) {
            return 1;
        }
        else if (a.location.toLowerCase() < b.location.toLowerCase()) {
            return -1
        }
        
        return 0;
    });
    return list;
}

RacesList.prototype.fillList = function(races) {
    var l = races.length;
    var i = 0;
    var html = "";
    
    for (i = 0; i < l; i += 1) {
        html += this.itemRender(races[i], i);
    }
    
    this.el.innerHTML = html;
}

RacesList.prototype.render = function() {
    var races = this.sortList(this.races);
    this.fillList(races);
}

RacesList.prototype.itemRender = function(race, i) {
    this.racesCache[i] = race;
    
    //data-index must remain the first attribute
    return "<li data-index='" + i + "'>" + 
           "<span class='raceDate raceItemDetail'>" + race.date + '</span>' +
           "<span class='raceLocation raceItemDetail'>" + race.location + "</span>" +
           "</li>";
}

RacesList.prototype.itemListClickHandler = function(e) {
    var target = e.target;
    var liTarget; 
    var i;
    var race;
    
    if (target.tagName === "LI") {
        liTarget = target;
    }
    else if (target.parentElement.tagName === "LI") {
        liTarget = target.parentElement;
    }
    else {
        // not an element we care about
        return;
    }
    
    race = this.racesCache[liTarget.attributes[0].value];
    this.itemClickCB(race);
}

RacesList.prototype.show = function() {
    this.el.parentElement.parentElement.style.display = 'block';
}

RacesList.prototype.hide = function() {
    this.el.parentElement.parentElement.style.display = 'none';
}

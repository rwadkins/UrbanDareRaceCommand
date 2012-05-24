function BonusEdit(race, mode, bonus) {
    var saveBtn = document.getElementById("bonusSave");
    var cancelBtn = document.getElementById("bonusReset");
    
    var _this = this;
    
    this.mode = mode;
    
    if (bonus) {
        this.fillBonusData(bonus);
    }
    else {
        bonus = {};
    }
    
    this.bonus = bonus;
    this.race = race;
    this.el = document.getElementById("bonus_edit");
    this.show();
    
    saveBtn.onclick = function() {
        _this.bonusSaveHandler.apply(_this, arguments);
    }
    
    cancelBtn.onclick = function() {
        _this.bonusResetHandler.apply(_this, arguments);
    }
} 

BonusEdit.prototype = new EditForm();
BonusEdit.prototype.constructor = BonusEdit;

BonusEdit.prototype.bonusSaveHandler = function(e) {
    this.bonus.name = document.getElementsByName("bonusName")[0].value;
    this.bonus.amount = document.getElementsByName("bonusAmount")[0].value;
    
    if (this.mode === "add") {
        if (! this.race.bonuses) {
            this.race.bonuses = [];
        }
        this.race.bonuses.push(this.bonus);
    }
    
    this.bonusUpdateCB();
    this.clearFields();
    this.hide();
    app.saveData();
};

BonusEdit.prototype.bonusResetHandler = function(e) {
    this.clearFields();
    this.hide();
};

BonusEdit.prototype.fillBonusData = function(bonus) {
    document.getElementsByName("bonusName")[0].value = bonus.name;
    document.getElementsByName("bonusAmount")[0].value = bonus.amount
};


// BonusEdit.prototype.show = function() {
    // this.el.style.display = 'block';
// };
// 
// BonusEdit.prototype.hide = function() {
    // this.el.style.display = "none";
// };

BonusEdit.prototype.clearFields = function() {
    document.getElementsByName("bonusName")[0].value = "";
    document.getElementsByName("bonusAmount")[0].value = "";
};
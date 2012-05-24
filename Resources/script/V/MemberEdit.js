function MemberEdit(team, mode, member) {
    var saveBtn = document.getElementById("memberSave");
    var cancelBtn = document.getElementById("memberReset");
    
    var _this = this;
    
    this.mode = mode;
    
    if (member) {
        this.fillMemberData(member);
    }
    else {
        member = {};
    }
    
    this.member = member;
    this.team = team;
    this.el = document.getElementById("member_edit");
    this.show();
    
    saveBtn.onclick = function() {
        _this.memberSaveHandler.apply(_this, arguments);
    };
    
    cancelBtn.onclick = function() {
        _this.memberResetHandler.apply(_this, arguments);
    }
}

MemberEdit.prototype = new EditForm();
MemberEdit.prototype.constructor = MemberEdit;

MemberEdit.prototype.memberSaveHandler = function(e) {
    this.member.firstName = document.getElementsByName("memberFirstName")[0].value;
    this.member.lastName = document.getElementsByName("memberLastName")[0].value;
    this.member.email = document.getElementsByName("memberEMail")[0].value;
    
    if (this.mode === "add") {
        if (! this.team.members) {
            this.team.members = [];
        }
        this.team.members.push(this.member);
    }
    this.memberUpdateCB();
    this.clearFields();
    this.hide();
    app.saveData();
};

MemberEdit.prototype.memberResetHandler = function(e) {
    this.clearFields();
    this.hide();
}

MemberEdit.prototype.fillMemberData = function(member) {
    document.getElementsByName("memberFirstName")[0].value = member.firstName;
    document.getElementsByName("memberLastName")[0].value = member.lastName;
    document.getElementsByName("memberEMail")[0].value = member.email;
}

// MemberEdit.prototype.show = function() {
    // this.el.style.display = 'block';
// }
// 
// MemberEdit.prototype.hide = function() {
    // this.el.style.display = "none";
// }

MemberEdit.prototype.clearFields = function() {
    document.getElementsByName("memberFirstName")[0].value = "";
    document.getElementsByName("memberLastName")[0].value = "";
    document.getElementsByName("memberEMail")[0].value = "";
}
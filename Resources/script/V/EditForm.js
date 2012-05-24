function EditForm() {
    
}

EditForm.prototype.show = function() {
    this.el.removeClass("hidden");
}

EditForm.prototype.hide = function() {
    this.el.addClass("hidden");
}

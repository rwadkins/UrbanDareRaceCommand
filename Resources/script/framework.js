Date.prototype.fromTimeString = function(timeString) {
    var parts = timeString.split(":");
    
    var dtNow = new Date();
    
    this.setYear(dtNow.getFullYear());
    this.setMonth(dtNow.getMonth());
    this.setDate(dtNow.getDate());
    this.setHours(parts[0]);
    this.setMinutes(parts[1]);
    this.setSeconds(parts[2]);
    
    return this;
}

Date.prototype.toSimpleTimeString = function() {
    var output = "";
    
    output = [this.getHours(), this.getMinutes(), this.getSeconds()].join(":");
    
    return output;
}

Date.prototype.today = function() {
    var dt = new Date();
    
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    
    return dt;
}

String.prototype.splitCSV = function(sep) {
  for (var foo = this.split(sep = sep || ","), x = foo.length - 1, tl; x >= 0; x--) {
    if (foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) == '"') {
      if ((tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
        foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
      } else if (x) {
        foo.splice(x - 1, 2, [foo[x - 1], foo[x]].join(sep));
      } else foo = foo.shift().split(sep).concat(foo);
    } else foo[x].replace(/""/g, '"');
  } return foo;
};

function formatMilliseconds(mills) {
    var hours;
    var minutes;
    var seconds;
    var scratch;
    
    scratch = mills /  86400000 * 24;
    hours = parseInt(scratch);
    
    scratch -= hours;
    scratch *= 60;
    minutes = parseInt(scratch);
    
    scratch -= minutes;
    scratch *= 60;
    seconds = parseInt(scratch);
    
    return [zeroPad(hours), zeroPad(minutes), zeroPad(seconds)].join(":");
}

function zeroPad(value) {
    var returnVal = value.toString();
    
    if(value.toString().length == 1) {
        returnVal = "0" + value.toString();
    }
    
    return returnVal;
}

if (! HTMLElement.prototype.addClass) {
    HTMLElement.prototype.addClass = function(htmlclass) {
        var classes = this.className.split(" ");
        var i = 0;
        var l = classes.length;
        var foundClass = false;
        
        for (i = 0; i < l; i += 1) {
            if (classes[i] === htmlclass) {
                foundClass = true;
                break;
            }
        }
        
        if ( ! foundClass ) {
            classes.push(htmlclass);
        }
        
        this.className = classes.join(" ");
    }
}

if (! HTMLElement.prototype.removeClass) {
    HTMLElement.prototype.removeClass = function(htmlclass) {
        var classes = this.className.split(" ");
        var i = 0;
        var l = classes.length;

        for (i = 0; i < l; i += 1) {
            if (classes[i] === htmlclass) {
                classes.splice(i,1);
                break;
            }
        }
        this.className = classes.join(" ");
    }
}

"use strict";
var Task  = function(innerTask){
    this.innerTask = innerTask;
};
Task.prototype.start = function(){
    return new Promise(this.innerTask);
};
module.exports = Task;
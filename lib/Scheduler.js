"use strict";
var _defaults = {
    tasks: [],
    maxLoad :1 ,
    onTaskStart : function(task){},

};
var Scheduler = function(options){

    this.maxLoad = options.maxLoad|| _defaults.maxLoad;
    this.tasks = options.tasks|| _defaults.tasks;
    this.onTaskStart = options.onTaskStart || _defaults.onTaskStart;
    this.runningTasks = 0;

};

Scheduler.prototype._execute = function(res,rej){
    var promises = [];

    for(var i=0;
        i<this.maxLoad &&
        this.maxLoad>this.runningTasks;
        i++){
        var task = this.tasks.shift();

        this.runningTasks++;
        this.onTaskStart(task);
        promises.push(task.start().then(function(){
            this.runningTasks--;
        }.bind(this)));
    }

    Promise.race(promises).then(function(result){
        if(this.tasks.length>0){
            this._execute(res,rej);
        }else{
            res(result);
        }
    }.bind(this)).catch(rej);

};

Scheduler.prototype.execute = function(){
    return new Promise(this._execute.bind(this));
};
Scheduler.prototype.getCurrentLoad = function(){
    return this.runningTasks;
};

module.exports = Scheduler;
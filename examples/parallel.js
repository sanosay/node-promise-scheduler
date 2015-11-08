"use strict";
var Scheduler = require('../index').Scheduler;
var Task = require('../index').Task;

var tasks = [];
for(let i=0;i<100;i++){
    tasks.push(new Task(function(res,rej){
        setTimeout(function(){
            console.log(i);
            res(true);
        },1000*Math.random());
    }));
}

var scheduler = new Scheduler({tasks:tasks,maxLoad:2,onTaskStart: function(task){
    console.log('Current load '+scheduler.getCurrentLoad());
}});
scheduler.execute();



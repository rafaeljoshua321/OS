function calculate(p){
p.tat=p.ct-p.at;
p.wt=p.tat-p.bt;
p.rt=p.start-p.at;
}

function fcfs(list){
let time=0;
let chart=[];
list.sort((a,b)=>a.at-b.at);

for(let p of list){
if(time<p.at){
chart.push({id:"IDLE",s:time,e:p.at});
time=p.at;
}
p.start=time;
time+=p.bt;
p.ct=time;
calculate(p);
chart.push({id:p.id,s:p.start,e:p.ct});
}
return chart;
}

function sjf(list){
let time=0;
let chart=[];
let done=[];

while(list.length){
let ready=list.filter(x=>x.at<=time);
if(ready.length===0){time++;continue;}

ready.sort((a,b)=>a.bt-b.bt);
let p=ready[0];
list.splice(list.indexOf(p),1);

p.start=time;
time+=p.bt;
p.ct=time;
calculate(p);
done.push(p);
chart.push({id:p.id,s:p.start,e:p.ct});
}
return chart;
}

function roundRobin(list,q){
let time=0;
let queue=[];
let chart=[];

list.sort((a,b)=>a.at-b.at);
queue=[...list];

while(queue.length){
let p=queue.shift();

if(p.start===null)p.start=time;

let run=Math.min(q,p.remaining);

chart.push({id:p.id,s:time,e:time+run});

time+=run;
p.remaining-=run;

if(p.remaining>0){
queue.push(p);
}else{
p.ct=time;
calculate(p);
}
}
return chart;
}

function srtf(list){
return fcfs(list);
}

function priorityScheduling(list){
let time=0;
let chart=[];
let done=[];

while(list.length){
let ready=list.filter(x=>x.at<=time);
if(ready.length===0){time++;continue;}

ready.sort((a,b)=>a.priority-b.priority);
let p=ready[0];
list.splice(list.indexOf(p),1);

p.start=time;
time+=p.bt;
p.ct=time;
calculate(p);
done.push(p);
chart.push({id:p.id,s:p.start,e:p.ct});
}
return chart;
}

function mlfq(list){
return roundRobin(list,2);
}

function execute(list,type,q){
if(type==="SJF")return sjf(list);
if(type==="Round Robin")return roundRobin(list,q);
if(type==="SRTF")return srtf(list);
if(type==="MLFQ")return mlfq(list);
if(type==="Priority")return priorityScheduling(list);
return fcfs(list);
}
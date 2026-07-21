let processes=[];

function add(){
processes.push(new Process(
"P"+(processes.length+1),
Number(at.value),
Number(bt.value),
Number(priority.value)
));
show();
}

function sample(){
processes=[
new Process("P1",2,2,3),
new Process("P2",1,5,1),
new Process("P3",3,4,4),
new Process("P4",5,7,2),
new Process("P5",2,8,5)
];
show();
}

function show(){
processTable.innerHTML="<tr><th>PID</th><th>AT</th><th>BT</th><th>Priority</th></tr>";
processes.forEach(p=>{
processTable.innerHTML+=`<tr><td>${p.id}</td><td>${p.at}</td><td>${p.bt}</td><td>${p.priority}</td></tr>`;
});
}

function simulate(){
let copy=processes.map(p=>Object.assign(new Process(),p));

let chart=execute(copy,algo.value,Number(quantum.value));

gantt.innerHTML="";
chart.forEach(x=>{
gantt.innerHTML+=`<div class="block">${x.id}<br>${x.s}-${x.e}</div>`;
});

resultTable.innerHTML=
"<tr><th>PID</th><th>CT</th><th>TAT</th><th>WT</th><th>RT</th></tr>";

copy.forEach(p=>{
resultTable.innerHTML+=
`<tr><td>${p.id}</td><td>${p.ct}</td><td>${p.tat}</td><td>${p.wt}</td><td>${p.rt}</td></tr>`;
});

if(algo.value==="MLFQ"){
queuePanel.style.display="block";
queueDisplay.innerHTML="";
chart.forEach(x=>{
queueDisplay.innerHTML+=
`<div class="queue-card"><div class="queue-pid">${x.id}</div><div class="queue-range">${x.s} &rarr; ${x.e}</div><div class="queue-level">Q0</div></div>`;
});
}else{
queuePanel.style.display="none";
queueDisplay.innerHTML="";
}

status.innerHTML="Simulation Finished";
}

function resetAll(){
processes=[];
show();
gantt.innerHTML="";
resultTable.innerHTML="";
}

sample();
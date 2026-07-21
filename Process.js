class Process{
constructor(id,at,bt,priority){
this.id=id;
this.at=at;
this.bt=bt;
this.priority=priority===undefined?0:priority;
this.remaining=bt;
this.start=null;
this.ct=0;
this.tat=0;
this.wt=0;
this.rt=0;
}
}
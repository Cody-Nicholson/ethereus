import {Component, OnInit, Input} from '@angular/core';

const WAITING = 'waiting';
const COMPLETE = 'complete';
const PENDING = 'pending';
const FAILED = 'failed';

export class QueueItem{
    id: any;
    status: string;

    constructor(id){
        this.id = id;
        this.status = WAITING;
    }

    get pending(){
        return this.status == PENDING;
    }

    get failed(){
        return this.status == FAILED;
    }

    get waiting(){
        return this.status == WAITING;
    }

    get complete(){
        return this.status == COMPLETE;
    }

    setAsPending(){
        this.status = PENDING;
    }

    setAsComplete(){
        this.status = COMPLETE;
    }

    setAsFailed(){
        this.status = FAILED;
    }
}


@Component({
    selector: 'kpi-queue-bar',
    template: `
        <div class="queue-bar"
             [ngClass]="{
                'queue-bar-waiting': item.waiting,
                'queue-bar-pending': item.pending,
                'queue-bar-complete': item.complete,
                'queue-bar-failed': item.failed
             }">
        </div>
   `
})
export class KpiQueueBar implements OnInit {

    @Input() item: QueueItem;

    ngOnInit() {
    }
}

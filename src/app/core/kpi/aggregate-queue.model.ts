import {QueueItem} from './kpi-queue.component';

export abstract class AggregationQueue{
    queue: Map<any, QueueItem>;

    constructor(){
        this.queue = new Map<any, QueueItem>();
    }

    get queueItems(){
        let items = [];
        this.queue.forEach((v, k) => items.push(v));
        return items;
    }

    addItem(id): void{
        this.queue.set(id, new QueueItem(id));
    }

    setItemPending(id): void{
        this.queue.get(id).setAsPending();
    }

    setItemFailed(id): void{
        this.queue.get(id).setAsFailed();
    }

    setItemComplete(id, item: any): void{
        this.aggregateItem(item);
        this.queue.get(id).setAsComplete();
    }

    abstract aggregateItem(any): void;
}
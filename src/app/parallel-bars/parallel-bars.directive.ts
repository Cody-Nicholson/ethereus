import {Directive, OnInit} from '@angular/core';
import {ParallelBarDirective} from './parallel-bar.directive';

@Directive({
    selector: '[parallelBars]',
})
export class ParallelBarsDirective {

    private bars: Set<ParallelBarDirective>;

    constructor() {
        this.bars = new Set<ParallelBarDirective>();
    }

    update(bar: ParallelBarDirective) {
        if (!this.bars.has(bar)) {
            this.bars.add(bar);
        }
        this.setWidths();
    }

    removeBar(bar: ParallelBarDirective) {
        this.bars.delete(bar);
        this.setWidths();
    }

    setWidths() {
        let total = 0;
        let max = {value:0};
        this.bars.forEach(bar => {
            total += bar.value;
            if(max.value < bar.value){
                max = bar
            }
        });

        this.bars.forEach(bar => {
            setTimeout(() => {
                bar.setWidth(bar.value);
            }, 0);
        });
    }

}

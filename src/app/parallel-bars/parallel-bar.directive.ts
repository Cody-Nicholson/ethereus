import {Directive, Input, OnDestroy, HostBinding} from '@angular/core';
import {ParallelBarsDirective} from './parallel-bars.directive';

@Directive({
    selector: '[parallelBar]',
})
export class ParallelBarDirective implements OnDestroy {

    private val: number;

    @Input()
    set value(val: number) {
        this.val = +val;
        this.setWidth(this.val);
    }

    @Input() goodThreshold: number = 50;
    @Input() badThreshold: number = 75;

    get value() {
        return this.val;
    }

    @HostBinding('class.good-bar') isGoodBar: boolean;

    @HostBinding('class.bad-bar') isBadBar: boolean;

    @HostBinding('class.parallel-bar') barClass: boolean = true;

    @HostBinding('style.width') width: string;

    setWidth(width: number) {
        this.width = width + '%';
        this.isGoodBar = this.val <= this.goodThreshold;
        this.isBadBar = this.val >= this.badThreshold
       
    };

    constructor() {
    }

    ngOnDestroy() {
        
    }
}

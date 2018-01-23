import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'kpi-cell',
    template: `
    <div class="center-box">
        <div class="value" 
             *ngIf="value !== null">
          {{value}}
        </div>
        <ng-content *ngIf="value == undefined"></ng-content>
        <label>
           {{label}}
        </label>
    </div>
    `,
    styleUrls: ['./index.less'],
    encapsulation: ViewEncapsulation.None
})

export class KpiCellComponent {
    @Input() label: string;
    @Input() value: string | number;
}


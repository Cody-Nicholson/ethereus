import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AreaLegendItem, LineGraphHoverValue } from '../../core/chart-api';
import { AreaGraphComponent } from '../area-graph.component';
import { AreaHoverDirective } from '../directives/area-hover.directive';


@Component({
    selector: 'area-legend',
    templateUrl: 'area-legend.component.html'
})
export class AreaLegendComponent implements OnInit {

    area: AreaGraphComponent;
    areaHover: AreaHoverDirective;
    items: AreaLegendItem[] = [];
    arrowLocation: string = 'top-left';
    direction: string = 'right';
    xValue: any;
    transform: string;

    @Input() data: LineGraphHoverValue[] = [];
    @Input() labels: string[];
    @Input() width: number = 230;
    @Input() visible: boolean = false;

    constructor(area: AreaGraphComponent, areaHover: AreaHoverDirective) {
        this.area = area;
        this.areaHover = areaHover;
    }

    ngOnInit() {
        this.areaHover.hoverPoints.subscribe((points) => {
            this.data = points;
            this.update();
        });

        this.areaHover.mouseEnter.subscribe(() => {
            this.visible = true;
        });

        this.areaHover.mouseLeave.subscribe(() => {
            this.visible = false;
        });
    }

    // each point has the same x coord here so pick first item
    getLeftOffset() {
        return ~~this.data[this.data.length - 1].xCoord + this.area.config.margin.left
    }

    getTopOffset() {
        // Set top to first coord that exists
        for (let i = 0; i < this.data.length; ++i) {
            if (this.data[i].yCoord !== null) {
                return ~~this.data[i].yCoord + this.area.config.margin.top;
            }
        }
        return 0;
    }

    setLocation() {
        let xCoord = this.getLeftOffset();
        let top = this.getTopOffset();
        let left = 0;

        if (xCoord + this.width > this.area.graphWidth) {
            // legend will be on the left side of the line
            this.arrowLocation = 'top-right';
            if (xCoord + this.width * .25 > this.area.graphWidth) {
                // make sure far right does not display over graph
                left = xCoord - this.width;
            } else {
                left = xCoord - this.width * .75;
            }
        } else {
            // legend will be on the right side of the line
            this.arrowLocation = 'top-left';
            left = xCoord - this.width * .25;
        }
        this.transform = `translate(${left}px,${top}px)`;
    }

    initLabels() {
        this.labels = [];
        this.data.forEach((x, i) => {
            this.labels.push('Line ' + (i + 1));
        });
    }

    setItems() {
        if(!this.labels){
            this.initLabels();
        }

        this.items = this.data.map((item, i) => {
            return {
                label: this.labels[i],
                value: item.y,
                color: this.area.config.getAreaFill(i).fill,
                borderColor: this.area.config.lineStyles[i].stroke,
            }
        });
    }

    update() {
        if (!this.data || !this.data.length) {
            return;
        }

        this.setLocation();
        this.xValue = this.data[0].x;
        this.setItems();
    }

}
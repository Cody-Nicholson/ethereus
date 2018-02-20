import { Component, OnInit } from '@angular/core';
import { RigService } from '../../rigs/rig.service';

@Component({
    selector: 'eth-header',
    templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {

    selectedIp: string = 'all';

    constructor(protected rigService: RigService){
        this.rigService.getSelected()
            .subscribe((rig) => {
                console.log('Rig Changed')
                this.selectedIp = rig.ip;
            })
    }

    ngOnInit() {
    }

}

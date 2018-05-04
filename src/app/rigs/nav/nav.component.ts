import { Component, OnInit } from '@angular/core';
import { RigService, Rig } from '../rig.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rig-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class RigNavComponent implements OnInit {

  rig: Rig;

  constructor(protected rigService: RigService,
    protected route: ActivatedRoute) { }

  ngOnInit() {
    this.rigService.get(this.route.snapshot.params.ip)
      .subscribe(rig => {
        this.rig = rig;
      })
  }

}

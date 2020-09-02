import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RigService } from '../rigs/rig.service';

@Component({
  selector: 'app-clay-settings',
  templateUrl: './clay-settings.component.html',
  styleUrls: ['./clay-settings.component.less']
})
export class ClaySettingsComponent implements OnInit {

  form: FormGroup;

  constructor(protected builder: FormBuilder, protected rigService: RigService) {

    this.form = this.builder.group({
      ethPool: '',
      ethWallet: '',
      ethPass: '',
      
      dualPool: '',
      dualWallet: '',
      dualPass: '',
      dualCoin: '',

      dcris: '',
    });
  }

  ngOnInit() {
  }

}

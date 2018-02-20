import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';
import { RigService, Rig } from './rig.service';

@Component({
  selector: 'app-rigs',
  templateUrl: './rigs.component.html',
  styleUrls: ['./rigs.component.less']
})
export class RigsComponent implements OnInit {
  form: FormGroup;
  rigs: Rig[];

  selectedIp: string;

  constructor(protected builder: FormBuilder, protected rigService: RigService) {

    this.rigService.getSelected()
      .subscribe(rig => {
        console.log('Got Selected', rig)
        this.selectedIp = rig.ip;
      })

    this.rigService.getAll()
      .subscribe(rigs => {
        this.rigs = rigs;
      })

    this.form = this.builder.group({
      ip: '',
      name: '',
      gpus: this.builder.array(['', '', '', '', '', ''])
    });
  }

  get gpus() {
    return this.form.get('gpus');
  }

  selectRig(rig: Rig) {
    this.rigService.setSelected(rig);
  }

  setRigs(rigs) {
    const rigFGs = rigs.map(address => this.builder.group(address));
    const array = this.builder.array(rigFGs);
    this.form.setControl('rigs', array);
  }

  onSubmit(rig: Rig) {

    // console.log(this.form.value)

    this.rigService.put(this.form.value)
      .subscribe(z => {
        console.log(z);
      })
  }

  ngOnInit() {
  }

}

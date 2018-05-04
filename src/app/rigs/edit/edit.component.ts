import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';
import { RigService, Rig } from '../rig.service';

@Component({
  selector: 'app-rigs',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class RigsComponent implements OnInit {
  form: FormGroup;
  rigs: Rig[];

  selectedIp: string;
  selectedRig: Rig;

  constructor(protected builder: FormBuilder, protected rigService: RigService) {

    this.rigService.getSelected()
      .subscribe(rig => {
        console.log('Got Selected', rig)
        this.selectedIp = rig.ip;
        this.selectedRig = rig;
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
    this.selectedRig = rig;
  }

  setRigs(rigs) {
    const rigFGs = rigs.map(address => this.builder.group(address));
    const array = this.builder.array(rigFGs);
    this.form.setControl('rigs', array);
  }

  deleteRig(){
    this.rigService.delete(this.selectedRig)
      .subscribe(r => {
          console.log(r)
          this.rigs = this.rigs.splice(this.rigs.indexOf(this.selectedRig), 1).concat();
          this.selectRig(this.rigs[0]); 
      })
  }

  onSubmit(rig: Rig) {
    this.rigService.put(this.form.value)
      .subscribe(z => {
        console.log(z);
      })
  }

  ngOnInit() {
  }

}

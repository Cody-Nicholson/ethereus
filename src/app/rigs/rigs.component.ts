import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';
import { RigService } from './rig.service';

@Component({
  selector: 'app-rigs',
  templateUrl: './rigs.component.html',
  styleUrls: ['./rigs.component.less']
})
export class RigsComponent implements OnInit {
  form: FormGroup;
  constructor(protected builder: FormBuilder,
    protected rigService: RigService) {


    this.rigService.getAll().subscribe(rigs => {
      this.setRigs(rigs)
    })

    let rgs = [{ name: 'rig1', 'ip': '1.2.2' }].map(r => this.builder.group(r));

    this.form = this.builder.group({
      rigs: this.builder.array(rgs),
    });
  }

  add(){
    this.rigs.push(this.builder.group({name: '', ip: ''}));
  }

  setRigs(rigs) {
    const rigFGs = rigs.map(address => this.builder.group(address));
    const array = this.builder.array(rigFGs);
    this.form.setControl('rigs', array);
  }

  get rigs(): FormArray {
    return this.form.get('rigs') as FormArray;
  };

  onSubmit() {
    this.rigService.setAll(this.rigs.value).subscribe(z => {

    })
  }

  ngOnInit() {
    console.log(this.form.get('rigs'))
  }

}

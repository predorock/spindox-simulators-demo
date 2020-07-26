import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dummy-simulator',
  templateUrl: './dummy-simulator.component.html',
  styleUrls: ['./dummy-simulator.component.scss']
})
export class DummySimulatorComponent implements OnInit {

  @Input()
  config: string;
  configObj: any;

  simulatorForm: FormGroup;

  interestValue: number;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.simulatorForm = this.fb.group({
      value: ['', Validators.compose([
        Validators.required,
        Validators.min(1)
      ])]
    });

    console.log(this.config);
    this.configObj = JSON.parse(this.config);
    console.log(this.configObj);
  }

  formSubmit() {
    if (this.simulatorForm.valid) {
      const v = this.simulatorForm.value.value;
      this.interestValue = v + (v * this.getInterestValue() ) ;
    }
  }

  private getInterestValue() {
    return !!this.configObj.interestValue ?  this.configObj.interestValue : 0.042;
  }

}

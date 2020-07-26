import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AbstractSimulator} from '@simulators';
import {IDummySimulatorConfig} from "../../interfaces/dummy-simulator-config.interface";

@Component({
  selector: 'app-dummy-simulator',
  templateUrl: './dummy-simulator.component.html',
  styleUrls: ['./dummy-simulator.component.scss']
})
export class DummySimulatorComponent extends AbstractSimulator<IDummySimulatorConfig> implements OnInit {

  simulatorForm: FormGroup;
  interestValue: number;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.simulatorForm = this.fb.group({
      value: ['', Validators.compose([
        Validators.required,
        Validators.min(1)
      ])]
    });
  }

  formSubmit() {
    if (this.simulatorForm.valid) {
      const v = this.simulatorForm.value.value;
      this.interestValue = v + (v * this.getInterestValue());
    }
  }

  private getInterestValue() {
    console.log(this.simulatorConfig);
    return this.simulatorConfig.interestRate;
  }

}

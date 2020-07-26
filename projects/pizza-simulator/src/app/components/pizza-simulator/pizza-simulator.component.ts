import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-pizza-simulator',
  templateUrl: './pizza-simulator.component.html',
  styleUrls: ['./pizza-simulator.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PizzaSimulatorComponent implements OnInit {

  pizzaForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.pizzaForm = this.fb.group({});
  }

}

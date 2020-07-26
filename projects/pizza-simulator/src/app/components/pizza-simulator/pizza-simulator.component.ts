import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IIngredient} from "../../interfaces/ingredient.interface";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-pizza-simulator',
  templateUrl: './pizza-simulator.component.html',
  styleUrls: ['./pizza-simulator.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PizzaSimulatorComponent implements OnInit {

  @Input()
  config: string;
  configObj: any;

  pizzaForm: FormGroup;

  ingredients: IIngredient[];

  get apiUrl() {
    return this.configObj.apiUrl || 'https://pizzaship.com'
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.ingredients = [
      {
        name: 'salame milano',
        value: 1
      },
      {
        name: 'prosciutto cotto',
        value: 1
      },
      {
        name: 'prosciutto crudo',
        value: 2
      },
      {
        name: 'bufala',
        value: 1
      },
      {
        name: 'burrata',
        value: 2
      },
      {
        name: 'french fries',
        value: 1
      },
      {
        name: 'wurstel',
        value: 1
      },
      {
        name: 'pineapple',
        value: 99
      },
      {
        name: 'nutella',
        value: 5
      }
    ].map((ingredient, index) => ({
      ...ingredient,
      id: index
    }));
    this.pizzaForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      composition: ['', Validators.required],
      ingredients: this.fb.array([])
    });

    console.log(this.config);
    this.configObj = JSON.parse(this.config);
    console.log(this.configObj);
  }

  onIngredientChange(checked: boolean, ingredient: IIngredient) {
    const ingredientsArray: FormArray = this.pizzaForm.get('ingredients') as FormArray;
    if (checked) {
      ingredientsArray.push(new FormControl(ingredient));
    }else {
      ingredientsArray.controls.forEach((fc, index) => {
        if (fc.value.id == ingredient.id) {
          ingredientsArray.removeAt(index);
          return;
        }
      })
    }
  }

  onFormSubmit() {
    if (this.pizzaForm.valid) {
      console.log(this.pizzaForm.value);
      this.http.post(this.apiUrl + '/makePizza', this.pizzaForm.value).subscribe(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.warn('your pizza has not been approved by pizza master');
        }
      )
    }
  }

}

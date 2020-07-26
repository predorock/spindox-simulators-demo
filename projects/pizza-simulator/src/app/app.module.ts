import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PizzaSimulatorComponent} from "./components/pizza-simulator/pizza-simulator.component";
import {createCustomElement} from "@angular/elements";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from "@angular/material/radio";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    PizzaSimulatorComponent
  ],
  entryComponents: [
    PizzaSimulatorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule
  ],
  providers: [],
})
export class AppModule {
  constructor(
    private injector: Injector
  ) {}

  ngDoBootstrap() {
    const tagName = 'pizza-simulator';
    if (!customElements.get(tagName)) {
      const el = createCustomElement(PizzaSimulatorComponent, {injector: this.injector});
      customElements.define(tagName, el);
    }
  }
}

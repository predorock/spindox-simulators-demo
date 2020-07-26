import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import {HttpClientModule} from '@angular/common/http';
import {KittySimulatorComponent} from "./components/kitty-simulator/kitty-simulator.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    KittySimulatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  entryComponents: [
    KittySimulatorComponent
  ]
})
export class AppModule {
  constructor(
    private injector: Injector
  ) {}

  ngDoBootstrap() {
    const tagName = 'kitty-simulator';
    if (!customElements.get(tagName)) {
      const el = createCustomElement(KittySimulatorComponent, {injector: this.injector});
      customElements.define(tagName, el);
    }
  }
}

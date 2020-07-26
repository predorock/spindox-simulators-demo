import {Input} from "@angular/core";

export abstract class AbstractSimulator<T> {

  protected simulatorConfig: T;

  @Input()
  set config(strConfig: string) {
    try {
      this.simulatorConfig = JSON.parse(strConfig) as T;
    } catch (e) {
      this.simulatorConfig = null;
    }
  }
}

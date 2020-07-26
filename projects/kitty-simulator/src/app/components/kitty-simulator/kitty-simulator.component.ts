import {Component, OnInit} from '@angular/core';
import {KittySimulatorService} from '../../services/kitty-simulator.service';
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {AbstractSimulator} from "@simulators";
import {IKittySimulatorConfig} from "../../interfaces/kitty-simulator-config.interface";
import {Kitty} from "../../interfaces/kitty.interface";


@Component({
  selector: 'kitty-simulator',
  template: `
    <ng-container *ngIf="!loading;then kittensTemplate; else loadingTemplate"></ng-container>
    <ng-template #kittensTemplate>
      <select name="breeds" [ngModel]="selectedBreed" (ngModelChange)="onBreedChange($event)">
        <option *ngFor="let breed of breeds" [ngValue]="breed">{{breed.name}}</option>
      </select>
      <ng-container *ngIf="selectedBreed">
        <div class="kittens-container" *ngFor="let kitty of kittens$ | async">
          <img [src]="kitty.url" [height]="kittyHeight">
        </div>
      </ng-container>
    </ng-template>
    <ng-template #loadingTemplate>
      Loading fluffy kittens ...
    </ng-template>
  `,
  styles: []
})
export class KittySimulatorComponent extends AbstractSimulator<IKittySimulatorConfig> implements OnInit {

  kittens$: Observable<Kitty[]>;
  breeds: any[];
  selectedBreed: any;

  loading = true;

  get kittyHeight() {
    return this.simulatorConfig.height || 300;
  }

  constructor(
    private kittyService: KittySimulatorService
  ) {
    super();
  }

  ngOnInit(): void {
    this.kittyService.breeds().subscribe(breeds => {
      this.breeds = breeds;
      this.selectedBreed = breeds[0];
      this.loading = false;
    })
  }

  onBreedChange(breed: any) {
    this.selectedBreed = breed;
    console.log(breed);

    this.kittens$ = this.kittyService.getCat(breed.id).pipe(
      map(k => k as Kitty[]),
      tap(data => console.log(data))
    )
  }

}

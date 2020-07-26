import {Component, Input, OnInit} from '@angular/core';
import {KittySimulatorService} from '../../services/kitty-simulator.service';
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

interface Kitty {
  url: string;
}

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
  styles: [
  ]
})
export class KittySimulatorComponent implements OnInit {

  @Input()
  config: any;
  configObj: any;

  kittens$: Observable<Kitty[]>;
  breeds: any[];
  selectedBreed: any;

  loading = true;

  get kittyHeight() {
    return this.config.height || 300;
  }

  constructor(
    private kittyService: KittySimulatorService
  ) { }

  ngOnInit(): void {
    this.kittyService.breeds().subscribe(breeds => {
      this.breeds = breeds;
      this.selectedBreed = breeds[0];
      this.loading = false;
    })

    console.log(this.config);
    this.configObj = JSON.parse(this.config);
    console.log(this.configObj);
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

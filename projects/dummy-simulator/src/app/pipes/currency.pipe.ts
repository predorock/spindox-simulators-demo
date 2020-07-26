import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCurrency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, options?: Intl.NumberFormatOptions): unknown {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2,
      ...options
    }).format(value);
  }

}

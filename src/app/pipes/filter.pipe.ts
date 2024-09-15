import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: CarDetailDto[], filterText: string): CarDetailDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';

    if (!value || !filterText) {
      return value;
    }

    return value.filter(item => {
      // Birden fazla alanı kontrol etmek için hepsini bir diziye toplayalım
      const fieldsToFilter = [item.carName, item.brandName, item.colorName];

      // Her bir alanı filtreText ile karşılaştır
      return fieldsToFilter.some(field => field.toLocaleLowerCase().includes(filterText));
    });
  }
}

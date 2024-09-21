import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';
import { CarDetailDto } from '../../models/carDetailDto';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { forkJoin } from 'rxjs';
import { CarHighlightDirective } from '../../directives/car-highlight.directive';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, FilterPipe,CarHighlightDirective],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent {
  cars: CarDetailDto[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  selectedBrandId: number = 0;
  selectedColorId: number = 0;
  dataLoaded = false;
  carFilterText = '';
  brandFilterText = '';
  colorFilterText = '';
  combinedFilterText: string = '';

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();

    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }

  // Markaları yükleyen metot
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  // car.component.ts

  updateCar(carId: number) {
    this.router.navigate(['/cars/update', carId]);
  }

  // Renkleri yükleyen metot
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  filterCars() {
    if (this.selectedBrandId > 0 && this.selectedColorId > 0) {
      // İki ayrı API çağrısını aynı anda yap
      forkJoin({
        brandCars: this.carService.getCarsByBrand(this.selectedBrandId),
        colorCars: this.carService.getCarsByColor(this.selectedColorId),
      }).subscribe(({ brandCars, colorCars }) => {
        // Her iki çağrının sonuçlarını kesiştir
        this.cars = brandCars.data.filter((car) =>
          colorCars.data.some((colorCar) => colorCar.carId === car.carId)
        );
        this.dataLoaded = true;
      });
    } else if (this.selectedBrandId > 0) {
      this.getCarsByBrand(this.selectedBrandId);
    } else if (this.selectedColorId > 0) {
      this.getCarsByColor(this.selectedColorId);
    } else {
      this.getCars(); // Hiçbir seçim yapılmamışsa tüm arabaları listele
    }
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      console.log(response);
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      console.log(response);
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      console.log(response);
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  viewCarDetail(carId: number) {
    console.log('Navigating to car detail with ID:', carId);
    this.router.navigate(['/car-detail', carId]);
  }
}

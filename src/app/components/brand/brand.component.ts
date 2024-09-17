import { Component } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { Router } from '@angular/router'; // Router eklendi
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  brands: Brand[] = [];
  dataLoaded = false;
  currentBrand: Brand | null = null;

  constructor(private brandService: BrandService, private router: Router) {} // Router Inject edildi

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  getAllBrandClass() {
    if (!this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  clearCurrentBrand() {
    this.currentBrand = null;
  }

  // Güncelleme Sayfasına Yönlendirme Fonksiyonu
  navigateToUpdateBrand(brand: Brand) {
    this.router.navigate(['/brands/update', brand.brandId]);
  }
}

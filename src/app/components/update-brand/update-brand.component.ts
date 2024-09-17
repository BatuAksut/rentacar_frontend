import { Component } from '@angular/core';
import { Brand } from '../../models/brand';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../../services/brand.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-brand',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule,ToastrModule],
  templateUrl: './update-brand.component.html',
  styleUrl: './update-brand.component.css',
})
export class UpdateBrandComponent {
  brand: Brand | null = null;
  dataLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const brandId = params['id'];
      this.getBrandById(brandId);
    });
  }

  // update-brand.component.ts
  getBrandById(id: number) {
    this.brandService.getBrandById(id).subscribe((response) => {
      this.brand = response.data;
      this.dataLoaded = true;
    });
  }

  updateBrand() {
    if (this.brand) {
      this.brandService.updateBrand(this.brand).subscribe((response) => {
        this.toastr.toastrConfig.positionClass="toast-bottom-right";
        this.toastr.success("Marka güncellendi","Başarılı")
      });
    }
  }

  
}

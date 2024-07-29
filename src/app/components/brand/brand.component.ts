import { Component } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {
brands:Brand[]=[];
dataLoaded=false;

constructor(private brandService:BrandService){}

ngOnInit():void{
  this.getBrands();
}
  getBrands() {
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
      this.dataLoaded=true;
    })
  }
}

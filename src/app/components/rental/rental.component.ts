import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { RentalDetailDto } from '../../models/rentalDetailDto';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent {
  rentals:RentalDetailDto[]=[];
  dataLoaded=false;
  
  constructor(private rentalService:RentalService){}
  
  ngOnInit():void{
    this.getRentals();
  }
    getRentals() {
      this.rentalService.getRentals().subscribe(response=>{
        this.rentals=response.data;
        this.dataLoaded=true;
      })
    }
}

import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../../models/car';
import { CarResponseModel } from '../../models/carResponseModel';

import { response } from 'express';
import { CarService } from '../../services/car.service';
import { CarDetailDto } from '../../models/carDetailDto';
@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  cars:CarDetailDto[]=[];
  dataLoaded=false;


  constructor(private carService:CarService){}
    ngOnInit():void{
        this.getCars();
    }
    getCars(){
      this.carService.getCars().subscribe(response=>{
        this.cars=response.data;
        this.dataLoaded=true;
      })
  };
}

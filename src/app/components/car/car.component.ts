import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';
import { CarDetailDto } from '../../models/carDetailDto';
import { ActivatedRoute,Router} from '@angular/router';
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
  


  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"]);
      } else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"]);
      } else {
        this.getCars();
      }
    });
  }

    getCars(){
      this.carService.getCars().subscribe(response=>{
        console.log(response)
        this.cars=response.data;
        this.dataLoaded=true;
      })
  };
  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      console.log(response)
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe(response => {
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

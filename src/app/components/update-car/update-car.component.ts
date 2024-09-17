// update-car.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CarDetailDto } from '../../models/carDetailDto';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Car } from '../../models/car';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {
  car: Car | null = null;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const carId = params['carId'];
      if (carId) {
        this.getCarDetails(carId);
      }
    });
  }

  getCarDetails(carId: number) {
    this.carService.getCarById(carId).subscribe(response => {
      this.car = response.data;
    });
  }

  updateCar() {
    if (this.car) {
      this.carService.update(this.car).subscribe(() => {
        this.router.navigate(['/cars']); // Veya uygun başka bir rota
      });
    }
  }
}
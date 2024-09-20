import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CarDetailDto } from '../../models/carDetailDto';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetailDto = {
    carId: 0,
    brandId: 0,
    colorId: 0,
    carName: '',
    brandName: '',
    dailyPrice: 0,
    colorName: '',
    images: [],
    minFindeksScore: 0, // Minimum Findeks puanı bilgisi eklendi
  };
  dataLoaded: boolean = false;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const carId = Number(params['id']);
      if (!isNaN(carId)) {
        this.getCarDetailById(carId);
      } else {
        console.error('Invalid car ID');
        this.dataLoaded = true;
      }
    });
  }

  getCarDetailById(id: number): void {
    this.carService.getCarDetailByIdWithImages(id).subscribe(
      (response) => {
        if (response.success) {
          this.carDetail = response.data;
        } else {
          console.error('Error fetching car details:', response.message);
        }
        this.dataLoaded = true;
      },
      (error) => {
        console.error('Error fetching car details:', error);
        this.dataLoaded = true;
      }
    );
  }

  navigateToRentalForm() {
    this.router.navigate(['/rental-form'], { queryParams: { minFindeksScore: this.carDetail.minFindeksScore } });
  }
}

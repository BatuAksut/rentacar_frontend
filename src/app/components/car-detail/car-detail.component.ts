import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CarDetailDto } from '../../models/carDetailDto';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterLink],
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetailDto | null = null;
  dataLoaded: boolean = false;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const carId = Number(params['id']); // Numara olarak dönüştür
      console.log('Fetched Car ID:', carId); // ID'yi kontrol et
      if (!isNaN(carId)) { // carId'nin geçerli bir sayı olup olmadığını kontrol et
        this.getCarDetailById(carId);
      } else {
        console.error('Invalid car ID');
        this.dataLoaded = true; // Hata durumunda dataLoaded'ı true yaparak yükleme durumunu sonlandır
      }
    });
  }

  getCarDetailById(id: number): void {
    this.carService.getCarDetailById(id).subscribe(
      response => {
        if (response.success) {
          this.carDetail = response.data; // data özelliğinden veriyi alıyoruz
        } else {
          console.error('Error fetching car details:', response.message);
        }
        this.dataLoaded = true;
      },
      error => {
        console.error('Error fetching car details:', error);
        this.dataLoaded = true;
      }
    );
  }
}

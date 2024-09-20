import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { FindeksService } from '../../services/findeks.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rental-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ToastrModule],
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css'],
})
export class RentalFormComponent implements OnInit {
  rental: Rental = {
    carId: 0,
    customerId: 1, // Gerçek müşteri ID'sini buraya ekleyin
    rentDate: new Date(),
    returnDate: new Date(),
  };

  creditCardInfo: string = '';
  carMinFindeksScore: number = 0; // Aracın minimum Findeks puanı dinamik olacak

  constructor(
    private rentalService: RentalService,
    private findeksService: FindeksService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Query parametrelerinden minimum Findeks puanını al
    this.route.queryParams.subscribe((params) => {
      this.carMinFindeksScore = params['minFindeksScore'] || 0;
    });
  }

  onSubmit() {
    if (!this.creditCardInfo) {
      this.toastr.warning('Kredi kartı bilgisi girilmelidir.', 'Uyarı');
      this.router.navigate(['/payment']);
      return;
    }

    // Findeks puanını kontrol et
    this.findeksService.getFindeksScore(this.rental.customerId).subscribe((findeksScore) => {
      if (findeksScore < this.carMinFindeksScore) {
        this.toastr.error(
          `Findeks puanınız yetersiz. Gereken: ${this.carMinFindeksScore}, Sizin: ${findeksScore}`,
          'Hata'
        );
        return;
      }

      // Eğer Findeks puanı yeterliyse, kiralama işlemi devam eder
      const rentDate = new Date(this.rental.rentDate);
      const returnDate = new Date(this.rental.returnDate);

      this.rentalService.checkAvailability(this.rental.carId, rentDate, returnDate).subscribe((response) => {
        if (response.success) {
          this.rentalService.rentCar(this.rental).subscribe((rentResponse) => {
            if (rentResponse.success) {
              this.toastr.success('Kiralama başarılı!', 'Başarılı');
            } else {
              this.toastr.error(rentResponse.message, 'Hata');
            }
          });
        } else {
          this.toastr.error(response.message, 'Hata');
        }
      });
    });
  }
}

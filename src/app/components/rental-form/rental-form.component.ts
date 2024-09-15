import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Yönlendirme için
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr'; // Toastr'ı ekleyin

@Component({
  selector: 'app-rental-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule,ToastrModule],
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css']
})
export class RentalFormComponent {
  rental: Rental = {
    carId: 0,
    customerId: 1,  // Gerçek müşteri ID'sini buraya ekleyin
    rentDate: new Date(),
    returnDate: new Date()
  };

  creditCardInfo: string = '';

  constructor(
    private rentalService: RentalService,
    private router: Router,
    private toastr: ToastrService // ToastrService'i ekleyin
  ) {}

  onSubmit() {
    if (!this.creditCardInfo) {
      // Kredi kartı bilgisi girilmediyse, ödeme sayfasına yönlendir
      this.toastr.warning('Kredi kartı bilgisi girilmelidir.', 'Uyarı');
      this.router.navigate(['/payment']);
      return;
    }
    this.toastr.toastrConfig.positionClass="toast-bottom-right";
    const rentDate = new Date(this.rental.rentDate);
    const returnDate = new Date(this.rental.returnDate);

    this.rentalService.checkAvailability(this.rental.carId, rentDate, returnDate)
      .subscribe(response => {
        if (response.success) {
          this.rentalService.rentCar(this.rental).subscribe(rentResponse => {
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
  }
}

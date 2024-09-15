import { Component } from '@angular/core';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rental-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css']
})
export class RentalFormComponent {
  rental: Rental = {
    carId: 0,  // Kiralanacak aracın ID'sini uygun şekilde setlemelisiniz
    customerId: 1,  // Müşteri ID'yi oturum ya da başka bir yerden almalısınız
    rentDate: new Date(),
    returnDate: new Date()
  };

  creditCardInfo: string = '';

  constructor(private rentalService: RentalService) {}

  onSubmit() {
    // Tarihleri Date objesine dönüştürün
    const rentDate = new Date(this.rental.rentDate);
    const returnDate = new Date(this.rental.returnDate);
  
    this.rentalService.checkAvailability(this.rental.carId, rentDate, returnDate)
      .subscribe(response => {
        if (response.success) {
          // Kiralama uygunsa kiralama işlemini başlat
          this.rentalService.rentCar(this.rental).subscribe(rentResponse => {
            if (rentResponse.success) {
              alert("Kiralama başarılı!");
            } else {
              alert(rentResponse.message);
            }
          });
        } else {
          alert(response.message);
        }
      });
  }
  
}

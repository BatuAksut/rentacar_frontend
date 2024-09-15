import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Yönlendirme için
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  creditCardInfo: string = '';

  constructor(private paymentService: PaymentService, private router: Router) {}

  onPay() {
    if (!this.creditCardInfo) {
      alert('Lütfen kredi kartı bilgilerini girin.');
      return;
    }

    this.paymentService.processPayment(this.creditCardInfo).subscribe(response => {
      if (response.success) {
        alert("Ödeme başarılı!");
        this.router.navigate(['/']); // Ana sayfaya yönlendirme
      } else {
        alert(response.message);
      }
    });
  }
}

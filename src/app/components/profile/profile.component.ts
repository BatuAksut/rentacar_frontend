import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../../models/userModel';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserForUpdateDto } from '../../models/userForUpdateDto';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User;
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.authService.getUserData().subscribe(data => {
      this.user = data;
    });
  }

  updateUser() {
    const userForUpdate: UserForUpdateDto = {
        firstName: this.user.firstName,
        lastName: this.user.lastName
    };

    // Eğer email'ı DTO'ya dahil etmeyecekseniz bu satırı kaldırın
    // userForUpdate.email = this.user.email; 

    this.authService.updateUserData(userForUpdate).subscribe(response => {
        alert('Profil güncellendi!');
    }, error => {
        console.error('Güncelleme sırasında hata oluştu:', error);
        alert('Güncelleme sırasında bir hata oluştu.');
    });
}

  
}

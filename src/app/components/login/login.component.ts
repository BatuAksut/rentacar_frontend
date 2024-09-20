import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  emails: string[] = []; // Kullanıcı adlarını (e-posta) tutacak array

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService,private router:Router) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.getUserEmails(); // E-posta listesini al
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required], // Kullanıcı adı (e-posta)
      password: ["", Validators.required]
    });
  }
  
  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response => {
        this.toastr.info(response.message);
        localStorage.setItem("token", response.data.token);
        this.router.navigate(['cars']);
      }, responseError => {
        console.log(responseError.error);
      });
    }
  }
  

  getUserEmails() {
    this.authService.getUserEmails().subscribe(emails => {
      this.emails = emails; // Backend'den alınan e-posta listesi
    }, error => {
      console.error('E-posta listesi alınırken hata oluştu:', error);
    });
  }
}

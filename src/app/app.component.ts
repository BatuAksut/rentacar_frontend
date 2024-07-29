import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { HttpClientModule } from '@angular/common/http';
import { ColorComponent } from './components/color/color.component';
import { RentalComponent } from './components/rental/rental.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CarComponent,BrandComponent,NaviComponent,CommonModule,HttpClientModule,ColorComponent,RentalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rentacar';
}

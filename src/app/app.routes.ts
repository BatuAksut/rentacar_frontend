import { Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { RentalFormComponent } from './components/rental-form/rental-form.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { UpdateBrandComponent } from './components/update-brand/update-brand.component';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { UpdateColorComponent } from './components/update-color/update-color.component';
import { ColorComponent } from './components/color/color.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: CarComponent,
      },
      { path: 'cars', component: CarComponent },
      { path: 'cars/brand/:brandId', component: CarComponent },
      { path: 'cars/color/:colorId', component: CarComponent },
      { path: 'car-detail/:id', component: CarDetailComponent },
      {path: 'rental-form', component: RentalFormComponent},
      { path: 'payment', component: PaymentComponent },
      {path:'cars/add',component:CarAddComponent},
      {path:'brands/add',component:BrandAddComponent},
      {path:'colors/add',component:ColorAddComponent},
      { path: 'brands/update/:id', component: UpdateBrandComponent },
      { path: 'cars/update/:carId', component: UpdateCarComponent },
      { path: 'colors/update/:colorId', component: UpdateColorComponent },
      { path: 'update-color/:id', component: UpdateColorComponent },

      
      
      
      
];

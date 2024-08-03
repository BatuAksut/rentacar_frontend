import { Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

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
      
      
      
];

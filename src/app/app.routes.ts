import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Fees NG | Make Payment' },
  },
  {
    path: 'fees/:id',
    loadComponent: () =>
      import('./pages/fee-select/fee-select.component').then(
        (m) => m.FeeSelectComponent
      ),
    data: { title: 'Fees NG | Make Payment' },
  },
  {
    path: 'pay/:id',
    loadComponent: () =>
      import('./pages/pay/pay.component').then((m) => m.PayComponent),
    data: { title: 'Fees NG | Make Payment' },
  },
  {
    path: 'pay/schedule/:id',
    loadComponent: () =>
      import('./pages/schedule/schedule.component').then(
        (m) => m.ScheduleComponent
      ),
    data: { title: 'Fees NG | Make Payment' },
  },
];

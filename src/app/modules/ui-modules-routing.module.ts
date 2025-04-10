import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './core/base/base.component';

const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: BaseComponent,
        children: [
          {
            path: '',
            loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
          },
        ]
      }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class UIModulesRouting { }

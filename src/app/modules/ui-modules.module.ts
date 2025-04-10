import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// RoutingModule
import { UIModulesRouting } from './ui-modules-routing.module';
import { ThemeModule } from './core/theme.module';
import { DataService } from './services/data.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UIModulesRouting,
    ThemeModule
  ],
  exports: [UIModulesRouting],
  providers: [DataService]
})
export class UIModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
import { UIModule } from './modules/ui-modules.module';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ThemeModule } from './modules/core/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UIModule,
    HttpClientModule,
    // AppRoutingModule,
    NgxChartsModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

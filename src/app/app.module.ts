import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CitySearchComponent } from './components/city-search/city-search.component';
import { WeatherDetailsComponent } from './components/weather-details/weather-details.component';
import { MatNativeDateModule } from '@angular/material/core'; // Necesario para el Datepicker
import { FormsModule } from '@angular/forms';  // Necesario para usar [(ngModel)]

@NgModule({
  declarations: [
    AppComponent,
    CitySearchComponent,
    WeatherDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    BrowserModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    FormsModule,  // Agregar FormsModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.css'
})
export class CitySearchComponent {

  city: string = '';
  weatherDetails: any = null;
  cityResults: any[] = [];
  forecastData: any = null;  // Para almacenar los datos del pronóstico
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  // Buscar ciudad
  searchCity() {
    this.weatherService.searchCity(this.city).subscribe(
      (results) => {
        this.cityResults = results;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'No se pudo encontrar la ciudad.';
        this.cityResults = [];
      }
    );
  }

  // Mostrar detalles del clima para una ciudad
  showWeatherDetails(cityName: string) {
    // Primero obtenemos el clima actual
    this.weatherService.getWeatherDetails(cityName).subscribe(
      (data) => {
        this.weatherDetails = data;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'No se pudieron obtener los detalles del clima actual.';
        this.weatherDetails = null;
      }
    );
    
    // Ahora obtenemos el pronóstico de 5 días
    this.weatherService.getForecast(cityName).subscribe(
      (data) => {
        this.forecastData = data.forecast.forecastday; // Los datos de pronóstico están dentro de "forecastday"
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'No se pudieron obtener los detalles del pronóstico.';
        this.forecastData = null;
      }
    );
  }
}

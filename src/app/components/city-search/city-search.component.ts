import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';


@Component({
    selector: 'app-city-search',
    templateUrl: './city-search.component.html',
    styleUrl: './city-search.component.css',
    standalone: false
})
export class CitySearchComponent {

  cityName: string = ''; // Ciudad ingresada
  historicalDate: string = ''; // Fecha seleccionada
  historicalData: any = null; // Datos históricos
  errorMessage: string = ''; // Mensaje de error

  city: string = '';
  weatherDetails: any = null;
  cityResults: any[] = [];
  forecastData: any = null;
 // Datos históricos
  selectedDate: string = ''; // Fecha seleccionada para búsqueda histórica

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
    // Obtener el clima actual
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
    
    // Obtener el pronóstico de 5 días
    this.weatherService.getForecast(cityName).subscribe(
      (data) => {
        this.forecastData = data.forecast.forecastday;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'No se pudieron obtener los detalles del pronóstico.';
        this.forecastData = null;
      }
    );
  }




  // Método para buscar el clima histórico
  searchHistoricalWeather() {
    if (this.cityName && this.historicalDate) {
      this.weatherService.getHistoricalWeather(this.cityName, this.historicalDate).subscribe(
        data => {
          // Aquí estamos mapeando los datos de la respuesta
          if (data && data.forecast && data.forecast.forecastday) {
            const historicalDay = data.forecast.forecastday[0].day;
            this.historicalData = {
              temperature: historicalDay.avgtemp_c,
              condition: historicalDay.condition.text,
              humidity: historicalDay.humidity,
              wind: historicalDay.maxwind_kph
            };
            this.errorMessage = ''; // Limpiar errores
          } else {
            this.errorMessage = 'No se encontraron datos para esa fecha.';
            this.historicalData = null;
          }
        },
        error => {
          // Manejar errores
          this.errorMessage = 'Error al obtener los datos históricos. Intenta nuevamente.';
          this.historicalData = null; // Limpiar datos históricos si ocurre un error
        }
      );
    } else {
      this.errorMessage = 'Por favor, ingresa la ciudad y la fecha para la búsqueda histórica.';
    }
  }


  // Buscar datos históricos de la ciudad
  getHistoricalData(cityName: string) {
    if (this.selectedDate) {
      this.weatherService.getHistoricalWeather(cityName, this.selectedDate).subscribe(
        (data) => {
          // Asignar los datos históricos al modelo
          this.historicalData = {
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            humidity: data.current.humidity,
            wind: data.current.wind_kph
          };
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'No se pudieron obtener los datos históricos.';
          this.historicalData = null;
        }
      );
    }
  }

  



}


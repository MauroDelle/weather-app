/**
 * @file city-search.component.ts
 * @brief Componente Angular para buscar información meteorológica de ciudades.
 * 
 * Este componente permite realizar búsquedas de clima actual, pronóstico y datos históricos de una ciudad.
 * Incluye soporte para caché en memoria y manejo de errores.
 */

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

  cache: Map<string, { data: any; timestamp: number }> = new Map(); // Caché en memoria
  cacheDuration: number = 2 * 60 * 1000; // Duración del caché: 2 minutos


  city: string = '';
  weatherDetails: any = null;
  cityResults: any[] = [];
  forecastData: any = null;
  // Datos históricos
  selectedDate: string = ''; // Fecha seleccionada para búsqueda histórica

  constructor(private weatherService: WeatherService) { }



  /**
 * @brief Busca información de una ciudad.
 * Verifica el caché antes de realizar una nueva consulta a la API.
 */
  searchCity() {
    const currentTime = Date.now();

    // Verificar si la consulta ya está en el caché
    if (this.cache.has(this.city)) {
      const cachedEntry = this.cache.get(this.city);
      if (cachedEntry && currentTime - cachedEntry.timestamp < this.cacheDuration) {
        // Si está en el caché y no ha expirado, devolver los datos desde el caché
        this.cityResults = cachedEntry.data;
        this.errorMessage = '';
        console.log('Datos obtenidos desde el caché.');
        return;
      } else {
        // Si el caché ha expirado, eliminarlo
        this.cache.delete(this.city);
      }
    }

    // Si no está en el caché o ha expirado, hacer la consulta a la API
    this.weatherService.searchCity(this.city).subscribe(
      (results) => {
        this.cityResults = results;
        this.errorMessage = '';

        // Guardar los resultados en el caché
        this.cache.set(this.city, { data: results, timestamp: currentTime });
      },
      (error) => {
        this.errorMessage = 'No se pudo encontrar la ciudad.';
        this.cityResults = [];
      }
    );
  }


    /**
   * @brief Muestra los detalles meteorológicos actuales de una ciudad.
   * @param cityName Nombre de la ciudad a consultar.
   */
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

  /**
   * @brief Limpia los resultados de la búsqueda de ciudades.
   */
  clearCityResults() {
    this.cityResults = [];
  }

  /**
   * @brief Limpia los detalles meteorológicos actuales.
   */
  clearWeatherDetails() {
    this.weatherDetails = null;
  }

  /**
   * @brief Limpia los datos del pronóstico meteorológico.
   */
  clearForecastData() {
    this.forecastData = null;
  }



  /**
   * @brief Busca datos meteorológicos históricos para una ciudad y fecha específicas.
   */
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


  /**
   * @brief Obtiene datos históricos de una ciudad según una fecha seleccionada.
   * @param cityName Nombre de la ciudad a consultar.
   */
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


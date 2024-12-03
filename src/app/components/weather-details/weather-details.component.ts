import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css'
})
export class WeatherDetailsComponent implements OnInit{
  weatherData: any;
  historicalData: any;
  selectedDate: string = '';  // Fecha seleccionada por el usuario
  cache: any = {};           // Caché para almacenar consultas
  cacheDuration: number = 2 * 60 * 1000;  // Duración del caché en milisegundos (2 minutos)
  
  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    const city = this.route.snapshot.paramMap.get('city')!;
    this.fetchWeather(city);
  }

  fetchWeather(city: string) {
    // Intentamos recuperar los datos del caché
    const cacheKey = `weather_${city}`;
    const cached = this.cache[cacheKey];
    
    if (cached && new Date().getTime() - cached.timestamp < this.cacheDuration) {
      this.weatherData = cached.data;
      return;
    }
    
    this.weatherService.getCurrentWeather(city).subscribe(data => {
      this.weatherData = data;
      this.cache[cacheKey] = { data, timestamp: new Date().getTime() }; // Guardar en caché
    });
  }

  onDateChange() {
    if (!this.selectedDate) return;

    const city = this.route.snapshot.paramMap.get('city')!;
    const cacheKey = `historical_${city}_${this.selectedDate}`;
    const cached = this.cache[cacheKey];
    
    if (cached && new Date().getTime() - cached.timestamp < this.cacheDuration) {
      this.historicalData = cached.data;
      return;
    }

    this.weatherService.getHistoricalWeather(city, this.selectedDate).subscribe(data => {
      // Obtener el primer resultado de la respuesta (si hay varios)
      const firstResult = data.forecast.forecastday[0];
      this.historicalData = {
        temperature: firstResult.day.avgtemp_c,
        condition: firstResult.day.condition.text,
        humidity: firstResult.day.avghumidity,
        wind: firstResult.day.maxwind_kph
      };

      // Guardar los resultados históricos en caché
      this.cache[cacheKey] = { data: this.historicalData, timestamp: new Date().getTime() };
    });
  }
}

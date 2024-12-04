import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '6e86f6dde38745e2be4221839240312'; // Reemplaza con tu API Key
  private baseUrl = 'https://api.weatherapi.com/v1';




  constructor(private http: HttpClient) {}

  // Método para obtener el clima actual de la ciudad
  getWeatherDetails(cityName: string): Observable<any> {
    const url = `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${cityName}`;
    return this.http.get<any>(url);
  }

  // Método para obtener el pronóstico de 5 días
  getForecast(cityName: string): Observable<any> {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${cityName}&days=5`;
    return this.http.get<any>(url);
  }

  // Método para obtener el clima histórico de una ciudad en una fecha específica
  getHistoricalWeather(cityName: string, date: string): Observable<any> {
    console.log("cityName", cityName);
    console.log("date", date);
    const url = `http://api.weatherapi.com/v1/history.json?key=${this.apiKey}&q=${cityName}&dt=${date}`;
    return this.http.get<any>(url);
  }

  // Método para buscar ciudades
  searchCity(query: string): Observable<any[]> {
    const url = `http://api.weatherapi.com/v1/search.json?key=${this.apiKey}&q=${query}`;
    return this.http.get<any[]>(url);
  }
}

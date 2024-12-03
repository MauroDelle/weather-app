import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '6e86f6dde38745e2be4221839240312'; // Reemplaza con tu API Key
  private baseUrl = 'https://api.weatherapi.com/v1';


  constructor(private http: HttpClient) {}

  // Buscar ciudades por nombre
  searchCity(city: string): Observable<any> {
    const url = `${this.baseUrl}/search.json?key=${this.apiKey}&q=${city}`;
    return this.http.get(url);
  }

  // Obtener clima actual por nombre de ciudad
  getCurrentWeather(city: string): Observable<any> {
    const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${city}`;
    return this.http.get(url);
  }

  // Obtener detalles completos del clima (temperatura, humedad, lluvia, etc.)
  getWeatherDetails(city: string): Observable<any> {
    const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${city}`;
    return this.http.get(url);
  }

  // Añadir al servicio para soportar la búsqueda histórica
getHistoricalWeather(city: string, date: string): Observable<any> {
  const url = `${this.baseUrl}/history.json?key=${this.apiKey}&q=${city}&dt=${date}`;
  return this.http.get(url);
}


  // Método para obtener los datos del clima
  getWeatherData(lat: number, lon: number): Observable<any> {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&cnt=6&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

    // Obtener el pronóstico de 5 días
    getForecast(city: string): Observable<any> {
      const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${city}&days=5`; // Cambié aquí para el pronóstico a 5 días
      return this.http.get(url);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


/**
 * @file weather.service.ts
 * @brief Servicio Angular para interactuar con la API de WeatherAPI.
 * 
 * Este servicio proporciona métodos para obtener información meteorológica actual,
 * pronósticos, datos históricos y realizar búsquedas de ciudades.
 */

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '6e86f6dde38745e2be4221839240312'; // Reemplaza con tu API Key
  private baseUrl = 'https://api.weatherapi.com/v1';

  /**
   * @brief Constructor del servicio.
   * @param http Cliente HTTP de Angular para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {}



  /**
   * @brief Obtiene los detalles del clima actual para una ciudad.
   * @param cityName Nombre de la ciudad.
   * @return Observable con los datos del clima actual.
   */
  getWeatherDetails(cityName: string): Observable<any> {
    const url = `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${cityName}`;
    return this.http.get<any>(url);
  }



  /**
   * @brief Obtiene el pronóstico meteorológico de 5 días para una ciudad.
   * @param cityName Nombre de la ciudad.
   * @return Observable con los datos del pronóstico.
   */
  getForecast(cityName: string): Observable<any> {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${cityName}&days=5`;
    return this.http.get<any>(url);
  }



    /**
   * @brief Obtiene los datos históricos del clima para una ciudad y una fecha específicas.
   * @param cityName Nombre de la ciudad.
   * @param date Fecha en formato `YYYY-MM-DD`.
   * @return Observable con los datos históricos del clima.
   */
  getHistoricalWeather(cityName: string, date: string): Observable<any> {
    console.log("cityName", cityName);
    console.log("date", date);
    const url = `http://api.weatherapi.com/v1/history.json?key=${this.apiKey}&q=${cityName}&dt=${date}`;
    return this.http.get<any>(url);
  }




    /**
   * @brief Busca ciudades que coincidan con el término de consulta.
   * @param query Término de búsqueda.
   * @return Observable con los resultados de la búsqueda de ciudades.
   */
  searchCity(query: string): Observable<any[]> {
    const url = `http://api.weatherapi.com/v1/search.json?key=${this.apiKey}&q=${query}`;
    return this.http.get<any[]>(url);
  }


}

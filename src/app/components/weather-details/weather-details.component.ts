import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/weather.service';

@Component({
    selector: 'app-weather-details',
    templateUrl: './weather-details.component.html',
    styleUrl: './weather-details.component.css',
    standalone: false
})
export class WeatherDetailsComponent implements OnInit{
  @Input() weatherDetails: any;  // Recibe los detalles del clima
  @Input() historicalData: any;  // Recibe los datos históricos
  @Input() selectedDate!: string;  // Aseguramos que la propiedad será inicializada
 // Valor predeterminado vacío
 // Fecha seleccionada para los datos históricos

  constructor() {}

  ngOnInit(): void {
    // Aquí puedes agregar lógica adicional si es necesario
  }
}

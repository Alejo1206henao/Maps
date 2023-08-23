import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Map} from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit{
  //el  @ViewChild => me permite tomar un referencia de algun elemento de html
  @ViewChild('map')
  public divMap?: ElementRef;
  ngAfterViewInit(): void {
    //si esto no existe
    if(!this.divMap) throw 'El elemnto HTML no fue encontrado'

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }



}

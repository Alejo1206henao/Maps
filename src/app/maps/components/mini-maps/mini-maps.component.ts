import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Map, Marker} from "mapbox-gl";

@Component({
  selector: 'mini-map',
  templateUrl: './mini-maps.component.html',
  styleUrls: ['./mini-maps.component.css']
})
export class MiniMapsComponent implements AfterViewInit{
  @Input() lngLat? : [number, number];
  public map?: Map;
  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    if(!this.divMap?.nativeElement) throw 'El elemnto HTML no fue encontrado'
    if(!this.lngLat) throw 'Lng no found aqui';

    //mapa
    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false,
    });
    //marker
      new Marker({
      }).setLngLat(this.lngLat)
        .addTo(this.map)
  }


}

import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {LngLat, Map} from "mapbox-gl";

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  public Zoom: number = 5;
  public map?:Map;
  public lngLat: LngLat = new LngLat(-75.37278321104293, 6.146624196180326);

  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    //si esto no existe
    if (!this.divMap) throw 'El elemnto HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.Zoom, // starting zoom
    });
    this.mapListeners();
  }

  mapListeners(){
    if(!this.map) throw 'Mapa no inicializado';
    this.map.on('zoom', (ev) => {
      this.Zoom = this.map!.getZoom()
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom()< 18) return;
      this.map?.zoomTo(18)
    });

    this.map.on('move', () => {
      this.lngLat = this.map!.getCenter();
    })

  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChange(value:string){
    this.Zoom = Number(value);
    this.map?.zoomTo(this.Zoom)
  }

  ngOnDestroy(): void {
   this.map?.off('move', () => {
     this.map?.remove()
   })
  }

}

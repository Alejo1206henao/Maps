import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {LngLat, Map, Marker} from "mapbox-gl";
import {PlainMarker} from "../../interfaces/plain-marker";

interface MarkersAndColor {
  color: string;
  markert: Marker;
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit{

  public setMarkers: MarkersAndColor[] = [];
  public Zoom: number = 5;
  public map?: Map;
  public lngLat: LngLat = new LngLat(-75.37278321104293, 6.146624196180326);

  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    //si esto no existe
    if (!this.divMap) throw 'El elemnto HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.Zoom, // starting zoom
    });

    this.readFromLocalStorage();

    //crear marcadores personalizados
    // const marketHtml = document.createElement('div');
    // marketHtml.innerHTML = 'Alejandro'

    //
    //   const marker = new Marker({
    //     color:'green'
    //   }).setLngLat(this.lngLat)
    //     .addTo(this.map)
  }

  createMarker() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter()

    this.addMarker(lngLat, color);

  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    //acá voy a insertar el arreglo de los markers

    this.setMarkers.push({
      color: color,
      markert: marker
    });
    this.saveToLocalStorage();
    //aca le estoy asignando un listener
    marker.on('dragend', () => this.saveToLocalStorage())
  }

  deleteMarker(index:number){
    this.setMarkers[index].markert.remove();
    //splice para eliminar elementos
    this.setMarkers.splice(index,1);
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 14,
      //getLngLat() => son las coordenadas del marcador
      center: marker.getLngLat()
    });
  }

  saveToLocalStorage():void{
  //preparar la información que quiero insertar
    const plainMarker: PlainMarker[] =
      this.setMarkers.map(({color, markert})=> {
        return{
          color,
          lngLat: markert.getLngLat().toArray()
        }
      });
    localStorage.setItem('plainMarker', JSON.stringify(plainMarker));
  }

  readFromLocalStorage(){
    //aca estoy diciendo que si 'plainMarker', no existe me devuelva un arreglo vacio
    const plainMarkersString = localStorage.getItem('plainMarker') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({color, lngLat})=>{
      const [lng, lat] = lngLat;
      const coords = new LngLat (lng, lat);

      this.addMarker(coords,color);
      }

    )
  }

}

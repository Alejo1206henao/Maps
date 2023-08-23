import { Component } from '@angular/core';

interface menuItem{
  name: string,
  route: string,
}


@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
//creacion de rutas hijas
  public menuItem: menuItem[] = [
    {route: '/maps/fullScreen', name: 'fullScreen'},
    {route: '/maps/zoom-range', name: 'zoom'},
    {route: '/maps/markers', name: 'Markers'},
    {route: '/maps/properties', name: 'Houses'},
  ]
}

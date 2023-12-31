import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapsRoutingModule} from "./maps-routing.module";
import {MiniMapsComponent} from "./components/mini-maps/mini-maps.component";
import {SideMenuComponent} from "./components/side-menu/side-menu.component";
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';

import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiYWxlam9oZW5hbzEyMDYiLCJhIjoiY2xsbWJwZmM3MmQxZDNocXZzOGNydmtjNSJ9.WzixcS3lE13Bgv-ycHK3uw';

@NgModule({
  declarations: [
    MiniMapsComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
  ]
})
export class MapsModule { }

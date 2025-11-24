import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Monument } from '../../model/monuments.model';
import { MonumentsService } from '../../monuments.service';
declare var ol: any;

@Component({
  selector: 'app-monument-details',
  templateUrl: './monument-details.component.html',
  styleUrls: ['./monument-details.component.css']
})
export class MonumentDetailsComponent implements OnInit {

  monument: Monument | null = null;
  editing: boolean = false;
  private map: any;
  private markerLayer: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monumentService: MonumentsService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id !== null) {
      this.loadMonument(id);
    } else {
      console.error('No monument ID in route!');
    }
  }

  loadMonument(id: number): void {
    this.monumentService.getMonument(id).subscribe({
      next: (data: Monument) => {
        this.monument = data;
        console.log('Monument loaded:', this.monument);

        setTimeout(() => {
          this.initMap();
        }, 100);
      },
      error: (err) => {
        console.error('Error loading monument:', err);
      }
    });
  }

  initMap(): void {
    if (typeof ol === 'undefined') {
      console.error('OpenLayers library not loaded!');
      return;
    }

    if (!this.monument) {
      console.error('Monument not loaded yet!');
      return;
    }

    try {
      console.log('Initializing map for monument:', this.monument.name);

      this.map = new ol.Map({
        target: 'detail-map',
        layers: [
          new ol.layer.Tile({ source: new ol.source.OSM() })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([
            this.monument.locationLongitude, 
            this.monument.locationLatitude
          ]),
          zoom: 15
        })
      });

      this.markerLayer = new ol.layer.Vector({ 
        source: new ol.source.Vector() 
      });
      this.map.addLayer(this.markerLayer);

      this.showOnMap(this.monument);
      
      console.log('Map initialized successfully');
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  showOnMap(monument: Monument): void {
    if (!this.map || !monument) {
      console.error('Map or monument not ready');
      return;
    }

    try {
      const coords = ol.proj.fromLonLat([
        monument.locationLongitude, 
        monument.locationLatitude
      ]);
      
      this.markerLayer.getSource().clear();

      const marker = new ol.Feature({
        geometry: new ol.geom.Point(coords)
      });

      marker.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1],
          src: 'https://cdn.mapmarker.io/api/v1/pin?size=50&background=%23FF0000&icon=fa-monument&color=%23FFFFFF&voffset=0&hoffset=0'
        })
      }));

      this.markerLayer.getSource().addFeature(marker);
      console.log('Marker added at:', coords);
    } catch (error) {
      console.error('Error showing marker:', error);
    }
  }

  deleteMonument(): void {
    if (!this.monument) return;

    const confirmDelete = confirm(`Are you sure you want to delete the monument "${this.monument.name}"?`);
    if (!confirmDelete) return;

    this.monumentService.deleteMonument(this.monument.id || 0).subscribe({
      next: () => {
        alert('Monument deleted successfully.');
        this.router.navigate(['/monuments']);
      },
      error: (err) => {
        console.error('Error deleting monument:', err);
        alert('Failed to delete monument. Please try again.');
      }
    });
  }

  editMonument(): void {
    if (this.map) {
      this.map.setTarget(null);
      this.map = null;
    }

    this.editing = true;
  }

  onMonumentUpdated(updated: Monument) {
    this.monument = updated;
    this.editing = false;
    if (this.map) {
      this.map.setTarget(null);
      this.map = null;
    }
    if (this.monument) {
      setTimeout(() => this.initMap(), 0);
    }
  }

  cancelEdit() {
    this.editing = false;
    if (this.map) {
      this.map.setTarget(null);
      this.map = null;
    }
    if (this.monument) {
      setTimeout(() => this.initMap(), 0);
    }
  }

  goBack(): void {
    this.router.navigate(['/monuments']);
  }
}
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Monument } from '../model/monuments.model';
import { MonumentsService } from '../monuments.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var ol: any;

@Component({
  selector: 'app-monuments',
  templateUrl: './monuments.component.html',
  styleUrls: ['./monuments.component.css']
})
export class MonumentsComponent implements OnInit, AfterViewInit {

  monuments: Monument[] = [];
  selectedMonument: Monument | null = null;
  editingMonument: Monument | null = null;
  addingMode: boolean = false;
  mapMode: boolean = false;
  addForm!: FormGroup;
  private map: any;
  private markerLayer: any;

  constructor(
    private monumentService: MonumentsService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadMonuments();
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      yearOfOrigin: ['', this.validateYear],
      locationLatitude: ['', Validators.required],
      locationLongitude: ['', Validators.required]
    });
  }

  validateYear(control: AbstractControl) {
    const year = Number(control.value);
    if (!year) return null;
    const current = new Date().getFullYear();
    return year > current ? { futureYear: true } : null;
  }

  ngAfterViewInit(): void {
  }

  initMap(): void {
    if (this.map) {
      this.map.setTarget("map");
      return;
    }

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({ source: new ol.source.OSM() })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([20.4489, 44.7866]),
        zoom: 12
      })
    });

    this.markerLayer = new ol.layer.Vector({
      source: new ol.source.Vector()
    });
    this.map.addLayer(this.markerLayer);
  }

  loadMonuments(): void {
    this.monumentService.getMonuments().subscribe({
      next: (data) => {
        this.monuments = data.results;
      },
      error: (err) => console.error('Error loading monuments:', err)
    });
  }

  deleteMonument(id: number): void {
    if(confirm('Are you sure you want to delete this monument?')) {
      this.monumentService.deleteMonument(id).subscribe(() => this.loadMonuments());
    }
  }

  onEditClicked(monument: Monument): void {
    if (this.selectedMonument || this.mapMode) {
      this.closeMap();
      this.mapMode = false;
    }
    this.editingMonument = { ...monument };
  }

  onMonumentUpdated(updated: Monument) {
    const index = this.monuments.findIndex(m => m.id === updated.id);
    if (index >= 0) {
      this.monuments[index] = updated;
    }
    this.editingMonument = null;
  }

  get activeMonuments(): Monument[] {
    return this.monuments.filter(m => m.status === 'active');
  }

  get inactiveMonuments(): Monument[] {
    return this.monuments.filter(m => m.status !== 'active');
  }

  onAddClicked(): void {
    if (this.selectedMonument) {
      this.closeMap();
    }

    this.addingMode = true;
  }

  cancelAdd(): void {
    if (confirm("Are you sure you want to cancel adding a monument?")) {
      this.addingMode = false;
      this.addForm.reset();
    }
  }

  saveMonument(): void {
    if (this.addForm.invalid) return;

    const payload = {
      ...this.addForm.value,
      status: 'active'
    };

    this.monumentService.addMonument(payload).subscribe({
      next: () => {
        this.snackBar.open('Monument successfully added', 'OK', { duration: 2000 });
        this.addingMode = false;
        this.mapMode = false;
        this.addForm.reset();
        this.loadMonuments();
      }
    });
  }

  onMonumentClick(monument: Monument): void {
    this.router.navigate(['/monuments', monument.id]);
  }

  onCoordinatesClick(monument: Monument): void {
    if (this.addingMode) {
      if (!confirm("You are currently adding a monument. Do you want to cancel adding and open the map?")) {
        return;
      }
      this.addingMode = false;
    }

    this.selectedMonument = monument;

    setTimeout(() => {
      this.initMap();
      this.showOnMap(monument);
    });
  }

  showOnMap(monument: Monument): void {
    console.log('showOnMap called for:', monument.name);
    
    if (!this.map) {
      console.error('Map not initialized yet');
      this.initMap();
      setTimeout(() => this.showOnMap(monument), 500);
      return;
    }

    try {
      const coords = ol.proj.fromLonLat([monument.locationLongitude, monument.locationLatitude]);
      
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

      this.map.getView().animate({
        center: coords,
        zoom: 15,
        duration: 1000
      });
      
      console.log('Marker added at:', coords);
    } catch (error) {
      console.error('Error showing marker:', error);
    }
  }

  closeMap(): void {
    this.selectedMonument = null;
    if (this.map) {
      this.map.setTarget(null);
      this.map = null;
    }
  }

  findOnMap() {
    this.mapMode = true;
    setTimeout(() => this.initMapPicker(), 0);
  }

  cancelMapMode() {
    this.mapMode = false;
  }

  initMapPicker() {
    if (!this.map) {
      this.map = new ol.Map({
        target: 'map-picker',
        layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ],
        view: new ol.View({ center: ol.proj.fromLonLat([20.4489, 44.7866]), zoom: 12 })
      });

      const layer = new ol.layer.Vector({ source: new ol.source.Vector() });
      this.map.addLayer(layer);

      this.map.on('click', (event: any) => {
        const coords = ol.proj.toLonLat(event.coordinate);
        this.addForm.patchValue({ locationLatitude: coords[1], locationLongitude: coords[0] });
        layer.getSource().clear();

        const marker = new ol.Feature({ geometry: new ol.geom.Point(event.coordinate) });
        marker.setStyle(new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: 'https://cdn.mapmarker.io/api/v1/pin?size=50&background=%23FF0000&icon=fa-map-marker&color=%23FFFFFF&voffset=0&hoffset=0'
          })
        }));
        layer.getSource().addFeature(marker);
      });
    }
  }  
}
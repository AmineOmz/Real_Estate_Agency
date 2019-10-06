import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { PropertiesService } from 'src/app/Services/properties.service';
import { Property } from 'src/app/Models/Property.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit, OnDestroy {

  propertyForm: FormGroup;
  properties: Property[];
  propertiesSubscription: Subscription;
  editProperty = false;

  constructor(private formBuilder: FormBuilder, private propertiesServices: PropertiesService) { }

  ngOnInit() {
    this.initForm();
    this.propertiesSubscription = this.propertiesServices.propertiesSubject.subscribe(
      (properties: Property[]) => {
        this.properties = properties;
      }
    );
    this.propertiesServices.getProperties();
    this.propertiesServices.emitProperties();
  }

  initForm() {
    this.propertyForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      surface: ['', [Validators.required]],
      rooms: ['', [Validators.required]],
      description: ['']
    });
  }

  onSaveProperty() {
    const id = this.propertyForm.get('id').value;
    const title = this.propertyForm.get('title').value;
    const category = this.propertyForm.get('category').value;
    const surface = this.propertyForm.get('surface').value;
    const rooms = this.propertyForm.get('rooms').value;
    const description = this.propertyForm.get('description').value;

    const property = new Property(title, category, surface, rooms, description);

    if (this.editProperty === true) {
      this.propertiesServices.updateProperty(property, id);
    } else {
      this.propertiesServices.createProperties(property);
    }

    $('#addProperties').modal('hide');
    this.propertyForm.reset();
    this.editProperty = false;
  }

  onEditProperty(property: Property, id: number) {

    $('#addProperties').modal('show');
    this.propertyForm.get('id').setValue(id);
    this.propertyForm.get('title').setValue(property.title);
    this.propertyForm.get('category').setValue(property.category);
    this.propertyForm.get('surface').setValue(property.surface);
    this.propertyForm.get('rooms').setValue(property.rooms);
    this.propertyForm.get('description').setValue(property.description);

    this.editProperty = true;
  }

  onDeleteProperty(property: Property) {
    this.propertiesServices.removeProperty(property);
  }

  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }

}

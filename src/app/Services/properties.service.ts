import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Property } from '../Models/Property.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [];
  propertiesSubject = new Subject<Property[]>();

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  saveProperties() {
    firebase.database().ref('/properties').set(this.properties);
  }

  getProperties() {
    firebase.database().ref('/properties').on('value', (data) => {
      this.properties = data.val() ? data.val() : [];
      this.emitProperties();
    });
  }

  createProperties(property: Property) {
    this.properties.push(property);
    this.saveProperties();
    this.emitProperties();
  }

  updateProperty(property: Property, id: number) {
    firebase.database().ref('/properties/' + id).update(property);
  }

  removeProperty(property: Property) {
    const id = this.properties.findIndex(
      (elt) => {
        if (elt === property) {
          return (true);
        }
      }
    );
    this.properties.splice(id, 1);
    this.saveProperties();
    this.emitProperties();
  }

}

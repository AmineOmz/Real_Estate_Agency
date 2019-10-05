import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {

    // INIT FIREBASE
    var firebaseConfig = {
      apiKey: "AIzaSyC_419MoQ8m4CIxdqDnk5ku-3OEqHPqduQ",
      authDomain: "realestateagency-6e249.firebaseapp.com",
      databaseURL: "https://realestateagency-6e249.firebaseio.com",
      projectId: "realestateagency-6e249",
      storageBucket: "",
      messagingSenderId: "447813126281",
      appId: "1:447813126281:web:a23dbfe75875fae7fb9e58",
      measurementId: "G-MNNBTXWKMH"
    };
    firebase.initializeApp(firebaseConfig);
    // END INIT FIREBASE
  
  }

}

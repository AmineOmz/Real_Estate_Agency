import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { SigninService } from 'src/app/Services/signin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean;

  constructor(private signinServices: SigninService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    );
  }

  onSignOut() {
    this.signinServices.singOutUser();
  }

}

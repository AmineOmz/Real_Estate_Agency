import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor() { }


  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
            resolve();
            console.log('Connecté');
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  singOutUser() {
    firebase.auth().signOut();
    console.log('Déconnecté');
  }

}

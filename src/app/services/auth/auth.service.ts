/**
 * Serivcio para la gestion de autenticación
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: Observable<User>;
  isLogin: boolean = false;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.usuario = afAuth.authState;
    this.usuario.subscribe(authState => {
      if (authState) {
       this.isLogin = true
      }
    });
    }

  login(textemail, textpass) {
    return this.afAuth.signInWithEmailAndPassword(textemail, textpass);
    }

  logout() {
    return this.afAuth.signOut();
    }
}

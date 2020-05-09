import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AurumGamerAdmin';

  constructor(private authService: AuthService, private router: Router) {

  }

  /**
   * Al iniciar el componente validamos el auth para saber si
   * está autenticado --MAIN o no --LOGIN
   */
  ngOnInit(): void {
    this.authService.usuario.subscribe(user => {
      if (user) {
        this.router.navigate(['main'])
      } else {
        this.router.navigate(['login'])
      }
    })
  }
}

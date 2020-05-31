import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  pass: string;
  error: string;

  constructor(private AuthService: AuthService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  login() {

    if (this.isEmail (this.email)) {
      this.AuthService.login(this.email, this.pass)
      .then((datos) => {
        console.log(datos);
        console.log(this.email, this.pass);
        this.toast.success('Sesion iniciada correctamente', 'OK' );
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/wrong-password') {
          this.toast.warning('Verifique que la contraseña esté bien escrita.', 'Password incorrecto');
          console.log('Verifique que la contraseña esté bien escrita.');
        } else if (error.code === 'auth/user-not-found') {
          this.toast.warning('El usuario no se encuantra en la base de datos.', 'Usuario no existe');
          console.log('El usuario no se encuantra en la base de datos.');
        } else {
          this.toast.error('Ha ocurrido un error intentalo mas tarde.', 'Error');
        }

      });
    } else {
      this.toast.warning('El correo no es válido', 'Corregir');
    }

  }


  isEmail(search: string): boolean {

    let  serchfind: boolean;

    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    serchfind = regexp.test(search);
    return serchfind;
}

}

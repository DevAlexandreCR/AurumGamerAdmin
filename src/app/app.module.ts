import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AuthService } from './services/auth/auth.service';
import { MainComponent } from './main/main.component';
import { Error404Component } from './error404/error404.component';
import { ToastrModule } from 'ngx-toastr'
import { PlayerService } from './services/cruds/player.service';
import { MatchService } from './services/cruds/match.service';
import { AngularFirestoreModule } from '@angular/fire/firestore'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [AuthService, PlayerService, MatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

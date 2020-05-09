import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { PlayerService } from '../services/cruds/player.service';
import { Player } from '../Constantes/Player';
import { Match } from '../Constantes/Match';
import { MatchService } from '../services/cruds/match.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  players: Player[]
  matches: Match[]

  constructor(private authService: AuthService, private playerService: PlayerService, 
              private matchService: MatchService) { }

  ngOnInit(): void {

    /**
     * traemos la lista de los jugadores y quedamos a la escucha de cualquier cambio
     * para que se actualice automaticamente
     */
    this.playerService.getPlayersCollection().valueChanges().subscribe(players => {
      this.players = players
      console.log(this.players)
    })

    /**
     * traemos la lista de las partidas y quedamos a la escucha de cualquier cambio
     * para que se actualice automaticamente
     */
    this.matchService.getMatchPlaying().valueChanges(matches => {
      this.matches = matches
      console.log(this.matches);
      
    })

  }

  logout(){
    this.authService.logout()
  }

}

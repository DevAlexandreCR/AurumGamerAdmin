import { Player } from './Player'

/**
 * Declaro el objeto Partida
 */
export class Match {

    id: string // generado automaticamente por firebase
    date_add: number
    players: { local: Player, visitante: Player}
    oro: number // valor del reto en oro
    platform_match: string // PS4, XBOXONE, PC
    game: string // FIFA20, FIFA19, PES20, PES19
    score: { local: number, visitante: number }
    winner: string
    state: string


    constructor() {

    }
}
import { Game } from './Game'

/**
 * Declaro el objeto Jugador
 */
export class Player {

    id: string // generado automaticamente por firebase
    name: string
    age: number // edad en años
    email: string
    nickname: string // nombre visual para todos los usuarios, debe ser único
    phone: string // único para cada cuenta
    balance: number // oro ejm 300 de oro o 300 monedas de oro
    date_addm: number
    platform_to_play: [] // PS4, XBOXONE, PC
    games: [Game] // FIFA20, FIFA19, PES20, PES19
    matches: [] // almacena los ids de las partidas jugadas
    pay_account: {
        name: string // nombre completo
        cc: string // cedula de ciudadanía
        bank: ['nequi', 'daviplata']
        number_account: number // numero de cuenta
    }

    constructor() {}
}
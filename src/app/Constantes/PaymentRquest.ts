import { Pay_Account } from './Pay_Account';
import { Player } from './Player';

export class PaymentRquest {

    id: string
    pay_account: Pay_Account
    previus_balance: number
    cash: number
    player: Player
    state: string
    date_add: Date
    date_modifi: Date
    reason: string
    payment_ticket_url: string

    constructor() {}
}
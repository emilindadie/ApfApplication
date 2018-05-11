import { Fresenius } from "./fresenius";
import { Piece } from "./piece";
import { User } from "./user";


export class Reparation{
    _id: string;
    reparation_date: string;
    reparateur: User;
    fresenius: Fresenius;
    piece: [Piece];
}

export class StockPiece{
    _id: string;
    reference_name: string;
    lot_number: string;
    quantity: number;
    description: string;
    min_quantity_level: number;

    getReference_name(){
        return this.reference_name;
    }
}
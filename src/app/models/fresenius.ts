import { Piece } from "./piece";
import { User } from "./user";
export class Fresenius{
    _id: string;
    client_name: string;
    bill_point: string;
    deliver_point: string;
    client_code_number: string;
    sap_order_number: string;
    receipt_date: string;
    fresenius_date: String;
    fresenius_type: string;
    device_number: string;
    product_code: string;
    bio_number:string;
    entry_number:string;
    declared_defect: string;
    defect_found: string;
    interventionLine1: string;
    interventionLine2: string;
    interventionLine3: string;
    past_time: string;
    status: string;
    piece: [Piece];
    reparateur:[User];
    test_date_validation: string;
    test_validator: [User];
    send_date_validation: string;
    send_validator: [User];
    last_modificator: [User];
    last_modification_date: string;
}


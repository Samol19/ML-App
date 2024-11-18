import { ItemResponse } from "./item-response.model";

export interface AuctionResponse {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    type?: string;
    state: AuctionState;
    item_name: string;
    payment_id?: number;
    item: ItemResponse;
}

export enum AuctionState {
    ACTIVE = "EN CURSO",
    INACTIVE = "PROGRAMADA",
    FINISHED = "FINALIZADA"
}
export interface BidRequest {
    amount: number;
    auction_id: number;
  }

  export interface BidUpdate {
    amount?: number;
    date?: string;
    auction_id?: number;
    user_id?: number;
  }
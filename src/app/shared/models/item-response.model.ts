export interface ItemResponse {
    id: number;
    name: string;
    description: string;
    img?: string;
    init_price: number;
    final_price: number;
    category_name: string;
    user_name?: string;
}
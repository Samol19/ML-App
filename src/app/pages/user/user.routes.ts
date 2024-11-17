import { Routes } from "@angular/router";
import { UserLayoutComponent } from "./user-layout/user-layout.component";
import { CrearSubastaComponent } from "./crear-subasta/crear-subasta.component";
import { CrearItemComponent } from "./crear-item/crear-subasta.component";
import { AuctionCatalogComponent } from "./auction-catalog/auction-catalog.component";
import { DetailsComponent } from "./auction-catalog/details/details.component";
import { BidsHistoryComponent } from "./bids-history/bids-history.component";


export const userRoutes: Routes = [

    {
        path:'',
        component: UserLayoutComponent,
        children:[
            {path:'create-item', component:CrearItemComponent},
            {path:'create', component:CrearSubastaComponent},
            {path:'catalog', component:AuctionCatalogComponent},
            {path:'catalog/details/:id', component:DetailsComponent},
            {path:'my-bids', component:BidsHistoryComponent}
        ]
    }

];
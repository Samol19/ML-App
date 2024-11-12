import { Routes } from "@angular/router";
import { UserLayoutComponent } from "./user-layout/user-layout.component";
import { CrearSubastaComponent } from "./crear-subasta/crear-subasta.component";


export const userRoutes: Routes = [

    {
        path:'',
        component: UserLayoutComponent,
        children:[
            {path:'create', component:CrearSubastaComponent}
        ]
    }

];
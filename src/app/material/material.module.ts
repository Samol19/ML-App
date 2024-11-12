import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  exports:[MatExpansionModule,MatPaginatorModule,MatProgressSpinnerModule,MatTableModule,MatIconModule,MatButtonModule,MatBadgeModule,MatFormFieldModule,MatInputModule,MatDialogModule,MatTabsModule,ReactiveFormsModule, MatSelectModule
   ]
})
export class MaterialModule { }

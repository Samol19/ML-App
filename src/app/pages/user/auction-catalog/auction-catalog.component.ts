import { Component, OnInit } from '@angular/core';
import { AuctionCardComponent } from '../../../shared/components/auction-card/auction-card.component';
import { CommonModule } from '@angular/common';
import { AuctionResponse } from '../../../shared/models/auction-response.model';
import { ItemResponse } from '../../../shared/models/item-response.model';
import { AuctionService } from '../../../core/services/auction.service';
import { ItemService } from '../../../core/services/item.service';
import { catchError, finalize, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-auction-catalog',
  standalone: true,
  imports: [CommonModule, AuctionCardComponent, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './auction-catalog.component.html',
  styleUrl: './auction-catalog.component.css'
})
export class AuctionCatalogComponent implements OnInit {
  auctions: AuctionResponse[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private auctionService: AuctionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAuctions();
  }

  loadAuctions() {
    this.loading = true;
    this.error = null;
    this.auctionService.getAllAuctions()
      .pipe(
        catchError(error => {
          console.error('Error fetching auctions:', error);
          this.snackBar.open('Error al cargar las subastas. Por favor, intente nuevamente.', 'Cerrar', { duration: 3000 });
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(auctions => {
        this.auctions = auctions;
      });
  }
}
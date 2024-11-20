import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuctionCardComponent } from '../../../shared/components/auction-card/auction-card.component';
import { AuctionResponse } from '../../../shared/models/auction-response.model';
import { AuctionService } from '../../../core/services/auction.service';
import { StorageService } from '../../../core/services/storage.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { ItemResponse } from '../../../shared/models/item-response.model';
import { ItemService } from '../../../core/services/item.service';
import { Router } from '@angular/router';
import { catchError, finalize, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-auctions-history',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatExpansionModule,
    AuctionCardComponent
  ],
  templateUrl: './auctions-history.component.html',
  styleUrl: './auctions-history.component.css'
})
export class AuctionsHistoryComponent implements OnInit {
  items: ItemResponse[] = [];
  auctions: AuctionResponse[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private itemService: ItemService,
    private auctionService: AuctionService,
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUserItemsAndAuctions();
  }

  loadUserItemsAndAuctions() {
    const currentUser = this.storageService.getAuthData();
    if (!currentUser) {
      this.error = 'No se pudo obtener la información del usuario. Por favor, inicia sesión nuevamente.';
      this.isLoading = false;
      return;
    }
    this.loadItems(currentUser.user_name);
  }

  loadItems(userName: string) {
    this.itemService.getAllItems()
      .pipe(
        catchError(error => {
          console.error('Error loading items:', error);
          this.snackBar.open('Error al cargar los artículos. Por favor, intenta nuevamente.', 'Cerrar', { duration: 3000 });
          return of([]);
        }),
        finalize(() => {
          if (this.items.length > 0) {
            this.loadAuctions();
          } else {
            this.isLoading = false;
          }
        })
      )
      .subscribe(items => {
        this.items = items.filter((item: ItemResponse) => item.user_name === userName);
      });
  }

  loadAuctions() {
    this.auctionService.getAllAuctions()
      .pipe(
        catchError(error => {
          console.error('Error loading auctions:', error);
          this.snackBar.open('Error al cargar las subastas. Por favor, intenta nuevamente.', 'Cerrar', { duration: 3000 });
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(auctions => {
        this.auctions = auctions.filter((auction: AuctionResponse) => 
          this.items.some((item: ItemResponse) => item.name === auction.item_name)
        );
      });
  }

  createItem() {
    this.router.navigate(['/home/create-item']);
  }

  createAuction() {
    this.router.navigate(['/home/create']);
  }

  editItem(itemId: number) {
    this.router.navigate(['/edit-item', itemId]);
  }

  deleteItem(itemId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este artículo? Esto también eliminará cualquier subasta asociada.')) {
      this.itemService.deleteItem(itemId).subscribe({
        next: () => {
          this.items = this.items.filter(i => i.id !== itemId);
          this.auctions = this.auctions.filter(a => a.item_name !== this.items.find(i => i.id === itemId)?.name);
          this.snackBar.open('Artículo eliminado con éxito', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error deleting item:', err);
          this.snackBar.open('Error al eliminar el artículo', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  editAuction(auctionId: number) {
    this.router.navigate(['/edit-auction', auctionId]);
  }

  deleteAuction(auctionId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta subasta?')) {
      this.auctionService.deleteAuction(auctionId).subscribe({
        next: () => {
          this.auctions = this.auctions.filter(a => a.id !== auctionId);
          this.snackBar.open('Subasta eliminada con éxito', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error deleting auction:', err);
          this.snackBar.open('Error al eliminar la subasta', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  createAuctionForItem(itemId: number) {
    this.router.navigate(['/home/create'], { queryParams: { itemId: itemId } });
  }

  getAuctionForItem(itemId: number): AuctionResponse | undefined {
    const item = this.items.find(i => i.id === itemId);
    return item ? this.auctions.find(a => a.item_name === item.name) : undefined;
  }

  getImageSrc(img?: string): string {
    if (!img) {
      return 'assets/default-item-image.png';
    }
    return img.startsWith('data:image') ? img : `data:image/png;base64,${img}`;
  }
}

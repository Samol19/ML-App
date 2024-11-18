import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BidRequest } from '../../models/bid-request.model';
import { BidsService } from '../../../core/services/bids.service';

@Component({
  selector: 'app-bid-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './bid-modal.component.html',
  styleUrl: './bid-modal.component.css'
})
export class BidModalComponent {
  bidAmount: number;

  constructor(
    public dialogRef: MatDialogRef<BidModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { auctionId: number, currentBid: number },
    private bidService: BidsService
  ) {
    this.bidAmount = data.currentBid + 1;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.isValidBid()) {
      const bidRequest: BidRequest = {
        amount: this.bidAmount,
        auction_id: this.data.auctionId
      };
      this.bidService.createBid(bidRequest).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error al realizar la oferta:', error);
          // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
      });
    }
  }

  isValidBid(): boolean {
    return this.bidAmount > this.data.currentBid;
  }
}

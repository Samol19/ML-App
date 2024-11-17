import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuctionResponse } from '../../models/auction-response.model';
import { ItemResponse } from '../../models/item-response.model';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './auction-card.component.html',
  styleUrl: './auction-card.component.css'
})
export class AuctionCardComponent implements OnInit, OnDestroy {
  @Input() auction!: AuctionResponse;
  timeRemaining: string = '';
  private timerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('AuctionCardComponent initialized with auction:', this.auction);
    this.updateTimeRemaining();
    this.timerSubscription = interval(1000).subscribe(() => {
      this.updateTimeRemaining();
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  openAuctionDetails() {
    console.log('Opening auction details for:', this.auction.id);
    this.router.navigate(['/home/catalog/details', this.auction.id]);
  }

  getImageSrc(img?: string): string {
    if (!img) {
      console.log('No image provided, using default');
      return 'assets/default-item-image.png'; // Provide a default image path
    }
    const imageSrc = img.startsWith('data:image') ? img : `data:image/png;base64,${img}`;
    console.log('Image source:', imageSrc);
    return imageSrc;
  }

  private updateTimeRemaining(): void {
    const now = new Date().getTime();
    const endTime = new Date(this.auction.end_date).getTime();
    const timeLeft = endTime - now;

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      this.timeRemaining = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      this.timeRemaining = 'Subasta finalizada';
    }
    console.log('Updated time remaining:', this.timeRemaining);
  }
}
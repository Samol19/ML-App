import { Component, OnInit } from '@angular/core';
import { AuctionCardComponent } from '../../../shared/components/auction-card/auction-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { AuctionResponse } from '../../../shared/models/auction-response.model';
import { BidResponse } from '../../../shared/models/bid-response.model';
import { BidsService } from '../../../core/services/bids.service';
import { AuctionService } from '../../../core/services/auction.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-bids-history',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatButtonModule, AuctionCardComponent],
  templateUrl: './bids-history.component.html',
  styleUrl: './bids-history.component.css'
})
export class BidsHistoryComponent implements OnInit{
  auctions: AuctionResponse[] = [];
  bids: BidResponse[] = [];
  isLoading = true;
  error: string | null = null;
  expandedAuctions = new Set<string>();

  constructor(
    private bidService: BidsService,
    private auctionService: AuctionService
  ) {}

  ngOnInit() {
    this.loadBidsAndAuctions();
  }

  loadBidsAndAuctions() {
    this.isLoading = true;
    this.bidService.getAllBids().subscribe({
      next: (bids) => {
        this.bids = bids;
        this.loadAuctions();
      },
      error: (err) => {
        console.error('Error loading bids:', err);
        this.error = 'Error al cargar las pujas';
        this.isLoading = false;
      }
    });
  }

  loadAuctions() {
    this.auctionService.getAllAuctions().subscribe({
      next: (auctions) => {
        const auctionNames = new Set(this.bids.map(bid => bid.auction_name));
        this.auctions = auctions.filter(auction => auctionNames.has(auction.name));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading auctions:', err);
        this.error = 'Error al cargar las subastas';
        this.isLoading = false;
      }
    });
  }

  getHighestBid(auctionName: string): number {
    const auctionBids = this.bids.filter(bid => bid.auction_name === auctionName);
    return Math.max(...auctionBids.map(bid => bid.amount));
  }

  getBidsForAuction(auctionName: string): BidResponse[] {
    return this.bids.filter(bid => bid.auction_name === auctionName)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  toggleBids(auctionName: string) {
    if (this.expandedAuctions.has(auctionName)) {
      this.expandedAuctions.delete(auctionName);
    } else {
      this.expandedAuctions.add(auctionName);
    }
  }
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionDetailComponent } from "../../../../shared/components/auction-detail/auction-detail.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [AuctionDetailComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  auctionId: number;
  private route = inject(ActivatedRoute);

  constructor() {
    this.auctionId = +this.route.snapshot.paramMap.get('id')!;
    console.log('Auction ID:', this.auctionId);
  }
}

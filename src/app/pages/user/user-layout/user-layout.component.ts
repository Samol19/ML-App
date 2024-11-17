import { CommonModule } from '@angular/common';
import { Component,HostListener, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    NavbarComponent,
    FooterComponent,
    MatTooltipModule
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
  animations: [
    trigger('sidebarAnimation', [
      state('closed', style({
        transform: 'translateX(-100%)'
      })),
      state('open', style({
        transform: 'translateX(0)'
      })),
      transition('closed <=> open', animate('300ms ease-in-out'))
    ])
  ]
})
export class UserLayoutComponent implements OnInit{
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile = false;

  private router = inject(Router);
  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (this.sidenav) {
      if (this.isMobile) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
    }
  }

  closeSidenavOnMobile() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }
  goToRandomAuction() {
    this.router.navigate(['/auction', 'random']);
  }
}

import { CommonModule } from '@angular/common';
import { Component,HostListener, Inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule,NavbarComponent,FooterComponent,RouterOutlet,RouterLink,RouterLinkActive],
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

  isSidebarOpen = true;
  isMobile = false;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }
  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      // Ahora es seguro usar `window`
      this.isMobile = window.innerWidth <= 768;
      this.isSidebarOpen = !this.isMobile;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

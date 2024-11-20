import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ColeXpertApp';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Cargar Plotly solo en el navegador
      import('plotly.js-dist-min').then(() => {
        console.log('Plotly cargado en el navegador');
      });
    }
  }
}

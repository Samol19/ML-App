import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';  // Asegúrate de importar withFetch


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),

    // Agregar HttpClient con configuraciones
    provideHttpClient(
      withFetch(),  // Configura con `fetch` si deseas utilizarlo en lugar de XMLHttpRequest.
      // Aquí puedes agregar más interceptores si es necesario, por ejemplo:
      // withInterceptors([myInterceptor]) 
    )
  ]
};

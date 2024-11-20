import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: 'PLOTLY', useValue: null }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
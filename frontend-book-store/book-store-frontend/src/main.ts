import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    //provideRouter(routes), // Providing routes
    provideHttpClient(), // Providing HttpClient
  ],
}).catch((err) => console.error(err));


bootstrapApplication(AppComponent)
  .catch(err => console.error(err));

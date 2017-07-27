import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MailViewerComponent } from './mail-viewer/mail-viewer.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'mail-viewer/:email', component: MailViewerComponent },
  { path: 'welcome', component: LoginScreenComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MailViewerComponent,
    LoginScreenComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes// ,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {routes} from './app-routes.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import {ParallaxDirective} from './parallax.directive';

@NgModule({
  declarations: [AppComponent, ParallaxDirective],
  imports: [
    BrowserModule,

    RouterModule.forRoot(routes, {useHash: true}), // if this is your app.module

    /// Nebular
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

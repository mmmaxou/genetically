import {routes} from './app-routes.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {
  NbThemeModule,
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {RouterModule} from '@angular/router';
import {ParallaxDirective} from './parallax.directive';
import {GeneticEnvironmentComponent} from './genetic-environment/genetic-environment.component';
import {SentenceExampleComponent} from './sentence-example/sentence-example.component';
import {FormsModule} from '@angular/forms';
import {HighlightModule, HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';

/**
 * Import specific languages to avoid importing everything
 * The following will lazy load highlight.js core script (~9.6KB) + the selected languages bundle (each lang. ~1kb)
 */
/*
export function getHighlightLanguages() {
  return {
    javascript,
    typescript,
    css,
  };
}
*/

@NgModule({
  declarations: [
    AppComponent,
    GeneticEnvironmentComponent,
    SentenceExampleComponent,
    ParallaxDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,

    RouterModule.forRoot(routes, {useHash: true}), // if this is your app.module

    HighlightModule,

    /// Nebular
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
  ],
  providers: [
    /*
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages(),
      },
    },
    */
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

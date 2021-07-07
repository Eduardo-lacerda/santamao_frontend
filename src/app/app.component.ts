import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TranslateService } from '@ngx-translate/core';
import{Router, NavigationEnd} from '@angular/router';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {filter} from 'rxjs/operators';

declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'santamao';
  private dfltLang = 'pt';

  constructor(
    private bsLocaleService: BsLocaleService,
    private translateService: TranslateService,
    public router: Router,
    public ga: Angulartics2GoogleAnalytics
  ) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){

        gtag('config', 'UA-200752880-1',
          {
            'page_path': event.urlAfterRedirects
          }
        );
      }
    })
  }

  ngOnInit() {
    //GOOGLE ANALYTICS
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) =>
        this.ga.pageTrack(event.urlAfterRedirects));

    // Seta a linguagem geral da aplicação: do armazenamento local do usuário, do browser ou a padrão
    this.translateService.addLangs(['pt', 'en']);
    this.translateService.setDefaultLang(this.dfltLang);
    const browserLang = this.translateService.getBrowserLang();
    const useLang = (localStorage.getItem('language') || (browserLang.match(/en|pt/) ? browserLang : this.dfltLang));
    this.translateService.use(useLang);
    // Define localização/linguagem atual para DatePicker e afins
    this.bsLocaleService.use(useLang === 'pt' ? 'pt-br' : useLang);
  }
}

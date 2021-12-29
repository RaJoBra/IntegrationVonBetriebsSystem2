import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  siteLanguage = 'Deutsch';
  // TODO: Weitere Sprache hier hinzufügen
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
  ];

  constructor(private translate: TranslateService) {}

  changeSiteLanguage(language: string): void {
    this.translate.use(language);
    this.siteLanguage = this.languageList.find(
      (f) => f.code === language
    ).label;
  }

  ngOnInit(): void {}

}

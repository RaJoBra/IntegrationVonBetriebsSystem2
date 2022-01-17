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

  linkManual() {
    // location.href='http://www.iwi.hs-karlsruhe.de/scs8/downloadFile?folderName=download&fileName=Handbuch-Teil1_DE.pdf';
    window.open(
      // 'http://www.iwi.hs-karlsruhe.de/scs8/downloadFile?folderName=download&fileName=Handbuch-Teil1_DE.pdf',
      //'https://drive.google.com/file/d/10uDM26Wf5qWiRsrqFzYCLbQgtmAe3opC/view?usp=sharing',
      'https://drive.google.com/file/d/10UYgPHFDzGRGTfgHHkSVO-KTvcVmLuH2/view?usp=sharing',
      '_blank'
    );
  }


  ngOnInit(): void {}

}

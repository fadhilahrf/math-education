import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { AppPageTitleStrategy } from 'app/app-page-title-strategy';
import FooterComponent from '../footer/footer.component';
import PageRibbonComponent from '../profiles/page-ribbon.component';
import HasAnyAuthorityDirective from 'app/shared/auth/has-any-authority.directive';

@Component({
  selector: 'jhi-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  providers: [AppPageTitleStrategy],
  imports: [RouterOutlet, FooterComponent, PageRibbonComponent, HasAnyAuthorityDirective],
})
export default class MainComponent implements OnInit {
  constructor(
    private router: Router,
    private appPageTitleStrategy: AppPageTitleStrategy,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    // try to log in automatically
    this.accountService.identity().subscribe();
  }
}

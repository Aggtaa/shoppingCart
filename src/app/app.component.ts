import { Component } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appTitle = 'Список Покупок 2';

  constructor (private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getTitle()))
      .subscribe((title: any) => { this.titleService.setTitle(title) });
  }

  getTitle() {
    return this.getChildTitle() + " - " + this.appTitle;
  }

  getChildTitle(child?: ActivatedRoute) {
    if (child == null)
      child = this.activatedRoute;
    if (child.component == null)
      return null; // a redirect route
    let title = child.snapshot.data['title'];
    if (child.firstChild)
      title = this.getChildTitle(child.firstChild)
    return title;
  }
}

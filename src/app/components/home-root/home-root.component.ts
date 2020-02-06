import { Component, OnInit } from '@angular/core';
import { WaresService } from 'src/app/services/wares.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-root',
  template: ''
})
export class HomeRootComponent implements OnInit {

  constructor(private router: Router, private waresService: WaresService) { 
    // no category, redirect to the first one...
    this.waresService.categories.pipe(map(cats=>cats[0])).subscribe(c => {
      this.router.navigate(['/home', c]);
    });
  }

  ngOnInit() {
  }

}

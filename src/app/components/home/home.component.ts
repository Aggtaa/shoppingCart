import { Component, OnInit } from '@angular/core';
import { WaresService } from 'src/app/services/wares.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  category: string;
  wares: Observable<any[]>;
  categories: Observable<any[]>;
  setWareQuantity: Function;
  setWareComment: Function;
  setWareDescription: Function;

  activeWare: any;

  constructor(private router: Router, private route: ActivatedRoute, private waresService: WaresService) {

    this.categories = this.waresService.categories;
    this.setWareQuantity = (wareId, q) => waresService.setWareQuantity(wareId, q);
    this.setWareComment = (wareId, v) => waresService.updateWare(wareId, {comment: v});
    this.setWareDescription = (wareId, v) => waresService.updateWare(wareId, {comment: v});
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => { 
        this.category = params['category']; 
        this.wares = this.waresService.getItemsForCategory(this.category);
      }
    );
  }

  selectWare(wareId?: string) {
    if (wareId != undefined)
      // make a static snapshot, otherwise firebase will spam us with recursive changes
      this.waresService.getWareById(wareId).subscribe(w => this.activeWare = w);
    else
      this.activeWare = undefined;
  }

  addActiveWareQuantity(quantityDelta: number) {
    if (this.activeWare)
      this.waresService.setWareQuantity(this.activeWare.id, this.activeWare.quantity + quantityDelta);
  }

  commitWare() {
    let ware = this.activeWare;
    this.selectWare();
    this.setWareComment(ware.id, ware.comment); // async
  }
}

import { Component, OnInit } from '@angular/core';
import { WaresService } from 'src/app/services/wares.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  wares: Observable<any[]>;
  resetWareQuantity: Function;

  constructor(private waresService: WaresService) { 
    this.resetWareQuantity = wareId => waresService.setWareQuantity(wareId, 0);
    this.wares = waresService.getItemsToShop();
  }

  ngOnInit() {
    
  }
}

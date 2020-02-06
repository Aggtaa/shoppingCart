import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, distinct } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// on new firebase DB instance dont forget to create composite indices
// firebase can automatically build them for us with simple GET requests, 
// look for URL in error messages in console
export class WaresService {

  categories: Observable<any[]>;

  constructor(private db: AngularFirestore) { 
    // get unique categories into an array. 
    // not sure, if observable is really needed, it's changing soo rarely...
    this.categories = this.db.collection('wares').valueChanges().pipe(
      map(items => [...new Set(items.map(item => item['category']))]),
    );
  }

  getItemsToShop() {
    return this.getCollectionObservable(
      ref => ref
        .orderBy('quantity')
        .where('quantity', '>', 0)
        .orderBy('category')
        .orderBy('lastUsed', 'desc')
    );
  }

  private getCollectionObservable(refCallback: Function): Observable<any[]> {
    return this.db.collection('wares', ref => {
      return refCallback(ref)
    }).snapshotChanges().pipe(
      // reduce snapshot changes to objects, adding "id" field
      map(items => {return items.map(item => {
        return Object.assign({id:item.payload.doc.id}, item.payload.doc.data());
      })
    })
    )
  }

  getItemsForCategory(category?: string): Observable<any[]> {
    if (category == undefined) 
      return null;
    else
      return this.getCollectionObservable(
        ref => ref.where('category', '==', category).orderBy('lastUsed', 'desc')
      );
  }

  setWareQuantity(wareId: string, quantity: number): void {
    this.updateWare(wareId, {quantity: quantity, lastUsed: new Date()});
  }

  updateWare(wareId: string, params: object): void {
    this.db.collection('wares').doc(wareId).update(params);
  }

  getWareById(wareId: string): Observable<any> {
    return this.db.collection('wares').doc(wareId).snapshotChanges().pipe(
      map(item => {
        return Object.assign({id:item.payload.id}, item.payload.data());
      })
    );
  }
}

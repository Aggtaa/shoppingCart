import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

import { AuthService} from '../services/auth.service'


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user.pipe(
          take(1),
          map(user => !!user),
          tap(loggedIn => {
            if (!loggedIn) {
              let url = next.pathFromRoot.map(v => v.url.map(segment => segment.toString()).join('/')).join('/');
              console.log('Access to ' + url + ' denied')
              this.router.navigateByUrl('/login?url=' + url);
            }
        })
    );
  }
}
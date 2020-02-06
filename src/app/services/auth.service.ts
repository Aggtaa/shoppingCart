import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {

  user: Observable<User>;

  constructor(private router: Router, private firebase: AngularFireAuth, private firestore: AngularFirestore) {
      //// get user from auth data or observable.of(null)
      this.user = this.firebase.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.firestore.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      )
    }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider): Promise<void> {
    return this.firebase.auth.signInWithPopup(provider)
      .then(credentials => { this.updateUserData(credentials.user) })
  }

  private updateUserData(user): Promise<void> {
    // update document with user data, uid field is the key
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
    }

    return userRef.update(data)
  }

  public logOut() {
    // it will redirect back to /login, most probably :)
    this.firebase.auth.signOut().then(() => { this.router.navigate(['/']); });
  }
}
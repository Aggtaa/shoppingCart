import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeRootComponent } from './components/home-root/home-root.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/cart',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent, data: {title: "Корзина"}, canActivate: [AuthGuard] },
  { path: 'home', component: HomeRootComponent, data: {title: "Заказ"}, canActivate: [AuthGuard] },
  { path: 'home/:category', component: HomeComponent, data: {title: "Заказ"}, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent, data: {title: "Страница не найдена"}
    /*Need SSR for status code support ,statusCode = '404', status = 'Page not found'*/ }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

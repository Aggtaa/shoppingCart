import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  backUrl: string;

  constructor(private router: Router, private route: ActivatedRoute, private service: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => { 
        this.backUrl = String(params['url']); 

        this.logIn();
      }
    );
  }

  logIn(): void {
    this.service.googleLogin().then(() => this.afterLogIn());
  }

  afterLogIn(): void {
    this.router.navigateByUrl(this.backUrl);
  }

}

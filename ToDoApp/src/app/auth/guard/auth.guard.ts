import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    authService.userId.subscribe((value) => {
      this.loggedIn = value ? true : false;
    });
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.loggedIn) this.router.navigate(["/auth/sign-in"]);
    return this.loggedIn;
  }
}

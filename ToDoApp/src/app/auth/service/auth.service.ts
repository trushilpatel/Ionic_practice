import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userCredentials: BehaviorSubject<object> = new BehaviorSubject({});
  userId: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  async signIn(email: string, password: string) {
    let credentials = await this.fireAuth.signInWithEmailAndPassword(
      email,
      password
    );
    this.userCredentials.next(credentials);
    this.userId.next(credentials.user.uid);
    console.log(this.userId.value, "SIGN IN");
  }

  async signUp(email: string, password: string) {
    let credentials = await this.fireAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    this.userCredentials.next(credentials);
    this.userId.next(credentials.user.uid);
    console.log(this.userId.value, "SIGNED UP");
  }

  async signOut() {
    this.userCredentials.next(null);
    this.userId.next(null);
    this.router.navigate(["/auth/sign-in"]);
  }
}

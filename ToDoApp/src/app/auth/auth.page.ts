import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { ToDoService } from "../todo/service/todo.service";
import { AuthService } from "./service/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit, OnDestroy {
  title: string;
  authError: string = null;
  authForm: FormGroup;
  // swapping between sign-up and sign-in
  otherOption: string;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toDoService: ToDoService
  ) {
    this.title = this.route.snapshot.params["signInOrUp"];
    if (this.title === "sign-in") {
      this.title = "Sign In";
      this.otherOption = "Sign Up";
    } else if (this.title === "sign-up") {
      this.title = "Sign Up";
      this.otherOption = "Sign In";
    } else {
      this.router.navigate(["/"]);
    }

    this.setPageData();
  }

  setPageData() {
    this.authForm = null;
    const controllers = {
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("^[a-zA-Z0-9]+$"),
      ]),
    };
    this.authForm = new FormGroup(controllers);

    if (this.title === "Sign Up")
      controllers["confirmPassword"] = new FormControl("", [
        Validators.required,
        this.confirmPassword.bind(this),
      ]);
  }

  ngOnInit() {}

  ngOnDestroy() {
    console.log("DESTROYED");
  }

  confirmPassword(control: FormControl) {
    return control.value === this.authForm.get("password").value
      ? null
      : { NotEqual: true };
  }

  navigateToOtherOption() {
    if (this.otherOption === "Sign Up") this.router.navigate(["/auth/sign-up"]);
    else this.router.navigate(["/auth/sign-in"]);
  }

  async submit() {
    this.authError = "";
    console.log("Submitted", this.authForm);

    if (this.authForm.invalid) {
      this.authError = "Please Enter Valid Details.";
      return;
    }

    try {
      // Sign Up
      if (this.title === "Sign Up") {
        await this.authService.signUp(
          this.authForm.get("email").value,
          this.authForm.get("password").value
        );
      } else {
        // Sign In
        await this.authService.signIn(
          this.authForm.get("email").value,
          this.authForm.get("password").value
        );
      }
    } catch (e) {
      this.authError = e.message;
      return;
    }
    this.toDoService.setToDoCollectionSubscriber(this.authService.userId.value);
    this.router.navigate(["/todo"]);
    this.authForm.reset();
  }
}

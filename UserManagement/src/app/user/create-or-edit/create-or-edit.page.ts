import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../service/user.service";

@Component({
  selector: "app-create-or-edit",
  templateUrl: "./create-or-edit.page.html",
  styleUrls: ["./create-or-edit.page.scss"],
})
export class CreateOrEditPage {
  title: string;
  error: boolean = false;
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z]+$"),
    ]),
    lastName: new FormControl("", [Validators.pattern("^[A-Za-z]*$")]),
    email: new FormControl("", [Validators.required, Validators.email]),
    role: new FormControl("", [Validators.required]),
    phone: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("^[0-9]+$"),
    ]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) {
    this.title = route.snapshot.params["createOrEdit"];
    if (this.title === "edit") {
      this.userForm.patchValue(
        this.userService.users.value.get(this.location.getState()?.["data"])
      );
    }
  }

  submit() {
    if (this.userForm.invalid) {
      this.error = true;
      return;
    }
    this.error = false;
    if (this.title === "edit")
      this.userService.updateUser(
        this.location.getState()?.["data"],
        this.userForm.value
      );
    else this.userService.addUser(this.userForm.value);
    console.log("SUBMIT");
    this.router.navigate(["/user"]);
  }
}

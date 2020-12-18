import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./service/user.service";
import { User } from "./user";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
})
export class UsersComponent implements OnInit {
  users: User[];
  constructor(private router: Router, private userService: UserService) {
    userService.users.subscribe((value) => {
      this.users = [...value.values()];
    });
  }

  ngOnInit() {}

  addUser() {
    console.log("ADD USER");
    this.router.navigate(["/user/create"]);
  }

  deleteUser(user) {
    this.userService.deleteUser(this.userService.getKey(user));
  }

  editUser(user) {
    this.router.navigate(["/user/edit"], {
      state: { data: this.userService.getKey(user) },
    });
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SubjectSubscriber } from "rxjs/internal/Subject";
import { User } from "../user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  users: BehaviorSubject<Map<string, User>> = new BehaviorSubject<
    Map<string, User>
  >(null);
  mock: Map<string, User>;

  constructor() {
    this.mock = new Map<string, User>();
    this.mock.set("a", {
      firstName: "Trushil",
      email: "trushil@gmail.com",
      lastName: "Patel",
      phone: "8242034892038",
      role: "PA",
    });
    this.mock.set("b", {
      firstName: "Harshil",
      email: "trushil@gmail.com",
      lastName: "Patel",
      phone: "8242034892038",
      role: "PA",
    });
    this.users.next(this.mock);
  }

  addUser(user: User) {
    console.log("ADD USER", user);
    this.users.next(this.users.getValue().set(Date.now().toString(), user));
  }

  getKey(user: User) {
    let key;
    for (let i of this.users.value.entries()) {
      if (i[1] === user) key = i[0];
    }
    console.log(key);

    return key;
  }

  deleteUser(userKey: string) {
    console.log("DELETE", userKey);
  }

  updateUser(userKey: string, user: User) {
    this.users.next(this.users.value.set(userKey, user));
    console.log("UPDATE", user);
  }
}

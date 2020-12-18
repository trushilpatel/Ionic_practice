import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/service/auth.service";
import { ToDoService } from "./service/todo.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.page.html",
  styleUrls: ["./todo.page.scss"],
})
export class TodoPage {
  constructor(
    private toDoService: ToDoService,
    private router: Router,
    private authService: AuthService
  ) {
    this.toDoService = toDoService;
  }

  getToDos() {
    return [...this.toDoService.getToDos().values()].filter(
      (todo) => !todo.done
    );
  }

  async changeToDoStatus(toDo: ToDo) {
    console.log("CHANGE TODO STATUS", toDo.done);

    await this.toDoService.updateToDo(
      this.toDoService.getKey(toDo),
      toDo.title,
      !toDo.done
    );
  }

  async editToDo(toDo: ToDo) {
    this.router.navigate(["/todo/edit"], {
      state: { data: { key: this.toDoService.getKey(toDo) } },
    });
  }

  addToDo() {
    this.router.navigate(["/todo/create"]);
  }

  async deleteToDo(toDo: ToDo) {
    await this.toDoService.deleteToDo(toDo);
  }

  async logout() {
    await this.authService.signOut();
  }
}

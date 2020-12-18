import { Location } from "@angular/common";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToDoService } from "../service/todo.service";

@Component({
  selector: "app-create-or-edit",
  templateUrl: "./create-or-edit.page.html",
  styleUrls: ["./create-or-edit.page.scss"],
})
export class CreateOrEditPage {
  toDoTitle: string = "";
  title: string;
  key: string;

  constructor(
    private toDoService: ToDoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.title = route.snapshot.params["createOrEdit"];
    if (this.title === "edit") {
      this.key = location.getState()["data"]["key"];

      this.toDoTitle = this.toDoService.getToDos().get(this.key).title;
    }
  }

  onSubmit() {
    this.toDoTitle = this.toDoTitle.trim();
    console.log(this.toDoTitle);

    if (this.toDoTitle !== "") {
      if (this.title === "edit") {
        this.toDoService.updateToDo(this.key, this.toDoTitle, false);
      } else {
        this.toDoService.addToDos({ title: this.toDoTitle, done: false });
      }
      console.log("SUBMIT");
    }
    this.toDoTitle = "";
    this.router.navigate(["/todo"]);
  }
}

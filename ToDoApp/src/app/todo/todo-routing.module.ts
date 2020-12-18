import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TodoPage } from "./todo.page";

const routes: Routes = [
  {
    path: "",
    component: TodoPage,
  },
  {
    path: ":createOrEdit",
    loadChildren: () =>
      import("./create-or-edit/create-or-edit.module").then(
        (m) => m.CreateOrEditPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoPageRoutingModule {}

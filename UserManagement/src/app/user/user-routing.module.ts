import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users.component";

const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
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
export class UserPageRoutingModule {}

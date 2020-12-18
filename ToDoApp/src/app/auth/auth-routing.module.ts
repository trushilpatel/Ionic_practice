import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthPage } from "./auth.page";

const routes: Routes = [
  {
    path: "",
    redirectTo: "sign-in",
  },
  {
    path: ":signInOrUp",
    component: AuthPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}

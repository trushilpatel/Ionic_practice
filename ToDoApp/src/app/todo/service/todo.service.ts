import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/service/auth.service";

@Injectable({
  providedIn: "root",
})
export class ToDoService {
  private ToDos: Map<string, ToDo> = new Map();
  todoSubscription: Subscription;
  private collection: AngularFirestoreCollection;
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  async setToDoCollectionSubscriber(userId: string) {
    console.log("USE ID", userId);
    this.collection = await this.firestore.collection(userId);
    this.ToDos = new Map();
    this.todoSubscription = await this.collection
      .snapshotChanges()
      .subscribe((snapshot) => {
        let d;
        console.log("SNAPSHOT", userId);
        snapshot.forEach((data) => {
          d = data.payload.doc.data();
          this.ToDos.set(data.payload.doc.id, {
            title: d["title"],
            done: d["done"],
          });
        });
      });

    this.authService.userCredentials.subscribe((value) => {
      if (value === null) {
        this.todoSubscription.unsubscribe();
        console.log("UNSUBSCRIBED", userId);
      }
    });
  }

  getKey(todo: ToDo) {
    let key;
    for (let i of this.getToDos().entries()) {
      if (i[1] === todo) key = i[0];
    }
    return key;
  }

  getToDos() {
    return this.ToDos;
  }

  async addToDos(todo: ToDo) {
    this.ToDos.set(Date.now().toString(), todo);
    await this.collection.doc(Date.now().toString()).set(todo);
  }

  async deleteToDo(toDo: ToDo) {
    let key: string;
    this.ToDos.forEach((v, k) => {
      if (v === toDo) {
        key = k;
      }
    });
    console.log("DELETED");
    await this.collection.doc(key).delete();
    this.ToDos.delete(key);
  }

  async updateToDo(key: string, title: string, done: boolean) {
    // let todo = this.ToDos.get(key);
    // todo.title = title;
    // todo.done = done;
    await this.collection.doc(key).update({ title: title, done: done });
    console.log("UPDATED", key);
  }
}

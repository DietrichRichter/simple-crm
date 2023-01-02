import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }
  // ein User wird hinzugefügt
  saveUser() {
    this.changeTime();
    this.loading = true;
    this.addUserToFirestore();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  changeTime() {
    this.user.birthDate = this.birthDate.getTime();
  }

  addUserToFirestore() {
    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.closeDialog();
      });
  }

}

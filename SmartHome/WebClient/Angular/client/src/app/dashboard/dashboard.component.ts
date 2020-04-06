import {TemplateRef, ViewChild} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {Observable} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //типы шаблонов
  
  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;
  
  editedUser: User;
    users: Array<User>;
    isNewRecord: boolean;
    statusMessage: string;

  constructor(private serv: UserService) {
    this.users = new Array<User>();
  }
    
  ngOnInit() {
    this.loadUsers();
  }
   
  //загрузка пользователей
  private loadUsers() {
      this.serv.getUsers().subscribe((data: User[]) => {
              this.users = data; 
              console.log(this.users);
          });
  }
 // добавление пользователя
 addUser() {
  this.editedUser = new User(0,"",'');
  this.users.push(this.editedUser);
  this.isNewRecord = true;
}

// редактирование пользователя
editUser(user: User) {
   this.editedUser = new User(user.id, user.login, user.password);
}
// загружаем один из двух шаблонов
loadTemplate(user: User) {
  if (this.editedUser && this.editedUser.id === user.id) {
      return this.editTemplate;
  } else {
      return this.readOnlyTemplate;
  }
}
// сохраняем пользователя
saveUser() {
  if (this.isNewRecord) {
      // добавляем пользователя
      this.serv.createUser(this.editedUser).subscribe(data => {
          this.statusMessage = 'Данные успешно добавлены',
          this.loadUsers();
      });
      this.isNewRecord = false;
      this.editedUser = null;
  } else {
     // изменяем пользователя
      this.serv.updateUser(this.editedUser.id,this.editedUser).subscribe(data => {
      this.statusMessage = 'Данные успешно обновлены',
      this.loadUsers();
      });
      this.editedUser = null;
  }
}
//отмена редактирования
cancel() {
 // если отмена при добавлении, удаляем последнюю запись
  if (this.isNewRecord) {
      this.users.pop();
      this.isNewRecord = false;
  }
  this.editedUser = null;
}
//удаление пользователя
deleteUser(user: User) {
  this.serv.deleteUser(user.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
      this.loadUsers();
  });
}
} 
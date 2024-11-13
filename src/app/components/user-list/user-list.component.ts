// Import necessary Angular modules and services
import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';

// Define the component with its metadata
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = []; // Array to hold the list of users

  withError = false;
  withLatence = false;

  // Inject UserService into the constructor
  constructor(private userService: UserService) {}

  // Lifecycle hook that runs after the component is initialized
  ngOnInit(): void {
    // Call the getUsers method from UserService to fetch the list of users
    if (window.location.pathname.includes('error')) {
      this.withError = true;
      this.userService.getUsers(true).subscribe((data: User[]) => {
        this.users = data; // Assign the fetched users to the users array
      },
    (error: any) => {
      this.withError = true;
    });
    } else if (window.location.pathname.includes('latence')) {
      this.withError = false;
      this.withLatence = true;
      this.userService.getUsers(false, 3000).subscribe((data: User[]) => {
        this.users = data; // Assign the fetched users to the users array
        this.withLatence = false;
      });
    } else {
      this.withError = false;
      this.withLatence = false;
      this.userService.getUsers().subscribe((data: User[]) => {
        this.users = data; // Assign the fetched users to the users array
      });
    }
  }

  // Method to delete a user by ID
  deleteUser(id: number): void {
    // Prompt the user for confirmation before deletion
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      // Call the deleteUser method from UserService
      this.userService.deleteUser(id).subscribe(() => {
        // Filter out the deleted user from the users array
        this.users = this.users.filter((user) => user.id !== id);
      });
    }
  }
}

// Import necessary Angular modules and services
import { Component } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { Router } from '@angular/router';

// Define the component with its metadata
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  // Declare a user object with default empty fields
  user: User = {
    name: '',
    phone: '',
    email: '',
  };

  // Inject UserService and Router into the constructor
  constructor(private userService: UserService, private router: Router) {}

  // Method to create a new user
  createUser(): void {
    // Call the createUser method from UserService and navigate on success
    this.userService.createUser(this.user).subscribe(() => {
      // Redirect to the user list after successful creation
      this.router.navigate(['/users']);
    });
  }
}

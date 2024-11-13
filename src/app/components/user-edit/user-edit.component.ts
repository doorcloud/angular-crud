// Import necessary Angular modules and services
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';

// Define the component with its metadata
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  user: User; // Declare a user variable of type User

  // Inject necessary services into the constructor
  constructor(
    private route: ActivatedRoute, // For accessing route parameters
    private router: Router, // For navigation
    private userService: UserService // For user-related API calls
  ) {
    // Initialize user with empty fields
    this.user = { name: '', phone: '', email: '' };
  }

  // Lifecycle hook that runs after the component is initialized
  ngOnInit(): void {
    // Get the user ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Fetch user details using the ID from the service
      this.userService.getUserById(id).subscribe((user: User) => {
        this.user = user; // Fill the user details for editing
      });
    }
  }

  // Method to update the user details
  updateUser(): void {
    // Call the updateUser method from UserService
    this.userService.updateUser(this.user).subscribe(() => {
      // Redirect to the user list after updating
      this.router.navigate(['/users']);
    });
  }
}

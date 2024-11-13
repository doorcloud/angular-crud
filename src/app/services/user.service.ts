// Import necessary modules and dependencies
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Define the User interface representing the structure of a user object
export interface User {
  id?: number; // Optional ID field
  name: string; // User's name
  phone: string; // User's phone number
  email: string; // User's email address
  role?: any | null; // User's email address
}

// Injectable decorator indicates that this service can be injected into components or other services
@Injectable({
  providedIn: 'root', // Make this service available throughout the application
})
export class UserService {
  // Set the API URL using the environment variable for easy configuration
  private apiUrl = environment.apiUrl + '/users'; // Base URL for user-related API endpoints

  // Constructor to inject the HttpClient service
  constructor(private http: HttpClient) {}

  // Method to fetch all users
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/roles'); // Send a GET request to retrieve all users
  }

  // Method to fetch all users
  getUsers(error?: boolean, latence?: number): Observable<User[]> {
    let url = this.apiUrl;
    if(error){
      url = `${url}?error=${error}`;
    }
    if (latence) {
      url = `${url}?latence=${latence}`;
    }
    return this.http.get<User[]>(url); // Send a GET request to retrieve all users
  }

  // Method to fetch a specific user by ID
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`); // Send a GET request to retrieve user by ID
  }

  // Method to create a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user); // Send a POST request to create a new user
  }

  // Method to fetch a user by ID (alternative implementation)
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`); // Send a GET request to retrieve user by ID
  }

  // Method to update an existing user
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user); // Send a PUT request to update user information
  }

  // Method to delete a user by ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Send a DELETE request to remove the user
  }
}

# Frontend Developer Task for Wakanow.com

This project is a single-page application (SPA) developed as part of the task assessment stage for the Frontend Developer position at Wakanow.com Limited. It implements a signup form using Angular, with functionalities including user submission via a REST API, admin approval for user login, and CRUD operations on user records by admins.

## Features

- **Signup Form:** Allows new users to register without logging in.
- **User Approval:** The default admin approves the first user, who then gains admin rights. Subsequent users are approved by the last approved user, inheriting admin rights.
- **Login System:** Users can log in only after approval, using a temporary key.
- **CRUD Operations:** Admin users can manage records they are admins for but cannot modify their own records.
- **Temporary Data Persistence:** Utilizes LocalStorage/SessionStorage for session-based data persistence.
- **REST API Integration:** Demonstrates API calls using a JSON server.

## Default Admin Info

- **Username:** `<admin_username>`
- **Password:** `<admin_password>`

*Note: Replace `<admin_username>` and `<admin_password>` with the actual credentials.*

## Setup and Running the Project

To run the project, ensure you have [Node.js](https://nodejs.org/) installed. Then, follow these steps:

1. Clone the repository:
    ```bash
    git clone <repository_url>
    ```
2. Navigate to the project directory:
    ```bash
    cd <project_directory>
    ```
3. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
4. Start the development server:
    ```bash
    npx run serve
    # or
    yarn serve
    ```

## What I Was Able to Do

- Implemented the required signup and admin approval functionalities.
- Integrated with JSON Server for REST API calls.
- Enabled CRUD operations for approved users.


## Running the Assessment

- Ensure the JSON Server is correctly set up to serve the REST API endpoints.
- Use the default admin credentials provided above for initial access and approval of the first user.

## Additional Details

- **REST API Used:** JSON Server for mock API responses.
- **Data Persistence:** Utilizes LocalStorage/SessionStorage for simplicity and demonstration purposes.

## Future Enhancements

- **Testing:** Implement unit and integration tests using Jasmine and Karma for Angular applications.
- **UI/UX Improvements:** Enhance the user interface with modern design principles for a more engaging user experience.

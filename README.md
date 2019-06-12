# ContactList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

# Note

In order to test the feature where it is possible to replace the existing contact service (which stores contacts in browser's local storage) with another external service, in "AppModule" please uncomment the "SharedModule.forRoot(MockServerContactService)" line and comment out the "SharedModule.forRoot()" line. MockServerContactService has the exact same functionality as the LocalStorageContactService but it uppercases contact names before saving them to local storage.

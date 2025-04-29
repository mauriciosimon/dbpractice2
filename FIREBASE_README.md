# Firebase Integration

This project includes Firebase integration for authentication, database, and storage. This document explains how to set up and use Firebase in your application.

## Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Register your web application in the Firebase console
3. Copy your Firebase configuration (apiKey, authDomain, etc.)
4. Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## Firebase Configuration

The Firebase configuration is stored in `src/lib/firebase/firebase.ts`. This file initializes Firebase and exports the necessary services:

- `app`: The Firebase app instance
- `analytics`: Firebase Analytics
- `firestore`: Firestore database
- `storage`: Firebase Storage
- `auth`: Firebase Authentication

## Firebase Utilities

The `src/lib/firebase/firebaseUtils.ts` file contains utility functions for common Firebase operations:

### Firestore

- `addDocument`: Add a document to a collection
- `getDocuments`: Get all documents from a collection
- `getDocument`: Get a single document by ID
- `updateDocument`: Update a document
- `deleteDocument`: Delete a document

### Storage

- `uploadFile`: Upload a file to Firebase Storage
- `deleteFile`: Delete a file from Firebase Storage

### Authentication

- `signUp`: Create a new user with email and password
- `signIn`: Sign in with email and password
- `logOut`: Sign out the current user
- `resetPassword`: Send a password reset email

## Example Component

The `src/components/FirebaseExample.tsx` file contains an example component that demonstrates how to use Firebase in your application. This component allows users to:

- Add notes to Firestore
- Retrieve notes from Firestore
- Delete notes from Firestore

## Security Rules

Make sure to set up appropriate security rules in your Firebase console for Firestore and Storage. Here are some basic rules to get started:

### Firestore

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)
- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth) 
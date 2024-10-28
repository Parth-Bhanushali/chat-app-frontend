# Mini Chat App - Realtime Chat Communication Demo.
Backend is linked at [`chat-app-backend`](https://github.com/Parth-Bhanushali/chat-app-backend).

A React Native project demonstrating integration of Node.js, Express.js and Socket.io for Realtime Chat Communication.

Provides a good foundation stone to begin with building a full-featured chat application.

# Screenshots
**Click on images to enlarge**
### Android
<img src=screenshots/android/android_ss_1.png height=500 > &nbsp; &ensp; <img src=screenshots/android/android_ss_2.png height=500>

<img src=screenshots/android/android_ss_3.png height=500> &nbsp; &ensp; <img src=screenshots/android/android_ss_4.png height=500> 

<img src=screenshots/android/android_ss_5.png height=500 > &nbsp; &ensp; <img src=screenshots/android/android_ss_6.png height=500>

<img src=screenshots/android/android_ss_7.png height=500> &nbsp; &ensp; <img src=screenshots/android/android_ss_8.png height=500> 



## How to run and test

1. Clone this repo and open using Visual Studio Code or any preferred IDE.


2. Install dependencies

   ```bash
   yarn install
   ```

3. Open env.sample file and follow the instructions to setup environment variables.

4. Run the app on Android

   ```bash
    yarn android
   ```

   or

   ```bash
    yarn start      
   ```
   (select android from selection menu)

5. Run the app on iOS

   ```bash
    yarn ios
   ```

   or

   ```bash
    yarn start
   ```
   (select ios from selection menu)

## Additional note for iOS

- This hasn't been tested on iOS as of yet. May require additional configuration to run on it like ``` pod install ``` and  ``` manual configuration ``` for few dependencies.
   
## Project Overview

- **Project Setup**: Initialized a new React Native project and started with a clean slate.
- **Functionality**:
   - Authentication system
   - Socket.io integration with backend for realtime communication and checking active user status.
   - UI for chat.
   - etc.
- **Pages Created**:
  - **Login Page**: Allowed signing in via username and password.
  - **Register Page**: Signup via username, password and full name for onboarding purposes.
  - **Home/ChatOverview Page**: Display joined users on the servers and ones available to chat with.
  - **Chat Page**: Detailed chat page to communicate with peers in real-time. Uses socket io to actively listen to new messages while also leverages on-demand polling. Also track the user's online/offline status.
  - **Profile Page**: A page where user can see some of his information provided to server, while providing a way to log out if needed.


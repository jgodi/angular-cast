# Angular Cast

Project demonstrating the integration of Google Chrome Cast with angular applications for both the Sender and Receiver Application with Shared resources between the two.

## Notes
* Angular applications for both the sender/receiver apps
* Shared angular applications for styles/directives/controllers/config/etc..
* Sender application will send custom JSON messages to the receiver application
* Receiver application will get JSON messages from the sender application and fire off REST calls
* Build process for everything

## TODO
* Refine the build process to 'grunt serve' the sender AND receiver application at the same time!
* Make it so the receiver app HTML does not get cached by the device

## Dependencies
* NodeJS (http://nodejs.org)
* A Google Cast Receiver Device (eg. Chromecast)

## Setup Instructions
* Register the Google Cast device on the Developer Console (http://cast.google.com/publish) to allow it to run
* Register a 'Custom Receiver Application' on the Developer Console. The URL should be either the IP address of the system that will run the receiver server from (non-local IP) or the location of where the receiver app is hosted. (I use Firebase for ease of use)
* Clone the repo
* Run 'npm install' and 'bower install'
* If using firebase (setup an account on https://www.firebase.com/ and have the CLI tools installed) you can run 'firebase init' and choose the dist folder to deploy.
* Run 'grunt serve' to serve up the sender application

## Things to be aware of
* You can debug the chrome via <IP ADDRESS OF DEVICE>:9222
* The receiver app HTML is being cached by the device, to get around this jumping into the debug console and using 'window.location.reload(true)'

## Issues / Questions
* Feel free to open issues for any issues or questions that you have.
* Pull requests will be accepted to make this example better!
# Adoptry
### An app to put good pets in the homes of good people.

---

## Getting Started
Once you've cloned the repository:
* Ensure you have Node >= v4.4.5 installed
* Ensure you have Gulp installed globally (run the command `npm install -g gulp`)
* Ensure you have Ionic CLI installed globally (run the command `npm install -g ionic`)

Run the following commands, in order:
* `npm install`
* `gulp serve`

## Generating resources
To generate platform resources such as icons and splash screens, run `ionic resources`

## Running on an Android device
First, you have to have [Android Studio and SDK](https://developer.android.com/studio/index.html) installed on your computer.
You may need to update your Android SDK Tools and Android SDK Build Tools to their latest versions.  This can be done from within Android Studio using the SDK Manager tool.

Once your Android SDK is up to date, add the Android platform to the application using the command `ionic platform add android`
Ensure the device is plugged into your computer, then run the following commands, in order:
* `gulp`
* `ionic run android`

This should compile and deploy the application to the plugged-in device.
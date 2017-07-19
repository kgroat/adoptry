# Adoptry
### An app to put good pets in the homes of good people.
[![Get it on Google Play](https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png)](https://play.google.com/store/apps/details?id=com.ionicframework.adoptry&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1)

[![Get it on the App Store](https://devimages.apple.com.edgekey.net/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg)](https://itunes.apple.com/ca/app/adoptry/id1170819932)
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

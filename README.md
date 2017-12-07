## Manipulate getUserMedia and enumerateDevices with an extension
For advanced testing scenarios it may be desirable to manipulate the behaviour
of navigator.mediaDevices.getUserMedia and navigator.media.

While both Chrome and Firefox support basic command line flags for using fake media
and skipping the permission prompt, these are static and can not be controlled at runtime
by a webdriver script.

This extension injects a small content script that overrides getUserMedia and enumerateDevices
and allows controlling the behaviour at runtime via flags in the sessionStorage.

## Supported flags
```
    sessionStorage.__getUserMediaAudioError = "NotAllowedError";
    sessionStorage.__getUserMediaVideoError = "NotFoundError";
```
make calls to getUserMedia return an error. The error name is taken from the sessionStorage flag.

```
    sessionStorage.__filterAudioDevices = true;
    sessionStorage.__filterVideoDevices = true;
    sessionStorage.__filterDeviceLabels = true;
```
control the behaviour of navigator.mediaDevices.enumerateDevices and filter audio input devices, video input devices
or the device label respectively. These flags also interact with getUserMedia and will return a NotFoundError when
a device kind that is filtered is requested.

## Loading the extension
For testing with selenium, the extension can be automatically be loaded with the
```--load-extension=``` command line flag in Chrome. Note that this flag takes a comma₋separated list of paths.

## Known issues
Due to timing, loading and parsing the injected script may not intercept very early calls to getUserMedia or enumerateDevices.

cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "org.apache.cordova.device.device",
    "file": "plugins/org.apache.cordova.device/www/device.js",
    "pluginId": "org.apache.cordova.device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "org.apache.cordova.statusbar.statusbar",
    "file": "plugins/org.apache.cordova.statusbar/www/statusbar.js",
    "pluginId": "org.apache.cordova.statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "org.apache.cordova.console": "0.2.11",
  "org.apache.cordova.device": "0.2.12",
  "org.apache.cordova.statusbar": "0.1.8"
};
// BOTTOM OF METADATA
});
var util = require("../../util");
var kvn = require("../../kvn");

module.exports = function (category, action, label, value) {
  var name     = "_gaq";
  var logLabel = "Bighorn.track google _gaq";
  var tracker  = self[name];

  console.log("PRE", logLabel, tracker);

  try {
    category = kvn(category);
    action   = kvn(action);
    label    = kvn(label);

    if (!util.isValidString(category)) { return; }
    if (!util.isValidString(action)) { return; }
    if (!util.isObject(tracker) || !util.isFunction(tracker.push)) { return; }
    if (util.isFunction(self.ga)) { return; } // let ga manage the tracking

    tracker.push(["trackEvent", category, action, label, value]);
    console.log("SUCCESS", logLabel, category, action, label, value);
  } catch (e) {
    console.log("ERROR", logLabel, category, action, label, value);
  }
};

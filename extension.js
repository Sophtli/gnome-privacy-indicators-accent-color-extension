import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import * as Main from "resource:///org/gnome/shell/ui/main.js";

const PRIVACY_INDICATORS = "privacy-indicators";
const SCREEN_SHARING_INDICATOR = "screen-sharing-indicator";
const SCREEN_RECORDING_INDICATOR = "screen-recording-indicator";
const BLUR = "blur";

const PRIVACY_INDICATORS_CLASS = "privacy-indicators-accent-color";
const SCREEN_SHARING_INDICATOR_CLASS = "screen-sharing-indicator-accent-color";
const SCREEN_RECORDING_INDICATOR_CLASS =
  "screen-recording-indicator-accent-color";
const BLUR_CLASS = "screen-sharing-recording-indicators-blur";

export default class PrivacyIndicatorsAccentColor extends Extension {
  enable() {
    this._settings = this.getSettings();

    // load initial values
    this._onPrivacyIndicatorsChanged();
    this._onScreenSharingIndicatorChanged();
    this._onScreenRecordingIndicatorChanged();
    this._onBlurChanged();

    // register listeners
    this._onPrivacyIndicatorsChangedID = this._settings.connect(
      "changed::" + PRIVACY_INDICATORS,
      this._onPrivacyIndicatorsChanged.bind(this),
    );
    this._onScreenSharingIndicatorChangedID = this._settings.connect(
      "changed::" + SCREEN_SHARING_INDICATOR,
      this._onScreenSharingIndicatorChanged.bind(this),
    );
    this._onScreenRecordingIndicatorChangedID = this._settings.connect(
      "changed::" + SCREEN_RECORDING_INDICATOR,
      this._onScreenRecordingIndicatorChanged.bind(this),
    );
    this._onBlurChangedID = this._settings.connect(
      "changed::" + BLUR,
      this._onBlurChanged.bind(this),
    );
  }

  disable() {
    this._settings = null;

    // unregister listeners
    if (this._onPrivacyIndicatorsChangedID) {
      global.settings.disconnect(this._onPrivacyIndicatorsChangedID);
      this._onPrivacyIndicatorsChangedID = null;
    }
    if (this._onScreenSharingIndicatorChangedID) {
      global.settings.disconnect(this._onScreenSharingIndicatorChangedID);
      this._onScreenSharingIndicatorChangedID = null;
    }
    if (this._onScreenRecordingIndicatorChangedID) {
      global.settings.disconnect(this._onScreenRecordingIndicatorChangedID);
      this._onScreenRecordingIndicatorChangedID = null;
    }
    if (this._onBlurChangedID) {
      global.settings.disconnect(this._onBlurChangedID);
      this._onBlurChangedID = null;
    }

    // remove classes
    this._updateClass(false, PRIVACY_INDICATORS_CLASS);
    this._updateClass(false, SCREEN_SHARING_INDICATOR_CLASS);
    this._updateClass(false, SCREEN_RECORDING_INDICATOR_CLASS);
    this._updateClass(false, BLUR_CLASS);
  }

  // helper function to add or remove a class
  _updateClass(add, className) {
    if (add) {
      Main.layoutManager.uiGroup.add_style_class_name(className);
      return;
    }
    Main.layoutManager.uiGroup.remove_style_class_name(className);
  }

  _onPrivacyIndicatorsChanged() {
    this._updateClass(
      this._settings.get_boolean(PRIVACY_INDICATORS),
      PRIVACY_INDICATORS_CLASS,
    );
  }

  _onScreenSharingIndicatorChanged() {
    this._updateClass(
      this._settings.get_boolean(SCREEN_SHARING_INDICATOR),
      SCREEN_SHARING_INDICATOR_CLASS,
    );
  }

  _onScreenRecordingIndicatorChanged() {
    this._updateClass(
      this._settings.get_boolean(SCREEN_RECORDING_INDICATOR),
      SCREEN_RECORDING_INDICATOR_CLASS,
    );
  }

  _onBlurChanged() {
    this._updateClass(this._settings.get_boolean(BLUR), BLUR_CLASS);
  }
}

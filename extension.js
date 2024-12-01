import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import * as Main from "resource:///org/gnome/shell/ui/main.js";

export default class PrivacyIndicatorsAccentColor extends Extension {
  enable() {
    this._settings = this.getSettings();

    this._onPrivacyIndicatorsChanged();
    this._onScreenSharingIndicatorChanged();
    this._onScreenRecordingIndicatorChanged();
    this._onBlurChanged();

    this._settings.connect(
      "changed::privacy-indicators",
      this._onPrivacyIndicatorsChanged.bind(this),
    );
    this._settings.connect(
      "changed::screen-sharing-indicator",
      this._onScreenSharingIndicatorChanged.bind(this),
    );
    this._settings.connect(
      "changed::screen-recording-indicator",
      this._onScreenRecordingIndicatorChanged.bind(this),
    );
    this._settings.connect("changed::blur", this._onBlurChanged.bind(this));
  }

  disable() {
    this._settings = null;
  }

  _onPrivacyIndicatorsChanged() {
    if (this._settings.get_boolean("privacy-indicators")) {
      Main.layoutManager.uiGroup.add_style_class_name(
        "privacy-indicators-accent-color",
      );
      return;
    }
    Main.layoutManager.uiGroup.remove_style_class_name(
      "privacy-indicators-accent-color",
    );
  }

  _onScreenSharingIndicatorChanged() {
    if (this._settings.get_boolean("screen-sharing-indicator")) {
      Main.layoutManager.uiGroup.add_style_class_name(
        "screen-sharing-indicator-accent-color",
      );
      return;
    }
    Main.layoutManager.uiGroup.remove_style_class_name(
      "screen-sharing-indicator-accent-color",
    );
  }

  _onScreenRecordingIndicatorChanged() {
    if (this._settings.get_boolean("screen-recording-indicator")) {
      Main.layoutManager.uiGroup.add_style_class_name(
        "screen-recording-indicator-accent-color",
      );
      return;
    }
    Main.layoutManager.uiGroup.remove_style_class_name(
      "screen-recording-indicator-accent-color",
    );
  }

  _onBlurChanged() {
    if (this._settings.get_boolean("blur")) {
      Main.layoutManager.uiGroup.add_style_class_name(
        "screen-sharing-recording-indicators-blur",
      );
      return;
    }
    Main.layoutManager.uiGroup.remove_style_class_name(
      "screen-sharing-recording-indicators-blur",
    );
  }
}

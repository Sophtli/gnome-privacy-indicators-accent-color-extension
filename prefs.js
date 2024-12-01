import Gio from "gi://Gio";
import Adw from "gi://Adw";

import { ExtensionPreferences } from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

export default class ExamplePreferences extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    const page = new Adw.PreferencesPage({
      title: "General",
      icon_name: "dialog-information-symbolic",
    });
    window.add(page);

    const group = new Adw.PreferencesGroup({
      title: "Appearance",
    });
    page.add(group);

    const privacyIndicatorsRow = new Adw.SwitchRow({
      title: "Privacy Indicators",
      subtitle: "Whether to recolor the privacy indicators",
    });
    group.add(privacyIndicatorsRow);

    const screenSharingIndicatorRow = new Adw.SwitchRow({
      title: "Screen Sharing Indicator",
      subtitle: "Whether to recolor the screen sharing indicator",
    });
    group.add(screenSharingIndicatorRow);

    const screenRecordingIndicatorRow = new Adw.SwitchRow({
      title: "Screen Recording Indicator",
      subtitle: "Whether to recolor the screen recording indicator",
    });
    group.add(screenRecordingIndicatorRow);

    const blurRow = new Adw.SwitchRow({
      title: "Privacy Indicators",
      subtitle:
        "Whether to apply blur to the screen sharing and recording indicators, this setting only works if the indicators are recolored",
    });
    group.add(blurRow);

    window._settings = this.getSettings();
    window._settings.bind(
      "privacy-indicators",
      privacyIndicatorsRow,
      "active",
      Gio.SettingsBindFlags.DEFAULT,
    );
    window._settings.bind(
      "screen-sharing-indicator",
      screenSharingIndicatorRow,
      "active",
      Gio.SettingsBindFlags.DEFAULT,
    );
    window._settings.bind(
      "screen-recording-indicator",
      screenRecordingIndicatorRow,
      "active",
      Gio.SettingsBindFlags.DEFAULT,
    );
    window._settings.bind(
      "blur",
      blurRow,
      "active",
      Gio.SettingsBindFlags.DEFAULT,
    );
  }
}

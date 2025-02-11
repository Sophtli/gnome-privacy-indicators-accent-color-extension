import Gio from "gi://Gio";
import Adw from "gi://Adw";

import {
  ExtensionPreferences,
  gettext as _,
} from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

export default class PrivacyIndicatorsAccentColorPreferences extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    const page = new Adw.PreferencesPage();
    window.add(page);

    const group = new Adw.PreferencesGroup({
      title: _("Appearance"),
    });
    page.add(group);

    const privacyIndicatorsRow = new Adw.SwitchRow({
      title: _("Privacy Indicators"),
      subtitle: _("Recolor the privacy indicators"),
    });
    group.add(privacyIndicatorsRow);

    const screenSharingIndicatorRow = new Adw.SwitchRow({
      title: _("Screen Sharing Indicator"),
      subtitle: _("Recolor the screen sharing indicator"),
    });
    group.add(screenSharingIndicatorRow);

    const screenRecordingIndicatorRow = new Adw.SwitchRow({
      title: _("Screen Recording Indicator"),
      subtitle: _("Recolor the screen recording indicator"),
    });
    group.add(screenRecordingIndicatorRow);

    const blurRow = new Adw.SwitchRow({
      title: _("Blur"),
      subtitle: _(
        "Apply blur to the screen sharing and recording indicators; this setting only works if the indicators are recolored"
      ),
    });
    group.add(blurRow);

    window._settings = this.getSettings();
    window._settings.bind(
      "privacy-indicators",
      privacyIndicatorsRow,
      "active",
      Gio.SettingsBindFlags.DEFAULT
    );
    window._settings.bind(
      "screen-sharing-indicator",
      screenSharingIndicatorRow,
      "active",
      Gio.SettingsBindFlags.DEFAULT
    );
    window._settings.bind(
      "screen-recording-indicator",
      screenRecordingIndicatorRow,
      "active",
      Gio.SettingsBindFlags.DEFAULT
    );
    window._settings.bind(
      "blur",
      blurRow,
      "active",
      Gio.SettingsBindFlags.DEFAULT
    );
  }
}

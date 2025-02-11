# Privacy Indicators Accent Color

Apply the system accent color to privacy indicators (e.g., microphone) and screen sharing/recording indicators, with an optional blurred background, in the top bar

# Package

```
gnome-extensions pack src --podir=../po --extra-source=../LICENSE
```

# Translation

## Update .pot file

```
xgettext --from-code=UTF-8 --package-name="Privacy Indicators Accent Color" --copyright-holder="Sophtli" --output=po/privacy-indicators-accent-color@sopht.li.pot src/*.js
```

## Create new .po file

```
msginit --locale=de
```

## Update .po file

```
msgmerge -U po/de.po po/privacy-indicators-accent-color@sopht.li.pot
```

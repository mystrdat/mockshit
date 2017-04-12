# mockshit
Mockshit. Offensively simple HTML/CSS mockup system with routing and actions.

![Mockshit in action!](https://github.com/mystrdat/mockshit/raw/master/demo.gif)

Either load the `mockshit.js` script before the end of your `</body>` tag or use the provided `template.html` to do your thing.

`<script src="https://rawgit.com/mystrdat/mockshit/master/mockshit.js"></script>` 

## Professional workflow

- Write everything in one HTML file like a pig and style it 
- Position some elements as `absolute` or `fixed` so they can overlap, the method requires it
- Add an `id` to elements to make them "components", make sure it's unique
- Provide a config object to show/hide components in fictious views (first loads as default)
- Link between views with `data-click="view1"` attribute on any element (more actions coming!)
- Use `.in` and `.out` classes when views change to animate components
- Need dynamic data? No you don't, work around it
- Learn to pretend it's not _that_ easy

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>mockshit</title>
  <link rel="stylesheet" href="style.css">
  <script>
    window.views = {
      view1: ['title1', 'content1', 'footer'],
      view2: ['title2', 'content2', 'footer'],
      view3: ['title3', 'content3', 'notice']
    };
  </script>
</head>
<body>

<header>
  <span id="title1">Yer</span>
  <span id="title2">a hacker,</span>
  <span id="title3">Harry.</span>
</header>

<div id="content1">
  <h1>1!</h1>
  <p>Glück Auf! Das famos Mundraub picheln.</p>
  <button data-click="view2">Next!</button>
</div>

<div id="content2">
  <h1>2!</h1>
  <p>Det är ett välkänt faktum att läsare distraheras
    av läsbar text på en sida när man skall studera layouten.</p> 
  <button data-click="view3">More next!</button>
</div>

<div id="content3">
  <h1>3!</h1>
  <p>Nem csak 5 évszázadot élt túl, de az elektronikus
    betûkészleteknél is változatlanul megmaradt.</p>
  <button data-click="view1">Go back!</button>
</div>

<div id="notice">But you suck!</div>

<footer id="footer">&copy;2018</footer>

<script src="mockshit.js"></script>
</body>
</html>
```

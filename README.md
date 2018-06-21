# Decoupled styling

## Solution - React + TypeScript + CSS-Modules

### Stack

- [React](https://github.com/facebook/react)
- [TypeScript](https://github.com/Microsoft/TypeScript)
- [CSS Modules](https://github.com/css-modules/css-modules)

### Goals

Mission statement:

> Decoupling from styling for UI-components should be on similar level as in native HTML/CSS (HTML element is decoupled from its styling by exposing an API to inject styling via `class` attribute or `className` property).

Requirements:

1.  UI component is decoupled from its styling. Styling is injected into the component via its API.
2.  UI component has its default, minimal styling, in case no styling is injected.
3.  Default styling may be overwritten by custom styling via styling-API.
4.  Default styling absent from the styling-API, can be also overwritten (although "unsafely", with regards to [SemVer](https://semver.org/)).
5.  Styling can be set for the UI-component and its children (and grand-children etc.)
6.  It's possible to customise the styling for the whole application in one run (styling theme).

Additional requirements (no steps backwards):

1.  UI components styles are isolated (no name-conflicts, styles don't leak-in and out)
2.  No implicit dependencies to styles
3.  UI components should be decoupled from each other, as far as possible

### Solution

#### Examples of usage:

To simplify examples, global CSS-classes are used.

1.  Native element with default styling:

```tsx
<textarea />
```

2.  UI-Component with default styling:

```tsx
<MyButton />
```

3.  Native element with custom styling (pass a CSS-class):

```tsx
<textarea className="center" />
```

4.  UI-Component with custom styling (pass an object containing CSS-classes):

```tsx
<MyButton classes={rootPosition: "center", content: "fixed-width"} />
```

> It's up to the component itself to expose its styling-API.

5.  Higher-level component (nested objects containing CSS-classes to overwrite children styles):

```tsx
<App classes={title: "big", okButton: {rootPosition: "left"}} />
```

### Demo

- Install dependencies: `npm install`
- Run dev server: `npm start`
- Go to: http://localhost:3000

#### `MyButton` component

- [Styling API - TypeScript interface](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/my-button/my-button.css.d.ts)
- [Styling injected into parameter](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/my-button/my-button.tsx#L7)
- [Implemented default styling and injected styling](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/my-button/my-button.tsx#L16)
- [Component variants can be implemented in various ways - here is the simplest - as a separate class](https://github.com/mrac/decoupled-styling-css-in-js/blob/master/src/my-button/my-button.tsx#L27)

#### Higher-level - `App` component

- [`MyButton` usage](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/app/app.tsx#L26)
- [Styling API - contains also children styling API](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/app/app.css.d.ts#L9)
- [Nested component's styling is customised using `__` markup in class-names (in otherwise flat classes structure)](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/app/app.css#L24)

#### Application-level - themes

- Themes based on `App` component default styling - [Theme A](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/themes/theme-a.css), [Theme B](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/themes/theme-b.css)
- [Reset to component's default setting (ignore any mid-level component customisations)](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/themes/theme-b.css#L1)
- [Any level of customisation is possible, it's just CSS](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/themes/theme-b.css#L13)
- [Theme used](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/index.tsx#L22)

### Customisation

- To make nested component customisation possible with CSS Modules, the [`nested()` function](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/nested.ts) is used [in components](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/app/app.tsx#L14) to construct nested-object styling-API from flat CSS files. CSS Modules don't support nested component's customization yet - [see issue](https://github.com/webpack-contrib/css-loader/issues/520).
- Overwriting component's default styles is done "per class" (instead of "per CSS-property" like natively in CSS). In case there is need to alter just one CSS-property, it's possible to use [composition](https://github.com/css-modules/css-modules/blob/master/docs/composition.md) like [here in `app` component](https://github.com/mrac/decoupled-styling-css-modules/blob/master/src/themes/theme-a.css#L7).
- native CSS overwriting solution by [CSS Cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade) is not used (unless composition is used). CSS-classes are not combined, but simply replaced if customised.

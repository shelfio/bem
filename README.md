# Shelf/bem [![CircleCI](https://app.circleci.com/pipelines/github/shelfio/bem)](https://circleci.com/gh/shelfio/xxxxxx/tree/master)![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

Slim version of [bem-cn](https://github.com/albburtsev/bem-cn) without mixins, state and other stuff.

## Install

```
$ yarn add @shelf/bem
```

## Usage

```js
import {block} from '@shelf/bem';

const b = block('nav-item');

function NavLink({isActive, href, icon, name}) {
  return (
    <li className={b({active: isActive})}> // .nav-item .nav-item--active
      <Icon icon={icon} className={b('icon')} /> // .nav-item__icon
      <a href={href} className={b('link')}>  // .nav-item__link
        {name}
      </a>
    </li>
  );
}
```

## API

### block

You can pass either element or modifiers as a first argument. Modifies can be passed as an array or object.

```js
import {block} from '@shelf/bem';

const b = block('nav-item');

b(); // nav-item
b('link'); // nav-item__link
b(['active']); // nav-item nav-item--active
b({active: true}); // nav-item nav-item--active
```

Second argument is modifiers & could be combined with element. You can pass them as an array or object.

```js
const isActive = true;
b('link', [isActive && 'active']); // nav-item__link nav-item__link--active

const isSelected = true;
b('link', {selected: isSelected}); // nav-item__link nav-item__link--selected
```

### setup

You can setup your own delimiters for element and modifier

```js
import {setup} from '@shelf/bem';

const block = setup({el: '_', mod: '-'});
const b = block('nav-item');

b('link'); // nav-item_link
b('link', ['active']); // nav-item_link nav-item_link-active
```

Additionally you can pass `ns` to customize namespace

```
const block = setup({ns: 'my-app-'});
const b = block('nav-item');

b(); // my-app-nav-item
```

You can also provide custom classMap to map your class names to bem class names. Helpful when you want to use bem with
css modules.

```js
import {setup} from '@shelf/bem';

const block = setup({classMap: {'nav-item__link': 'nav-item__link-13'}});
const b = block('nav-item');

b('link'); // nav-item__link-13
```

## Publish

```sh
$ git checkout master
$ yarn version
$ yarn publish
$ git push origin master --tags
```

## License

MIT © [Shelf](https://shelf.io)

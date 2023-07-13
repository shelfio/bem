# Shelf/bem [![CircleCI](https://app.circleci.com/pipelines/github/shelfio/bem)](https://circleci.com/gh/shelfio/xxxxxx/tree/master)![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

Wrapper around BEM for CSS

## Install

```
$ yarn add @shelf/bem
```

## Usage

```js

import {createBlock} from '@shelf/bem'

const b = createBlock('nav-item');

function NavLink({isActive, href, icon, name}) {
  return <li className={b({active: isActive})}> // .nav-item .nav-item--active
        <Icon icon={icon} className={b('icon')} /> // .nav-link__icon
        <a href={href} className={b('link')}>{name}</a> // .nav-item__link
    </li>
}
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

# yugioh-card-react
That's a react component for rendering a yu-gi-oh! card.

```
<Card card={card}, image={alt}, lang={Language.zh_CN}, asset_prefix="https://xxx" furigana? ...DivElements>
```

+ `card`, Card object
+ `image`, The center card image
+ `lang`, Card Language, only zh_CN and JP are tested.
+ `asset_prefix`, Please find a proper position to put the `public` folder in this repo.
+ `furigana`, Force render furigana inner text. Otherwise, only enabled when lang is JP.


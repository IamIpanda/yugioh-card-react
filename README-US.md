<h1 align="center">Yu-Gi-Oh! Card - Yugioh Card React</h1>
<div align="center">
  <p><a href="./README.md">简体中文</a> | English</p>
</div>
<p align="center">A react component for rendering a yu-gi-oh! card.</p>

That's a simulation for [yugioh-card](https://www.npmjs.com/package/yugioh-card).    
Only HTML + CSS is used, no Canvas.    
Currently, only standard Yu-Gi-Oh! card is supported

## Usage
### React
```
<Card 
  card={card} 
  image={alt} 
  lang={Language.zh_CN} 
  asset_prefix="https://xxx" 
  furigana?

  ...DivElements 
/>
```

+ `card`, `Data.Card` object
+ `image`, Card image
+ `lang`, Card Language (Enum `Data.Language`)
+ `asset_prefix`, image source. Please deploy the [yugioh-card static files](https://github.com/kooriookami/yugioh-card/tree/master/src/assets/yugioh-card/yugioh) to an appropriate location. This project has no forks for now.
+ `furigana`, Force render furigana inner text. Otherwise, only enabled when `lang` is `JP`.

#### Scale Parameters
+ `scale`, Scale for the whole card. When undefined will auto scale to fit.
+ `name_scale`, ScaleX for card name. When undefined will auto scale to fit.
+ `desc_scale`, Font size scale for effect panel. When undefined will auto scale by text length. (Will cause the panel flash) Min 0.5x.
+ `pdesc_scale`, Font size scale for pendulum effect panel. When undefined will auto scale by text length. (Will cause the panel flash) Min 0.5x.

#### `Data.Card` object
|FieldName|Type|Description|
|---------|-----|-----------|
|code|number|Eight-digit password|
|name|string|Card name|
|desc|string|Effect description|
|type|number|Card type; value follows ygopro, you can splice with `Data.Type`|
|attribute|number|Attribute; value follows ygopro, you can splice with `Data.Attribute`|
|level|number|Level; for Link monsters, this is the Link marker; value follows ygopro, you can splice with `Data.Linkmarker`|
|subtype_text?|string|Subtype text (i.e., the first line of the monster effect box)|
|attack?|number|ATK|
|defense?|number|DEF|
|pendulum_text?|string|Pendulum effect text; valid only when `type` includes Pendulum|
|lscale?|number|Left Scale; valid only when `type` includes Pendulum|
|rscale?|number|Right Scale; valid only when `type` includes Pendulum|
|pack_info?|string|Pack name|
|name_color?|string|Card name color|
|flavor_text?|string|Flavor text|
|image?|string|Card image (will be overridden by `prop.image`)|
copyright?|'auto'&#124;'sc'&#124;'jp'&#124;'en'|copyright text, will decided by `lang` if set `auto`
laser?|'laser1'&#124;'laser2'&#124;'laser3'&#124;'laser4'|laser sign
rare?|'dt'&#124;'ur'&#124;'gr'&#124;'hr'&#124;'ser'&#124;'gser'&#124;'pser'|card rare
twentieth?|boolean|20ser sign

### Japanese Furigana
Use `[Kanji (Hiragana)]` and `{Kanji (Katakana)}` for furigana.  
The content wrapped in square brackets should be center-aligned, and the content wrapped in curly braces should be justified (left and right aligned); Please refer to the actual alignment on the card.

### Notes
The font for Simplified Chinese cards is `custom1`. If you need to use `ygo-sc` or other fonts, please modify the CSS file yourself.

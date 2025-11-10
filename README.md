<h1 align="center">游戏王卡片 - Yugioh Card React</h1>
<div align="center">
  <p>简体中文 | <a href="./README-US.md">English</a></p>
</div>
<p align="center">一个使用React + HTML渲染游戏王卡片的工具。</p>

这是对 [yugioh-card](https://www.npmjs.com/package/yugioh-card) 的一个模仿。   
不使用`Canvas`而纯粹使用`HTML`完成。    
目前只支持标准游戏王卡片。

## 使用方法
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

+ `card`, `Data.Card`对象（下详）
+ `image`, 卡片图像
+ `lang`, 语言（`Data.Language`枚举）
+ `asset_prefix`, 图片源，请将[yugioh-card的静态文件](https://github.com/kooriookami/yugioh-card/tree/master/src/assets/yugioh-card/yugioh)部署至合适的位置。本项目暂无分叉。
+ `furigana`, 是否强制启用振假名渲染。如果未强制启用，仅在`lang`设为`JP`时强制启用。

#### 缩放参数
+ `scale`, 整张卡片的缩放。不设置的场合，会根据所在容器自动缩放。
+ `name_scale`, 卡名的横向缩放。不设置的场合，会根据剩余长度自动缩放。
+ `desc_scale`, 卡片效果的字体大小缩放。不设置的场合，会根据文本长度自动缩放（会闪烁）。最小缩放至0.5倍。
+ `pdesc_scale`, 灵摆效果的字体大小缩放。不设置的场合，会根据文本长度自动缩放（会闪烁）。最小缩放至0.5倍。

#### `Data.Card` 对象
字段名|类型|说明
----|----|----
code|number|八位密码
name|string|卡名
desc|string|效果描述
type|number|卡片类型，数值遵循`ygopro`，你可以用`Data.Type`进行拼接
attribute|number|属性，数值遵循`ygopro`，你可以用`Data.Attribute`进行拼接
level|number|等级，对于连接怪兽此处为连接符号，数值遵循`ygopro`，你可以用`Data.Linkmarker`进行拼接
subtype_text?|string|子类型文本（即怪兽效果栏的第一行）
attack?|number|攻击力
defense?|number|防御力
pendulum_text?|string|灵摆效果文本，仅在`type`包含灵摆时有效
lscale?|number|左刻度，仅在`type`包含灵摆时有效
rscale?|number|右刻读，仅在`type`包含灵摆时有效
pack_info?|string|卡包名
name_color?|string|string[]|卡名颜色，如有多个值则为渐变色
flavor_text?|string|风味文字
image?|string|卡片图像（会被`prop.image`覆盖）
copyright?|'auto'&#124;'sc'&#124;'jp'&#124;'en'|版权文字，`auto`则根据`lang`推测
laser?|'laser1'&#124;'laser2'&#124;'laser3'&#124;'laser4'|激光镭射标识
rare?|'dt'&#124;'ur'&#124;'gr'&#124;'hr'&#124;'ser'&#124;'gser'&#124;'pser'|罕贵
twentieth?|boolean|20周年标记

### 日语注音
使用`[汉字(平假名)]`和`{汉字(片假名)}`进行注音。    
方括号包裹的内容居中对齐，大括号包裹的内容两端对齐，请参考卡片实际应有的对齐方式。

### 注释
简体中文卡片的字体为`custom1`，如需使用`ygo-sc`或其他字体请自行修改CSS文件。

import { Language } from "./card-image/data"
import { Card, Data } from "./main"
import "./test.css"

let card1: Data.Card = {
    code: 89631139,
    image: '/image/89631140.jpg',
    name: "青眼白龙",
    desc: "以高攻击力著称的传说之龙。任何对手都能粉碎，其破坏力不可估量。",
    type: 17,
    attribute: 16,
    level: 8,
    subtype_text: "龙族",
    attack: 3000,
    defense: 2500,
    pack_info: "SD25-SC001"
}
let card2: Data.Card = {
    code: 81439173,
    image: '/image/81439173.jpg',
    name: "愚蠢的埋葬",
    desc: "①：从卡组把1只怪兽送去墓地。",
    type: 131074,
    attribute: 0,
    level: 0
}
let card3: Data.Card = {
    code: 29301450,
    image: '/image/29301450.jpg',
    name: "S：P小夜",
    desc: "效果怪兽2只\n\
这个卡名的①②的效果1回合各能使用1次。\n\
①：这张卡用融合·同调·超量·连接怪兽的其中任意种为素材作连接召唤的场合，以自己或对方的场上·墓地1张卡为对象才能发动。那张卡除外。这个回合，自己怪兽不能直接攻击。\n\
②：对方的效果发动时，以包含自己场上的怪兽的场上2只表侧表示怪兽为对象才能发动。那2只怪兽直到结束阶段除外。",
    subtype_text: "战士族／连接／效果",
    flavor_text: "「你给我站住！」",
    type: 67108897,
    attribute: 32,
    level: 2,
    attack: 1600,
    defense: 40,
}
let card4: Data.Card = {
    code: 92746535,
    image: '/image/92746535.jpg',
    name: "龙剑士 光辉星·灵摆摆摆摆摆摆摆",
    desc: "不能用这张卡为素材把「龙剑士」怪兽以外的融合·同调·超量怪兽特殊召唤。",
    pendulum_text: "①：1回合1次，另一边的自己的灵摆区域有卡存在的场合才能发动。那张卡破坏，把1张那张卡的同名卡从卡组加入手卡。",
    flavor_text: "「愚蠢。」\n~龙魔王 魔道矢·灵摆",
    lscale: 5,
    rscale: 5,
    subtype_text: "龙族／灵摆／调整／效果",
    type: 16781345,
    attribute: 16,
    level: 4,
    attack: 1850,
    defense: 0,
    pack_info: "SD25-SC001"
}

export const App = () => {
    return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Card asset_prefix="/assets" lang={Language.ZH_CN} card={card1} style={{ width: 'calc(25% - 5px)' }} />
        <Card asset_prefix="/assets" lang={Language.ZH_CN} card={card2} style={{ width: 'calc(25% - 5px)' }} />
        <Card asset_prefix="/assets" lang={Language.ZH_CN} card={card3} style={{ width: 'calc(25% - 5px)' }} />
        <Card asset_prefix="/assets" lang={Language.ZH_CN} card={card4} style={{ width: 'calc(25% - 5px)' }} />
    </div>
}

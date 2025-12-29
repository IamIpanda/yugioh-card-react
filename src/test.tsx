import { useState } from "preact/hooks"
import { Language } from "./card-image/data"
import { Card, Data } from "./main"
import "./test.css"

function merge_card(precursor: Partial<Data.Card>, texts: Record<Language, Partial<Data.Card>>, lang: Language): Data.Card {
    return {
        ...precursor,
        ...texts[lang]
    } as Data.Card
}

let card1_precursor: Partial<Data.Card> = {
    code: 89631139,
    image: '/image/89631140.jpg',
    type: 17,
    attribute: 16,
    level: 8,
    attack: 3000,
    defense: 2500,
    pack_info: "SD25-SC001"
}
let card1_texts: Record<Language, Partial<Data.Card>> = {
    [Language.ZH_CN]: { name: '青眼白龙', desc: '以高攻击力著称的传说之龙。任何对手都能粉碎，其破坏力不可估量。', subtype_text: '龙族'},
    [Language.ZH_TW]: { name: '青眼白龍', desc: '以高攻擊力著稱的傳說之龍。任何對手都能夠粉碎，其破壞力不可估量。', subtype_text: '龍族' },
    [Language.EN]: { name: 'Blue-Eyes White Dragon', desc: 'This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.', subtype_text: 'Dragon' },
    [Language.JP]: { name: '{青眼の白龍(ブルーアイズ・ホワイト・ドラゴン)}', desc: '[高(たか)]い[攻(こう)][撃(げき)][力(りょく)]を[誇(ほこ)]る[伝(でん)][説(せつ)]のドラゴン。どんな[相(あい)][手(て)]でも[粉(ふん)][砕(さい)]する、その[破(は)][壊(かい)][力(りょく)]は[計(はか)]り[知(し)]れない。', subtype_text: 'ドラゴン[族(ぞく)]／[通(つう)][常(じょう)]' },
    [Language.KR]: { name: '푸른 눈의 백룡', desc: '높은 공격력을 자랑하는 전설의 드래곤. 어떠한 상대라도 분쇄해 버리는 파괴력은 상상을 초월한다.', subtype_text: '드래곤족 / 일반'},
    [Language.ASTRAL]: {}
}

let card2_precursor: Partial<Data.Card> = {
    code: 81439173,
    image: '/image/81439173.jpg',
    type: 131074,
    pack_info: 'SJ2-029'
}
let card2_texts: Record<Language, Partial<Data.Card>> = {
    [Language.ZH_CN]: { name: '愚蠢的埋葬', desc: '①：从卡组把1只怪兽送去墓地。' },
    [Language.ZH_TW]: { name: '愚蠢的埋葬', desc: '①：從卡組把1隻怪獸送去墓地。' },
    [Language.EN]: { name: 'Foolish Burial', desc: 'Send 1 monster from your Deck to the GY.' },
    [Language.JP]: { name: 'おろかな[埋(まい)][葬(そう)]', desc: '①：デッキからモンスター１[体(たい)]を[墓(ぼ)][地(ち)]へ[送(おく)]る。' },
    [Language.KR]: { name: '어리석은 매장', desc: '①: 덱에서 몬스터 1장을 묘지로 보낸다.' },
    [Language.ASTRAL]: {}
}

let card3_precursor: Partial<Data.Card> = {
    code: 29301450,
    image: '/image/29301450.jpg',
    type: 67108897,
    attribute: 32,
    level: 2,
    attack: 1600,
    defense: 40,
    pack_info: 'AGOV-JP046',
    name_color: ['red', 'white', 'red']
}
let card3_texts: Record<Language, Partial<Data.Card>> = {
    [Language.ZH_CN]: {
        name: 'S：P小夜', desc: '效果怪兽2只\n\
这个卡名的①②的效果1回合各能使用1次。\n\
①：这张卡用融合·同调·超量·连接怪兽的其中任意种为素材作连接召唤的场合，以自己或对方的场上·墓地1张卡为对象才能发动。那张卡除外。这个回合，自己怪兽不能直接攻击。\n\
②：对方的效果发动时，以包含自己场上的怪兽的场上2只表侧表示怪兽为对象才能发动。那2只怪兽直到结束阶段除外。', subtype_text: '战士族/连接/效果' },
    [Language.ZH_TW]: { name: '' },
    [Language.EN]: {
        name: 'S:P Little Knight', desc: '2 Effect Monsters\n\
If this card is Link Summoned using a Fusion, Synchro, Xyz, or Link Monster as material: You can target 1 card on the field or in either GY; banish it, also your monsters cannot attack directly this turn.\
When your opponent activates a card or effect(Quick Effect): You can target 2 face - up monsters on the field, including a monster you control; banish both until the End Phase.You can only use each effect of "S:P Little Knight" once per turn.',
        subtype_text: 'Warriror/Link/Effect' },
    [Language.JP]: {
        name: 'Ｓ：Ｐリトルナイト', desc: '[効(こう)][果(か)]モンスター２[体(たい)]\n\
このカード[名(めい)]の①②の[効(こう)][果(か)]はそれぞれ１ターンに１[度(ど)]しか[使(し)][用(よう)]できない。\n\
①：このカードが[融(ゆう)][合(ごう)]・Ｓ・Ｘ・Ｌモンスターのいずれかを[素(そ)][材(ざい)]としてＬ[召(しょう)][喚(かん)]した[場(ば)][合(あい)]、[自(じ)][分(ぶん)]か[相(あい)][手(て)]のフィールド・[墓(ぼ)][地(ち)]のカード１[枚(まい)]を[対(たい)][象(しょう)]として[発(はつ)][動(どう)]できる。\
そのカードを[除(じょ)][外(がい)]する。\
このターン、[自(じ)][分(ぶん)]のモンスターは[直(ちょく)][接(せつ)][攻(こう)][撃(げき)]できない。\
②：[相(あい)][手(て)]の[効(こう)][果(か)]が[発(はつ)][動(どう)]した[時(とき)]、[自(じ)][分(ぶん)]フィールドのモンスターを[含(ふく)]むフィールドの[表(おもて)][側(がわ)][表(ひょう)][示(じ)]モンスター２[体(たい)]を[対(たい)][象(しょう)]として[発(はつ)][動(どう)]できる。\
そのモンスター２[体(たい)]をエンドフェイズまで[除(じょ)][外(がい)]する。', subtype_text: '[戦(せん)][士(し)][族(ぞく)]/リンク/[効(こう)][果(か)]' },
    [Language.KR]: {
        name: '에스:피 리틀나이트', desc: '효과 몬스터 2장\n\
이 카드명의 ①②의 효과는 각각 1턴에 1번밖에 사용할 수 없다.\n\
①: 이 카드를 융합 / 싱크로 / 엑시즈 / 링크 몬스터 중 어느 것을 소재로서 링크 소환했을 경우, 자신이나 상대의 필드 / 묘지의 카드 1장을 대상으로 하고 발동할 수 있다.그 카드를 제외한다.이 턴에, 자신 몬스터는 직접 공격할 수 없다.\n\
②: 상대의 효과가 발동했을 때, 자신 필드의 몬스터를 포함하는 필드의 앞면 표시 몬스터 2장을 대상으로 하고 발동할 수 있다.그 몬스터 2장을 엔드 페이즈까지 제외한다.', subtype_text: '전사족/링크/효과' },
    [Language.ASTRAL]: {}
}

let card4_precursor: Partial<Data.Card> = {
    code: 92746535,
    image: '/image/92746535.jpg',
    lscale: 5,
    rscale: 5,
    type: 16781345,
    attribute: 16,
    level: 8,
    attack: 1850,
    defense: 511,
    pack_info: "CORE-JP025",
}

let card4_texts: Record<Language, Partial<Data.Card>> = {
    [Language.ZH_CN]: {
        name: '龙剑士 光辉星·灵摆', 
        desc: '不能用这张卡为素材把「龙剑士」怪兽以外的融合·同调·超量怪兽特殊召唤。', 
        subtype_text: '龙族／灵摆／调整／效果',
        pendulum_text: "①：1回合1次，另一边的自己的灵摆区域有卡存在的场合才能发动。那张卡破坏，把1张那张卡的同名卡从卡组加入手卡。",
    },
    [Language.ZH_TW]: { name: '' },
    [Language.EN]: {
        name: 'Luster Pendulum, the Dracoslayer', 
        desc: 'Cannot Special Summon Fusion, Synchro, or Xyz Monsters using this card as material, except "Dracoslayer" monsters.',
        pendulum_text: 'Once per turn, if you have a card in your other Pendulum Zone: You can destroy that card, and if you do, add 1 card from your Deck to your hand, with the same name as that card.',
        subtype_text: 'Dragon/Pendulum/Tuner/Effect'
    },
    [Language.JP]: {
        name: '[竜(りゅう)][剣(けん)][士(し)]ラスター[\uff2f(オシリュラム)]', 
        desc: 'このカードを[素(そ)][材(ざい)]として、「[竜(りゅう)][剣(けん)][士(し)]」モンスター[以(い)][外(がい)]の[融(ゆう)][合(ごう)]・Ｓ・Ｘモンスターを[特(とく)][殊(しゅ)][召(しょう)][喚(かん)]する[事(こと)]はできない。', 
        pendulum_text: '①：１ターンに１[度(ど)]、もう[片(かた)][方(ほう)]の[自(じ)][分(ぶん)]のＰゾーンにカードが[存(そん)][在(ざい)]する[場(ば)][合(あい)]に[発(はつ)][動(どう)]できる。そのカードを[破(は)][壊(かい)]し、そのカードの[同(どう)][名(めい)]カード１[枚(まい)]をデッキから[手(て)][札(ふだ)]に[加(くわ)]える。',
        subtype_text: 'ドラゴン[族(ぞく)]/オシリュラム/チューナー/[効(こう)][果(か)]'
    },
    [Language.KR]: {
        name: '룡검사 라스터P', 
        desc: '이 카드를 소재로서, "룡검사" 몬스터 이외의 융합 / 싱크로 / 엑시즈 몬스터를 특수 소환할 수 없다.', 
        pendulum_text: '①: 1턴에 1번, 다른 한쪽 자신의 펜듈럼 존에 카드가 존재할 경우에 발동할 수 있다. 그 카드를 파괴하고, 그 카드의 같은 이름의 카드 1장을 덱에서 패에 넣는다.',
        subtype_text: '전사족/링크/튜너/효과'
    },
    [Language.ASTRAL]: {}
}

export const App = () => {
    let [lang, _set_lang] = useState(Language.JP)
    return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Card asset_prefix="/assets" lang={lang} card={merge_card(card1_precursor, card1_texts, lang)} style={{ width: 'calc(25% - 5px)' }} />
        <Card asset_prefix="/assets" lang={lang} card={merge_card(card2_precursor, card2_texts, lang)} style={{ width: 'calc(25% - 5px)' }} />
        <Card asset_prefix="/assets" lang={lang} card={merge_card(card3_precursor, card3_texts, lang)} style={{ width: 'calc(25% - 5px)' }} />
        <Card asset_prefix="/assets" lang={lang} card={merge_card(card4_precursor, card4_texts, lang)} style={{ width: 'calc(25% - 5px)' }} extend />
    </div>
}

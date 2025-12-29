import { Language, Card as DataCard, decide_backend, Type, decide_attribute, decide_type_text, Linkmarker, is_white_name, BRACKET_TEXTS } from "./data"
import { HTMLProps, useEffect, useRef, useState } from "preact/compat"
import "./yu-gi-oh.css"
import { Furigana } from "./furigana"

type Config = {
    lang: Language
    furigana?: boolean
    asset_prefix: String
}

type CardProp = {
    card: DataCard,
    image?: string | null
    
    scale?: number,
    name_scale?: number,
    desc_scale?: number,
    pdesc_scale?: number,

    extend?: boolean
    full_frame?: boolean
} & Config & Omit<HTMLProps<HTMLDivElement>, 'lang'>

function Card(props: CardProp) {
    const { card, image, asset_prefix, lang, scale: _scale, name_scale, desc_scale, pdesc_scale, extend, full_frame, ...rest_props } = props;
    const [scale, set_scale] = useState(_scale ?? 0.1);
    const container_element = useRef<HTMLDivElement>(null)
    if (_scale == null)
        useEffect(() => {
            if (container_element.current == null) return;
            const resize_observer = new ResizeObserver(() => {
                if (container_element.current)
                    set_scale(Math.min(1, container_element.current.offsetWidth / 1394, container_element.current.offsetHeight / 2031));
            })
            resize_observer.observe(container_element.current);
            return () => resize_observer.disconnect();
        }, [container_element.current])

    const background = `${asset_prefix}/yugioh/image/card-${decide_backend(card.type, card.metas, extend, full_frame)}.png`
    const is_monster = (card.type & Type.Monster) > 0
    const is_pendulum = (card.type & Type.Pendulum) > 0
    const is_link = (card.type & Type.Link) > 0
    const is_normal = (card.type & Type.Normal) > 0
    const is_no_atk = card.attack == null
    let pendulum_appendix = (is_pendulum) ? '-pendulum' : ''
    let pendulum_asset_appendix = (extend && is_pendulum && (card.type & Type.Trap) > 0) ? '-oscillulam' : pendulum_appendix
    if (full_frame && !is_pendulum) {
        pendulum_asset_appendix = '-fullframe'
        pendulum_appendix = '-fullframe'
    }
    const card_image = image ?? card.image;
    const devolution = !(props.furigana ?? lang == Language.JP);
    const brackets = BRACKET_TEXTS[lang];
    const copyright = card.copyright === 'auto' ? {
        [Language.ASTRAL]: 'jp',
        [Language.EN]: 'en',
        [Language.JP]: 'jp',
        [Language.ZH_CN]: 'sc',
        [Language.ZH_TW]: 'jp',
        [Language.KR]: 'jp'
    }[lang] : card.copyright


    return <div class="yugioh-container" {...rest_props} ref={container_element}>
        <div class={`card ${_scale == null ? 'card-auto' : ''}`} style={{ '--card-scale': scale }} >
            <img class="background" src={background} />
            <link rel="stylesheet" type="text/css" href={`${asset_prefix}/yugioh/font/ygo-font.css`} />
            <link rel="stylesheet" type="text/css" href={`${asset_prefix}/custom-font/custom-font.css`} />

            <Name class={`name name-${lang} ${is_white_name(card.type, extend) ? 'name-white' : ''}`} devolution={devolution} scale={name_scale} color={card.name_color}>{card.name}</Name>
            <Attribute {...props} />
            { is_link ? null : is_monster ? <Levels {...props} /> 
              : <Types lang={lang} asset_prefix={asset_prefix} devolution={devolution} {...decide_type_text(card.type, lang)} /> }
            {card_image && <img class={`image${pendulum_appendix}`} src={card_image} /> }
            <img class={`mask${pendulum_appendix}`} src={`${asset_prefix}/yugioh/image/card-mask${pendulum_asset_appendix}.png`} />
            { is_pendulum && <>
                { card.lscale && <div class="scale scale-left">{card.lscale}</div> }
                { card.rscale && <div class="scale scale-right">{card.rscale}</div> }
                { card.pendulum_text && <EffectDescription class={`description description-${lang} description-pendulum`} flag={card.pendulum_text} scale={pdesc_scale}>
                    <Furigana devolution={devolution}>{card.pendulum_text}</Furigana>
                </EffectDescription>}
            </>}
            { card.pack_info && <div class={`pack-info${is_pendulum ? ' pack-info-pendulum' : ''}${is_link ? ' pack-info-link' : ''}${full_frame ? ' pack-info-fullframe': ''}`}>{card.pack_info}</div> }
            { is_link && <LinkMarker linkmarker={card.defense ?? 0} pendulum={is_pendulum || full_frame} {...props} /> }
            { card.twentieth && <img class="twentieth" src={`${asset_prefix}/yugioh/image/twentieth.png`} />}
            <EffectDescription class={`description description-${lang} ${is_normal ? 'description-normal' : ''}${is_no_atk ? ' description-no-atk' : ''}`} flag={card.desc} scale={desc_scale}>
                {card.subtype_text && <div class="subtype"><div class="wrapper">{brackets[0]}</div><Furigana devolution={devolution}>{card.subtype_text}</Furigana><div class="wrapper">{brackets[1]}</div></div> }
                <Furigana class="effect" devolution={devolution}>{card.desc}</Furigana>
                { card.flavor_text && <div class="flavor">{card.flavor_text}</div> }
            </EffectDescription>
            { is_monster && <img class="number-background" src={`${asset_prefix}/yugioh/image/${(card.type & Type.Link) > 0 ? 'atk-link.svg' : 'atk-def.svg'}`} />}
            { is_monster && <Number class="atk" num={card.attack ?? 0} />}
            { is_monster && <Number class={`${is_link ? "link" : "def"}`} num={(is_link ? card.level : card.defense) ?? 0} />}
            { card.code && <div class={`code ${is_pendulum ? ' code-pendulum' : ''}${full_frame ? ' code-fullframe': ''}${is_link ? ' code-link' : ''}`}>{card.code}</div> }
            { copyright && <img class={`copyright copyright-${copyright}`} src={`${asset_prefix}/yugioh/image/copyright-${copyright}-${is_white_name(card.type) ? 'white' : 'black'}.svg`} /> }
            { card.laser && <img class="laser" src={`${asset_prefix}/yugioh/image/${card.laser}.png`} /> }
            { card.rare && <img class={`rare rare-${card.rare}`} src={`${asset_prefix}/yugioh/image/rare-${card.rare}${is_pendulum ? '-pendulum' : ''}.png`} /> }
        </div>
    </div>
}

function Name(props: HTMLProps<HTMLDivElement> & { devolution: boolean, scale?: number, color?: string | string[] }) {
    let { scale: _scale, color, ...rest_props } = props;
    let [scale, setScale] = useState(_scale ?? 1);
    let element = useRef<HTMLDivElement>(null)
    if (_scale == null) {
        const shrink = () => {
            if (element.current == null) return
            if (element.current.offsetWidth < element.current.scrollWidth)
                setScale(element.current.offsetWidth / element.current.scrollWidth)
        }
        useEffect(shrink, [element.current, scale])
        useEffect(() => { setScale(1); shrink() }, [props.children])
    }
    let style = props.style ?? {} as any
    let name_style = {}
    if (color == null)
        name_style = {}
    else if (typeof color == 'string')
        name_style = { color: color }
    else 
        name_style = { background: `linear-gradient(${color.join(', ')})`, backgroundClip: 'text', '-webkit-background-clip': 'text', color: 'transparent' }
    return <Furigana {...rest_props} ref={element} style={{ transform: `scaleX(${scale})`, ...name_style, ...style }}>{props.children}</Furigana>
}

function Types(props: {text: String, icon?: String, devolution?: boolean} & Config) {
    if (props.text == null || props.text === "") return null;
    const wrappers = BRACKET_TEXTS[props.lang]
    return <div class={`type type-${props.lang}`}>
        <div class="wrapper">{wrappers[0]}</div>
        <Furigana class="type-text" devolution={props.devolution}>{props.text}</Furigana>
        {props.icon == null ? null : <img class={`type-icon`} src={`${props.asset_prefix}/yugioh/image/icon-${props.icon}.png`} />}
        <div class="wrapper">{wrappers[1]}</div>
    </div>
}

function Levels(props: {card: DataCard} & Config) {
    const xyz = (props.card.type & Type.Xyz) > 0
    return <div class={`level ${xyz ? "level-xyz" : ''} level-${props.card.level}`}>
        {Array(props.card.level).fill(<img class="star" src={`${props.asset_prefix}/yugioh/image/${xyz ? 'rank.png' : 'level.png'}`} />)}
    </div>
}

function Attribute(props: {card: DataCard} & Config) {
    let lang = props.lang;
    let appendix = ""
    if (lang !== Language.ZH_CN && lang !== Language.ZH_TW)
        appendix = "-" + lang.toString()

    let attribute = decide_attribute(props.card.type, props.card.attribute)
    if (attribute == null) return null;
    return <img class="attribute" src={`${props.asset_prefix}/yugioh/image/attribute-${attribute}${appendix}.png`} />
}

function Number(props: {num: number, class?: string}) {
    let text = props.num.toString();
    if (props.num == -1) text = "∞"
    if (props.num == -2) text = "?"
    return <div class={`number ${props.class}`}>{text}</div> 
}

function LinkMarker(props: {linkmarker: number, pendulum?: boolean} & Config) {
    let basic_link_class = "linkmarker"
    if (props.pendulum) basic_link_class += " linkmarker-pendulum"
    return <>
        <img class={`${basic_link_class} linkmarker-up`}         src={`${props.asset_prefix}/yugioh/image/arrow-up-off.png`} />
        <img class={`${basic_link_class} linkmarker-right-up`}   src={`${props.asset_prefix}/yugioh/image/arrow-right-up-off.png`} />
        <img class={`${basic_link_class} linkmarker-right`}      src={`${props.asset_prefix}/yugioh/image/arrow-right-off.png`} />
        <img class={`${basic_link_class} linkmarker-right-down`} src={`${props.asset_prefix}/yugioh/image/arrow-right-down-off.png`} />
        <img class={`${basic_link_class} linkmarker-down`}       src={`${props.asset_prefix}/yugioh/image/arrow-down-off.png`} />
        <img class={`${basic_link_class} linkmarker-left-down`}  src={`${props.asset_prefix}/yugioh/image/arrow-left-down-off.png`} />
        <img class={`${basic_link_class} linkmarker-left`}       src={`${props.asset_prefix}/yugioh/image/arrow-left-off.png`} />
        <img class={`${basic_link_class} linkmarker-left-up`}   src={`${props.asset_prefix}/yugioh/image/arrow-left-up-off.png`} />
        {(props.linkmarker & Linkmarker.Top) > 0         && <img class={`${basic_link_class} linkmarker-up`}         src={`${props.asset_prefix}/yugioh/image/arrow-up-on.png`} /> }
        {(props.linkmarker & Linkmarker.TopRight) > 0    && <img class={`${basic_link_class} linkmarker-right-up`}   src={`${props.asset_prefix}/yugioh/image/arrow-right-up-on.png`} /> }
        {(props.linkmarker & Linkmarker.Right) > 0       && <img class={`${basic_link_class} linkmarker-right`}      src={`${props.asset_prefix}/yugioh/image/arrow-right-on.png`} /> }
        {(props.linkmarker & Linkmarker.BottomRight) > 0 && <img class={`${basic_link_class} linkmarker-right-down`} src={`${props.asset_prefix}/yugioh/image/arrow-right-down-on.png`} /> }
        {(props.linkmarker & Linkmarker.Bottom) > 0      && <img class={`${basic_link_class} linkmarker-down`}       src={`${props.asset_prefix}/yugioh/image/arrow-down-on.png`} /> }
        {(props.linkmarker & Linkmarker.BottomLeft) > 0  && <img class={`${basic_link_class} linkmarker-left-down`}  src={`${props.asset_prefix}/yugioh/image/arrow-left-down-on.png`} /> }
        {(props.linkmarker & Linkmarker.Left) > 0        && <img class={`${basic_link_class} linkmarker-left`}       src={`${props.asset_prefix}/yugioh/image/arrow-left-on.png`} /> }
        {(props.linkmarker & Linkmarker.TopLeft) > 0     && <img class={`${basic_link_class} linkmarker-left-up`}    src={`${props.asset_prefix}/yugioh/image/arrow-left-up-on.png`} /> }
    </>
}

function EffectDescription(props: { scale?: number, min_scale?: number, flag: any } & HTMLProps<HTMLDivElement>) {
    let { flag, scale: _scale, min_scale = 0.5, ...rest_props } = props 
    let [scale, setScale] = useState(_scale ?? 1);
    let element = useRef<HTMLDivElement>(null);
    if (_scale == null) {
        const shrink = () => {
            if (element.current == null) return
            if (element.current.offsetHeight < element.current.scrollHeight && scale > min_scale)
                setScale(Math.max(min_scale, scale - 0.05))
        }
        useEffect(shrink, [element.current, scale])
        useEffect(() => { setTimeout(shrink, 0) }, [])
        useEffect(() => { setScale(Math.min(1, scale + 0.05)); shrink() }, [props.children])
    }
    return <div {...rest_props} ref={element} style={{"--font-size-scale": scale}}>{props.children}</div>
}

export {
    Card
}

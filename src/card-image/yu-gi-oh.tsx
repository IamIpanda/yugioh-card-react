import { Language, Card as DataCard, decide_backend, Type, decide_attribute, decide_type_text, Linkmarker, is_white_name } from "./data"
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
} & Config & HTMLProps<HTMLDivElement>

function devolution(config: Config) {
    return !(config.furigana ?? config.lang == Language.JP);
}

function Card(props: CardProp) {
    const [scale, set_scale] = useState(0.1);
    const container_element = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (container_element.current == null) return;
        const resize_observer = new ResizeObserver(() => {
            if (container_element.current)
                set_scale(Math.min(1, container_element.current.offsetWidth / 1394, container_element.current.offsetHeight / 2031));
        })
        resize_observer.observe(container_element.current);
        return () => resize_observer.disconnect();
    }, [container_element.current])

    const { card, image, asset_prefix, lang, ...rest_props } = props;
    const background = `${asset_prefix}/yugioh/image/card-${decide_backend(card.type)}.png`
    const is_monster = (card.type & Type.Monster) > 0
    const is_pendlum = (card.type & Type.Pendulum) > 0
    const is_link = (card.type & Type.Link) > 0
    const pendulum_appendix = is_pendlum ? '-pendulum' : ''
    const card_image = image ?? card.image;
    

    return <div class="yugioh-container" {...rest_props} ref={container_element}>
        <div class="card" style={{ backgroundImage: `url(${background})`, transform: `scale(${scale}, ${scale}) translateX(-50%) translateY(-50%)` }} >
            <link rel="stylesheet" type="text/css" href={`${asset_prefix}/yugioh/font/ygo-font.css`} />
            <link rel="stylesheet" type="text/css" href={`${asset_prefix}/custom-font/custom-font.css`} />

            <Name class={`name name-${lang} ${is_white_name(card.type) ? 'name-white' : ''}`} 
                style={card.name_color ? { name: card.name_color } : undefined} devolution={devolution(props)}>{card.name}</Name>
            <Attribute {...props} />
            { is_link ? null : is_monster ? <Levels {...props} /> 
              : <Types lang={lang} asset_prefix={asset_prefix} {...decide_type_text(card.type, lang)} /> }
            { card_image == null ? null : <img class={`image${pendulum_appendix}`} src={card_image} /> }
            <img class={`mask${pendulum_appendix}`} src={`${asset_prefix}/yugioh/image/card-mask${pendulum_appendix}.png`} />
            { is_pendlum ? <>
                { card.lscale != null ? <div class="scale scale-left">{card.lscale}</div> : null }
                { card.rscale != null ? <div class="scale scale-right">{card.rscale}</div> : null }
                { card.pendulum_text != null ? <EffectDescription class={`description description-${lang} description-pendulum`} flag={card.pendulum_text}>
                    <Furigana devolution={devolution(props)}>{card.pendulum_text}</Furigana>
                </EffectDescription> : null }
            </> : null }
            { card.pack_info == null ? null : <div class={`pack-info ${is_pendlum ? 'pack-info-pendulum' : ''}`}>{card.pack_info}</div> }
            { is_link ? <LinkMarker linkmarker={card.defense ?? 0} {...props} /> : null}
            <EffectDescription class={`description description-${lang}`} flag={card.desc}>
                {card.subtype_text == null ? null : <div class="subtype"><div class="wrapper">【</div><Furigana devolution={devolution(props)}>{card.subtype_text}</Furigana><div class="wrapper">】</div></div> }
                <Furigana class="effect" devolution={devolution(props)}>{card.desc}</Furigana>
                { card.flavor_text == null ? null : <div class="flavor">{card.flavor_text}</div> }
            </EffectDescription>
            { is_monster ? <img class="number-background" src={`${asset_prefix}/yugioh/image/${(card.type & Type.Link) > 0 ? 'atk-link.svg' : 'atk-def.svg'}`} /> : null }
            { is_monster ? <Number class="atk" num={card.attack ?? 0} /> : null}
            { is_monster ? <Number class={`${is_link ? "link" : "def"}`} num={is_link ? card.level : card.defense ?? 0} /> : null}
            <div class="code">{card.code}</div>
        </div>
    </div>
}

function Name(props: HTMLProps<HTMLDivElement> & { devolution: boolean }) {
    let [scale, setScale] = useState(1);
    let element = useRef<HTMLDivElement>(null)
    const shrink = () => {
        if (element.current == null) return
        if (element.current.offsetWidth < element.current.scrollWidth)
            setScale(element.current.offsetWidth / element.current.scrollWidth)
    }
    useEffect(shrink, [element.current, scale])
    useEffect(() => { setScale(1); shrink() }, [props.children])
    return <Furigana {...props} ref={element} style={{ transform: `scaleX(${scale})` }}>{props.children}</Furigana>
}

function Types(props: {text: String, icon?: String} & Config) {
    if (props.text == null || props.text === "") return null;
    return <div class={`type type-${props.lang}`}>
        <div class="wrapper">【</div>
        <Furigana class="type-text">{props.text}</Furigana>
        {props.icon == null ? null : <img class={`type-icon`} src={`${props.asset_prefix}/yugioh/image/icon-${props.icon}.png`} />}
        <div class="wrapper">】</div>
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

function LinkMarker(props: {linkmarker: number} & Config) {
    return <>
        <img class="linkmarker linkmarker-up" src={`${props.asset_prefix}/yugioh/image/arrow-up-off.png`} />
        <img class="linkmarker linkmarker-right-up" src={`${props.asset_prefix}/yugioh/image/arrow-right-up-off.png`} />
        <img class="linkmarker linkmarker-right" src={`${props.asset_prefix}/yugioh/image/arrow-right-off.png`} />
        <img class="linkmarker linkmarker-right-down" src={`${props.asset_prefix}/yugioh/image/arrow-right-down-off.png`} />
        <img class="linkmarker linkmarker-down" src={`${props.asset_prefix}/yugioh/image/arrow-down-off.png`} />
        <img class="linkmarker linkmarker-left-down" src={`${props.asset_prefix}/yugioh/image/arrow-left-down-off.png`} />
        <img class="linkmarker linkmarker-left" src={`${props.asset_prefix}/yugioh/image/arrow-left-off.png`} />
        <img class="linkmarker linkmarker-left-up" src={`${props.asset_prefix}/yugioh/image/arrow-left-up-off.png`} />
        {(props.linkmarker & Linkmarker.Top) > 0         ? <img class="linkmarker linkmarker-up" src={`${props.asset_prefix}/yugioh/image/arrow-up-on.png`} /> : null }
        {(props.linkmarker & Linkmarker.TopRight) > 0    ? <img class="linkmarker linkmarker-right-up" src={`${props.asset_prefix}/yugioh/image/arrow-right-up-on.png`} /> : null }
        {(props.linkmarker & Linkmarker.Right) > 0       ? <img class="linkmarker linkmarker-right" src={`${props.asset_prefix}/yugioh/image/arrow-right-on.png`} /> : null }
        {(props.linkmarker & Linkmarker.BottomRight) > 0 ? <img class="linkmarker linkmarker-right-down" src={`${props.asset_prefix}/yugioh/image/arrow-right-down-on.png`} /> : null }
        {(props.linkmarker & Linkmarker.Bottom) > 0      ? <img class="linkmarker linkmarker-down" src={`${props.asset_prefix}/yugioh/image/arrow-down-on.png`} /> : null }
        {(props.linkmarker & Linkmarker.BottomLeft) > 0  ? <img class="linkmarker linkmarker-left-down" src={`${props.asset_prefix}/yugioh/image/arrow-left-down-on.png`} /> : null }
        {(props.linkmarker & Linkmarker.Left) > 0        ? <img class="linkmarker linkmarker-left" src={`${props.asset_prefix}/yugioh/image/arrow-left-on.png`} /> : null }
        {(props.linkmarker & Linkmarker.TopLeft) > 0     ? <img class="linkmarker linkmarker-left-up" src={`${props.asset_prefix}/yugioh/image/arrow-left-up-on.png`} /> : null }
    </>
}

function EffectDescription(props: {scale?: number, min_scale?: number, flag: any} & HTMLProps<HTMLDivElement>) {
    let [scale, setScale] = useState(1);
    let element = useRef<HTMLDivElement>(null);
    let min_scale = props.min_scale ?? 0.5;
    const shrink = () => {
        if (element.current == null) return
        if (element.current.offsetHeight < element.current.scrollHeight && scale > min_scale)
            setScale(Math.max(min_scale, scale - 0.05))
    }
    useEffect(shrink, [element.current, scale])
    useEffect(() => { setScale(1); shrink() }, [props.children])
    let {flag, ...rest_props} = props 
    return <div {...rest_props} ref={element} style={{"--font-size-scale": props.scale ?? scale}}>{props.children}</div>
}

export {
    Card
}

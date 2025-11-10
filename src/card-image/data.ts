enum Language {
    ZH_CN = "sc",
    ZH_TW = "tc",
    EN = "en",
    JP = "jp",
    KR = "kr",
    ASTRAL = "astral"
}


type Card = {
    code?: number,
    name: string,
    desc: string,
    type: number,
    attribute?: number,
    level?: number,

    subtype_text?: string
    attack?: number,
    defense?: number,

    pendulum_text?: string,
    lscale?: number,
    rscale?: number,

    pack_info?: string,
    name_color?: string | string[],
    flavor_text?: string,
    image?: string
 
    copyright?: 'auto' | 'sc' | 'jp' | 'en'
    laser?: 'laser1' | 'laser2' | 'laser3' | 'laser4'
    rare?: 'dt' | 'ur' | 'gr' | 'hr' | 'ser' | 'gser' | 'pser'
    twentieth? : boolean
}

enum Type {
    Monster = 1,
    Spell = 2,
    Trap = 4,
    Normal = 16,
    Effect = 32,
    Fusion = 64,
    Ritual = 128,
    Trapmonster = 256,
    Spirit = 512,
    Union = 1024,
    Dual = 2048,
    Tuner = 4096,
    Synchro = 8192,
    Token = 16384,
    Quickplay = 65536,
    Continuous = 131072,
    Equip = 262144,
    Field = 524288,
    Counter = 1048576,
    Flip = 2097152,
    Toon = 4194304,
    Xyz = 8388608,
    Pendulum = 16777216,
    Spsummon = 33554432,
    Link = 67108864,
}

enum Attribute {
    Earth = 1,
    Water = 2,
    Fire = 4,
    Wind = 8,
    Light = 16,
    Dark = 32,
    Divine = 64,
}

enum Linkmarker {
    BottomLeft = 1,
    Bottom = 2,
    BottomRight = 4,
    Left = 8,
    Right = 32,
    TopLeft = 64,
    Top = 128,
    TopRight = 256,
}

function decide_backend(type: Type): String {
    let pendulum = (type & Type.Pendulum)>0
    if ((type & Type.Spell) > 0)        return "spell"
    else if ((type & Type.Trap) > 0)    return "trap"
    else if ((type & Type.Synchro) > 0) return pendulum ? "synchro-pendulum" : "synchro"
    else if ((type & Type.Xyz) > 0)     return pendulum ? "xyz-pendulum" : "xyz"
    else if ((type & Type.Fusion) > 0)  return pendulum ? "fusion-pendulum" : "fusion"
    else if ((type & Type.Ritual) > 0)  return pendulum ? "ritual-pendulum" : "ritual"
    else if ((type & Type.Normal) > 0)  return pendulum ? "normal-pendulum" : "normal"
    else if ((type & Type.Token) > 0)   return "token"
    else if ((type & Type.Link) > 0)    return "link"
    else                                return pendulum ? "effect-pendulum" : "effect"
    
}

function decide_attribute(type: Type, attribute?: Attribute): String | null {
    if ((type & Type.Spell) > 0) return "spell"
    else if ((type & Type.Trap) > 0) return "trap"
    else if (attribute == null) return null
    else if ((attribute & Attribute.Earth) > 0)  return "earth"
    else if ((attribute & Attribute.Water) > 0)  return "water"
    else if ((attribute & Attribute.Fire) > 0)   return "fire"
    else if ((attribute & Attribute.Wind) > 0)   return "wind"
    else if ((attribute & Attribute.Light) > 0)  return "light"
    else if ((attribute & Attribute.Dark) > 0)   return "dark"
    else if ((attribute & Attribute.Divine) > 0) return "divine"
    else return null
}

function decide_type_text(type: Type, lang: Language): {text: string, icon?: string} {
    let text = ""
    if ((type & Type.Spell) > 0) text = TYPE_TEXTS[lang]?.[Type.Spell] ?? ""
    if ((type & Type.Trap) > 0) text = TYPE_TEXTS[lang]?.[Type.Trap] ?? ""
    if (text === "") return { text: "" }
    let icon = undefined
    if ((type & Type.Continuous) > 0) icon = "continuous"
    if ((type & Type.Counter) > 0) icon = "counter"
    if ((type & Type.Quickplay) > 0) icon = "quick-play"
    if ((type & Type.Equip) > 0) icon = "equip"
    if ((type & Type.Ritual) > 0) icon = "ritual"
    if ((type & Type.Field) > 0) icon = "field"
    return {text: text, icon: icon} 
}

function is_white_name(type: Type) {
    return (type & (Type.Spell | Type.Trap | Type.Xyz | Type.Link)) > 0
}

const TYPE_TEXTS: { [key in Language]?: {[key in Type]?: string}} = {
    [Language.ZH_CN]: {
        [Type.Spell]: "魔法卡",
        [Type.Trap]: "陷阱卡",
    },
    [Language.ZH_TW]: {
        [Type.Spell]: "魔法卡",
        [Type.Trap]: "陷阱卡",
    },
    [Language.JP]: {
        [Type.Spell]: "[魔(ま)][法(ほう)]カード",
        [Type.Trap]: "[罠(トラップ)]カード",
    },
    [Language.KR]: {
        [Type.Spell]: "마법 카드",
        [Type.Trap]: "함정 카드"
    },
    [Language.EN]: {
        [Type.Spell]: "Spell Card",
        [Type.Trap]: "Trap Card"
    }
}

const BRACKET_TEXTS: Record<Language, [String, String]> = {
    [Language.EN]: ['[', ']'],
    [Language.ZH_CN]: ['【', '】'],
    [Language.ZH_TW]: ['【', '】'],
    [Language.JP]: ['【', '】'],
    [Language.KR]: ['[', ']'],
    [Language.ASTRAL]: ['【', '】']
}

export {
    type Card,
    Language,
    Linkmarker,
    Type,
    Attribute,
    is_white_name,
    decide_backend,
    decide_type_text,
    decide_attribute,
    TYPE_TEXTS,
    BRACKET_TEXTS
}

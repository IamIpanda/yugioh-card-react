import { forwardRef, HTMLProps, Ref, useEffect, useState } from "preact/compat";

const FURIGANA_REGEXP = /(\[(.+?)\((.+?)\)\])|(.)/g
function replacer(_: string, p1: string, p2: string, p3: string, p4: string): string {
    if (p4 != null) return `<span>${p4}</span>` 
    return `<ruby><rb>${p2}</rb><rt>${p3}</rt></ruby>`
}
function Furigana(prop: HTMLProps<HTMLDivElement> & { devolution?: boolean }, ref?: Ref<HTMLDivElement>) {
    const [inner_html, set_inner_html] = useState("");
    useEffect(() => {
        if (prop.children == null) return;
        let origin_text = prop.children.toString() 
        let text = origin_text
            .replaceAll(FURIGANA_REGEXP, replacer)
            .replaceAll("\n", `<span class="newline"></span>`)
        set_inner_html(text)
    }, [prop.children])
    if (prop.devolution)
        return <div {...prop} ref={ref} />
    let _class = prop.class == null ? 'furigana' : prop.class + ' furigana'
    return <div {...prop} ref={ref} class={_class} dangerouslySetInnerHTML={{ __html: inner_html }} />
}

const WrappedFurigana = forwardRef(Furigana)
export {
    WrappedFurigana as Furigana
}

import { HTMLProps, useEffect, useState } from "preact/compat";

const FURIGANA_REGEXP = /\[(.+?)\((.+?)\)\]/g
function replacer(_: string, p1: string, p2: string): string {
    return `${p1}<rp>(</rp><rt>${p2}</rt><rp>)</rp>`
}
export function Furigana(prop: HTMLProps<HTMLElement>) {
    const [inner_html, set_inner_html] = useState("");
    useEffect(() => {
        if (prop.children == null) return;
        let origin_text = prop.children.toString();
        set_inner_html(origin_text.replaceAll(FURIGANA_REGEXP, replacer))
    }, [prop.children])
    return <ruby {...prop} dangerouslySetInnerHTML={{ __html: inner_html }}/>
}

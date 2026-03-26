import { Card } from "./card-image/yu-gi-oh"
import * as Data from "./card-image/data"

if (import.meta.env.DEV) {
    (async () => {
        const { createRoot } = await import("react-dom/client")
        const { App } = await import("./test")
        createRoot(document.getElementById("app")!).render(<App />)
    })()
}

export {
    Card,
    Data
}

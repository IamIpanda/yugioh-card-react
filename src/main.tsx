import { render } from 'preact'
import { Card } from "./card-image/yu-gi-oh"
import * as Data from "./card-image/data"

if (import.meta.env.DEV) {
    import("./test").then((test) => render(<test.App />, document.getElementById("app")! ))
}

export {
    Card,
    Data
}

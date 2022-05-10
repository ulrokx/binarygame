import { html, LitElement } from "lit";
import { customElement } from "lit/decorators";


@customElement("game-element")
export class GameElement extends LitElement {
    render() {
        return html`
        <div>game in progress</div>
        `
    }
}
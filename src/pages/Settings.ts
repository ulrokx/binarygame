import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";


@customElement("page-settings")
export class Settings extends LitElement {
  render() {
    return html` <h1>settings page</h1>`;
  }
}

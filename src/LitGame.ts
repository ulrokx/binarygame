import { LitElement, html, css, CSSResultGroup } from "lit";
import {
  customElement,
  property,
  query,
} from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";
import "./AppContainer";
import "./pages/Settings";
import "./pages/Game";

@customElement("lit-game")
export class LitGame extends LitElement {
  constructor() {
    super();
    window.addEventListener("popstate", (e) => {
      console.log("here");
      this.page = e.state ? e.state.route : "/";
    });
  }
  @property()
  page: string = "/";

  setPage(e: CustomEvent) {
    const route = e.detail;
    history.pushState({ route }, "", e.detail);
    this.page = route;
  }

  render() {
    return html` <app-container @route-change=${this.setPage}>
      ${choose(
        this.page,
        [
          ["/", () => html`<page-game></page-game>`],
          [
            "/settings",
            () => html`<page-settings></page-settings>`,
          ],
        ],
        () => html`<page-game></page-game>`
      )}
    </app-container>`;
  }
}

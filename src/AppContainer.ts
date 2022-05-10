import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-container")
export class AppContainer extends LitElement {
  static styles?: CSSResultGroup = css`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    ul,
    li {
      list-style: none;
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      height: 4rem;
      background-color: #020887;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    nav > a {
      color: #fff;
      font-size: 1.5rem;
      font-weight: 600;
      transition: all 0.2s;
    }

    nav > a:hover {
      transform: scale(1.1);
    }
  `;

  route(e: CustomEvent) {
    e.preventDefault();
    const target = e.target as HTMLAnchorElement;
    const path = target.getAttribute("href");
    this.dispatchEvent(
      new CustomEvent("route-change", {
        detail: path,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <main>
        <nav>
          <a href="/" @click=${this.route}>Play</a>
          <a href="/settings" @click=${this.route}>Settings</a>
        </nav>
        <slot></slot>
      </main>
    `;
  }
}

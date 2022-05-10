import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";
import { Timer } from "../Timer";

interface IGame {
  num: number;
  mode: "binary" | "decimal";
  input: string;
}

@customElement("page-game")
export class Game extends LitElement {
  static styles = css`
    #pregame-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    #game-container {
      height: 100vh;
      background: linear-gradient(
        150deg,
        #00d2ff 0%,
        #3a47d5 100%
      );
    }

    #number-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .top-padding {
      margin-top: 8rem;
    }

    .game-number {
      font-size: 5rem;
      font-weight: 600;
      color: #fff;
      font-family: "Roboto Mono", monospace;
      letter-spacing: 0.4rem;
    }

    .user-number {
      font-size: 2rem;
      font-weight: 600;
      color: #fff;
      font-family: "Roboto Mono", monospace;
      letter-spacing: 0.4rem;
    }
  `;

  constructor() {
    super();
    document.addEventListener(
      "keydown",
      this.handleKeyPress.bind(this)
    );
  }

  timer: Timer = new Timer(this.updateTimer);

  @state()
  ms: number = 0;

  updateTimer(ms?: number) {
    this.ms = ms || this.ms;
  }

  @state()
  gameStatus: "notStarted" | "inProgress" | "finished" =
    "notStarted";

  @state()
  game: IGame = {
    num: Math.floor(Math.random() * 255),
    mode: "decimal",
    input: "",
  };
  startGame() {
    this.gameStatus = "inProgress";
  }

  checkInput() {
    if (this.game.mode === "binary") {
      return this.game.input === this.game.num.toString(2);
    }
    return parseInt(this.game.input, 2) === this.game.num;
  }

  handleKeyPress(e: KeyboardEvent) {
    console.log(e.code);
    if (
      (this.game.mode === "decimal" &&
        ["Digit0", "Digit1"].includes(e.code)) ||
      this.game.mode === "binary"
    ) {
      this.gameStatus = "inProgress";
      this.timer.start();
      this.game = {
        ...this.game,
        input: this.game.input + e.key,
      };
      console.log(this.game);
    } else if (e.key === "Backspace") {
      this.game = {
        ...this.game,
        input: this.game.input.slice(0, -1),
      };
    } else if (e.key === "Enter") {
      if (this.checkInput()) {
        this.gameStatus = "finished";
        this.timer.stop();
      }
    }
    return;
  }

  render() {
    const numberDisplay = html`
      <div id="number-container" class="top-padding">
        <p class="game-number">
          ${this.game.mode === "binary"
            ? this.game.num.toString(2).padStart(8, "0")
            : this.game.num}
        </p>
        <p class="user-number">${this.game.input}</p>
      </div>
    `;
    return html` <div id="game-container">
      <h1>Binary Game</h1>
      ${choose(this.gameStatus, [
        [
          "notStarted",
          () => html`<div id="pregame-container">
              <p>
                A number will show up on the screen, and it is
                your job to type the binary equivalent of the
                number. As soon as you start typing the timer
                will start.
              </p>
            </div>
            ${numberDisplay}`,
        ],
        ["inProgress", () => numberDisplay],
        ["finished", () => html`<p>finished</p>`],
      ])}
    </div>`;
  }
}

import { ApplicationRef, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ThemingService {
  themes = ["light-theme", "dark-theme"];
  theme = new BehaviorSubject("light-theme");

  constructor(private ref: ApplicationRef) {
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;

    if (darkModeOn) {
      this.theme.next("dark-theme");
    }

    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => {
      const turnOn = e.matches;
      this.theme.next(turnOn ? "dark-theme" : "light-theme");

      this.ref.tick();
    });
  }
}

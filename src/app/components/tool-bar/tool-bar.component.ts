import { Component, OnInit } from "@angular/core";
import {ThemingService} from "../../services/theming.service";

@Component({
  selector: "app-tool-bar",
  templateUrl: "./tool-bar.component.html",
  styleUrls: ["./tool-bar.component.scss"]
})
export class ToolBarComponent implements OnInit {

  themes: string[];

  constructor(
    private theming: ThemingService
  ) { }

  ngOnInit() {
    this.themes = this.theming.themes;
  }

  changeTheme(theme: string) {
    this.theming.theme.next(theme);
  }

}

import {Component, HostBinding, OnDestroy, OnInit} from "@angular/core";
import {ThemingService} from "./services/theming.service";
import {OverlayContainer} from "@angular/cdk/overlay";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "Projet-Web-M1-MIAGE";

  themingSubscription: Subscription;

  @HostBinding("class") public cssClass: string;

  constructor(
    private themingService: ThemingService,
    private overlayContainer: OverlayContainer,
  ) { }


  ngOnInit() {
    this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      this.cssClass = theme;
      this.applyThemeOnOverlays();
    });
  }

  private applyThemeOnOverlays() {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.cssClass);
  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }
}

import { test, expect } from "@playwright/experimental-ct-react";
import TemperatureTileComponent from "./TemperatureTile";

test("TemperatureTile", async ({ mount }) => {
  let clicked = false;

  // Mount a component. Returns locator pointing to the component.
  const component = await mount(
    <TemperatureTileComponent
      temperature={0}
      location={"Magdeburg"}
    ></TemperatureTileComponent>
  );

  // As with any Playwright test, assert locator text.
  await expect(component).toContainText("Magdeburg");
});

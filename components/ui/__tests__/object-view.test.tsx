import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataProvider } from "@json-render/react";
import type { UIElement } from "@json-render/core";

import { ObjectView } from "../object-view";
import { INITIAL_DATA } from "@/components/page/initial-data";

const renderObjectView = (objectType: string, objectId: string) => {
  const element: UIElement<string, { objectType: string; objectId: string }> = {
    key: "object-view",
    type: "ObjectView",
    props: { objectType, objectId },
  };

  return render(
    <DataProvider initialData={INITIAL_DATA}>
      <ObjectView element={element} />
    </DataProvider>,
  );
};

describe("ObjectView", () => {
  it("renders linked single values", () => {
    renderObjectView("accounts", "northloop-metals");

    const facilityLink = screen.getByRole("link", { name: "FAC-CHI-01" });

    expect(facilityLink).toHaveAttribute(
      "href",
      "/objects/facilities/FAC-CHI-01",
    );
  });

  it("renders linked arrays as multiple links", () => {
    renderObjectView("accounts", "northloop-metals");

    const materialLink = screen.getByRole("link", { name: "MAT-AL-5083" });
    const secondaryMaterialLink = screen.getByRole("link", {
      name: "MAT-STEEL-CR",
    });

    expect(materialLink).toHaveAttribute(
      "href",
      "/objects/materials/MAT-AL-5083",
    );
    expect(secondaryMaterialLink).toHaveAttribute(
      "href",
      "/objects/materials/MAT-STEEL-CR",
    );
  });
});

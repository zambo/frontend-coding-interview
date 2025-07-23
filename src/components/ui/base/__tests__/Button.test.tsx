import { render } from "@testing-library/react";
import { Button } from "@/components/ui/base/button";

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button>Test Button</Button>);
  });
});

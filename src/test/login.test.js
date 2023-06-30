import React from "react";
import * as renderer from "react-test-renderer";
import Login from "../components/login/login";
import { waitFor } from "@testing-library/react";

it("Component is rendering without crashing", async () => {
  let tree;
  renderer.act(() => {
    tree = renderer.create(
      <Login
        handleLogin={jest.fn()}
        onChange={jest.fn()}
        successGoogleLogin={jest.fn()}
        failureGoogleLogin={jest.fn()}
      />
    );
  });
  await waitFor(() => {
    expect(tree).toMatchSnapshot();
  });
});

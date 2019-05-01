import React from "react";
import { shallow } from "enzyme";
import Intro from "../components/Intro";

describe("Intro Component", () => {
  let component;
  beforeEach(() => {
    component = shallow(<Intro />);
  });

  it("Should render Intro Component without errors", () => {
    const wrapper = component.find("h2");
    expect(wrapper.text()).toBe("Posts Search Application");
  });

  it("Should render a dark background", () => {
    const wrapper = component.find(".bg-dark");
    expect(wrapper.length).toBe(1);
  });
});

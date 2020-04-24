import React from 'react';
import { shallow } from 'enzyme';
import InstancePage from './InstancePage';

describe('<Footer />', () => {
  it('renders a footer', () => {
    const editor = shallow(<Footer />);
    expect(editor.find('Header.title').length).toBeGreaterThan(0);
  });

  it('renders the container for the footer (at right size)', () => {
    const editor = shallow(<Footer />);
    expect(editor.find('Footer.maxWidth').length).toEqual("lg");
  });
});
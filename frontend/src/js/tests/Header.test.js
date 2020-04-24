import React from 'react';
import { shallow } from 'enzyme';
import InstancePage from './InstancePage';

describe('<Header />', () => {
  it('renders a header', () => {
    const editor = shallow(<Header />);
    expect(editor.find('Header.title').length).toBeGreaterThan(0);
  });

  it('renders the header\'s container', () => {
    const editor = shallow(<Header />);
    expect(editor.find('class.toolbarTitle').length).toBeGreaterThan(0);
  });
});
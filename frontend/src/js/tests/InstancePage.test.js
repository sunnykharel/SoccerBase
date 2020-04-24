import React from 'react';
import { shallow } from 'enzyme';
import InstancePage from './InstancePage';

describe('<InstancePage />', () => {
  it('renders a header', () => {
    const editor = shallow(<InstancePage />);
    expect(editor.find('Header.title').length).toBeGreaterThan(0);
  });

  it('renders the main featured post', () => {
    const editor = shallow(<InstancePage />);
    expect(editor.find('MainFeaturedPost.div.className').length).toBeGreaterThan(0);
  });
});
import React from 'react';
import { shallow } from 'enzyme';
import InstancePage from './InstancePage';

describe('<MainFeaturedPost />', () => {
  it('renders the picture', () => {
    const editor = shallow(<MainFeaturedPost />);
    expect(editor.find('img.alt').length).toBeGreaterThan(0);
  });

  it('renders the title of the article', () => {
    const editor = shallow(<MainFeaturedPost />);
    expect(editor.find('props.title').length).toBeGreaterThan(0);
  });
});
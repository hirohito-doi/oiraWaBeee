import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import ButtonThisMonth from '.';

describe('ButtonThisMonth', () => {
  it('render correctory', () => {
    const tree = renderer
      .create(<ButtonThisMonth changeMonth={jest.fn()} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('check click event', () => {
    const onClick = jest.fn();
    const tree = mount(<ButtonThisMonth changeMonth={onClick} />)
    
    // クリックテスト
    tree.find('button').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
})
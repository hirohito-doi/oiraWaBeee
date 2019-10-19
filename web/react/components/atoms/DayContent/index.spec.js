import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import moment from 'moment';

import DayContent from '.';

describe('DayContent', () => {
  it('render correctory', () => {
    const tree = renderer
      .create(<DayContent
        year={2999}
        month={10}
        day={10}
        dateSelects={[]}
        toggleDateSelect ={jest.fn()}
        index={0}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  })

  it('check selected', () => {
    const onClick = jest.fn();
    const m = moment();

    const tree = mount(<DayContent
      year={m.year()}
      month={m.month()}
      day={m.date()}
      dateSelects={[m.format("YYYY-MM-DD")]}
      toggleDateSelect ={onClick}
      index={m.day()}
    />)

    // チェック済テスト
    expect(tree.find('.MuiAvatar-img').length).toBe(1);
    expect(tree.text()).toMatch('まかせろぁ！');

    // クリックテスト
    tree.find('button').simulate('click');
    expect(onClick).toHaveBeenCalled();
  })
})
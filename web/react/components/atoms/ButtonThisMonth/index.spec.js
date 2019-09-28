import React from 'react';
import { mount } from 'enzyme';
import ButtonThisMonth from '.';

describe('ButtonThisMonth', () => {
  it('render test', () => {
    const changeMonthSpy = jest.fn();
    const buttonThisMonth = mount(<ButtonThisMonth changeMonth={changeMonthSpy} />)
    
    // レンダリングテスト
    expect(buttonThisMonth).not.toBeNull();
    
    // クリックテスト
    buttonThisMonth.find('button').simulate('click');
    expect(changeMonthSpy).toHaveBeenCalled();
  })
})
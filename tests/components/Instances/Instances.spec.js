import React from 'react';
import { Instances } from 'components/Instances/Instances';
import { shallow } from 'enzyme';

describe('(Component) Instances', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<Instances />)
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

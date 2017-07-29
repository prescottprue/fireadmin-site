import React from 'react';
import { Routes/Projects/routes/Project } from 'components/Routes/Projects/routes/Project/Routes/Projects/routes/Project';
import { shallow } from 'enzyme';

describe('(Component) Routes/Projects/routes/Project', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<Routes/Projects/routes/Project />)
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

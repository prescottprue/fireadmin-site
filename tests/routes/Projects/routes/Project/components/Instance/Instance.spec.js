import React from 'react'
import Instance from 'routes/Projects/routes/Project/components/Instance'
import { shallow } from 'enzyme'

describe('(Component) Instance', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<Instance />)
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

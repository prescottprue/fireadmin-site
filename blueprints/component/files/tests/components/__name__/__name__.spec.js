import React from 'react'
import { <%= pascalEntityName %> } from 'components/<%= pascalEntityName %>/<%= pascalEntityName %>'
import { shallow } from 'enzyme'

describe('(Component) <%= pascalEntityName %>', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<<%= pascalEntityName %> />)
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

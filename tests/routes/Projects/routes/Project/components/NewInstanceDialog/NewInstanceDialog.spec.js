import React from 'react'
import { NewInstanceDialog } from 'components/NewInstanceDialog/NewInstanceDialog'
import { shallow } from 'enzyme'

describe('(Component) NewInstanceDialog', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<NewInstanceDialog />)
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

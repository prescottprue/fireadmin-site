import React from 'react'
import { ActionsPicker } from 'routes/Migration/components/ActionsPicker/ActionsPicker'
import { shallow } from 'enzyme'

describe('(Component) ActionsPicker', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<ActionsPicker />)
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

import React from 'react'
import { ActionsBoard } from 'routes/Migration/components/ActionsBoard/ActionsBoard'
import { shallow } from 'enzyme'

// missing Component.contextTypes
describe.skip('(Route: Migration Component) ActionsBoard', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<ActionsBoard />)
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

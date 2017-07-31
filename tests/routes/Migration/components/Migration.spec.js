import React from 'react'
import { Migration } from 'routes/Migration/components/Migration/Migration'
import { shallow } from 'enzyme'

describe('(Migration Component) AccountForm', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<Migration />)
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

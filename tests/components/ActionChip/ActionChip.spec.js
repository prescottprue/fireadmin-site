import React from 'react'
import ActionChip from 'components/ActionChip'
import { shallow } from 'enzyme'

describe('(Component) ActionChip', () => {
  let _component

  beforeEach(() => {
    _component = shallow(
      <ActionChip
        actionChip={{}}
      />
    )
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

import React from 'react'
import { ActionCard } from 'routes/Migration/components/ActionCard/ActionCard'
import { shallow } from 'enzyme'

describe('(Route: Migration Component) ActionCard', () => {
  let _component

  beforeEach(() => {
    _component = shallow(
      <ActionCard
        connectDragSource={(inp) => inp}
      />
    )
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

import React from 'react'
import Instances from 'routes/Projects/routes/Project/components/Instances'
import { shallow } from 'enzyme'

describe('(Component) Instances', () => {
  let _component

  beforeEach(() => {
    _component = shallow(
      <Instances
        instances={{
          some: 'stuff'
        }}
      />
    )
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

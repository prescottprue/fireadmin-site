import React from 'react'
import ServiceAccounts from 'routes/Projects/routes/Project/components/ServiceAccounts'
import { shallow } from 'enzyme'

describe('(Component) ServiceAccounts', () => {
  let _component

  beforeEach(() => {
    _component = shallow(
      <ServiceAccounts
        serviceAccounts={{}}
      />
    )
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

import React from 'react'
import Instance from 'routes/Projects/routes/Project/components/Instance'
import { shallow } from 'enzyme'

describe('(Routes: Projects Routes: Project Component) Instance', () => {
  let _component

  beforeEach(() => {
    _component = shallow(
      <Instance
        instance={{ name: 'testing' }}
      />
    )
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

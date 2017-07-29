import React from 'react'
import NewInstanceDialog from 'routes/Projects/routes/Project/components/NewInstanceDialog'
import { shallow } from 'enzyme'

describe('(Component) NewInstanceDialog', () => {
  let _component

  beforeEach(() => {
    _component = shallow(
      <NewInstanceDialog
        open
        onRequestClose={() => console.log('request close')} // eslint-disable-line no-console
      />
    )
  })

  it('Renders div', () => {
    const firstDiv = _component.find('div')
    expect(firstDiv).to.exist
  })

})

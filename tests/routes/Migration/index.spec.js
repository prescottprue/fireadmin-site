import Migration from 'routes/Migration'

describe('(Route) Migration', () => {
  let _route
  let _component
  let _childRoutes

  beforeEach(() => {
    _route = Migration()
  })

  it('Should return a route configuration object', () => {
    expect(Migration).to.be.a.function
  })

  it('Sets Path to :Migration', () => {
    expect(_route.path).to.equal('Migration'.toLowerCase())
  })
  it('Defines a getComponent function', () => {
    expect(_route.getComponent).to.be.a.function
  })
  it('Defines a getChildRoutes function', () => {
    expect(_route.getChildRoutes).to.be.a.function
  })

})

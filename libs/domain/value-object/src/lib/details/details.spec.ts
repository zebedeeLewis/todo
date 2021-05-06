import * as Details from './details'

describe('Details Value-Object', () => {
  describe('Model Creation', () => {
    it('uses the given value if provided by the caller.', () => {
      // Arrange
      const details = 'random details'
      const expected = { value: details }

      // Act
      const recieved = Details.create(details)

      // Assert
      expect(recieved).toEqual(expected)
    })

    it('uses the default value if none provided by the caller.', () => {
      // Arrange
      const expected = { value: Details.DEFAULT }

      // Act
      const recieved = Details.create()

      // Assert
      expect(recieved).toEqual(expected)
    })
  })
})

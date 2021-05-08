import * as DateTime from './date-time'

describe('Date-Time Value-Object', () => {
  describe('Model Creation', () => {
    it('uses the given date and time if provided by the caller.', () => {
      // Arrange
      const expected = '2021-05-07T06:00:00.000Z'

      // Act
      const dateTime = DateTime.create(expected)
      const recieved = dateTime.value.toISOString()

      // Assert
      expect(recieved).toEqual(expected)
    })

    it('uses the current date and time if not provided by the caller.', () => {
      // Arrange
      const expected = '2021-05-07T06:00:00.000Z'

      Date.now = jest.fn().mockReturnValue(expected)

      // Act
      const dateTime = DateTime.create()
      const recieved = dateTime.value.toISOString()

      // Assert
      expect(recieved).toEqual(expected)
    })
  })

  describe('Model to DTO conversion', () => {
    it('produces the DTO that corresponds to the given model.', () => {
      // Arrange
      const expected = '2021-05-07T06:00:00.000Z'
      const dateTime = DateTime.create(expected)

      // Act
      const recieved = DateTime.to_dto(dateTime)

      // Assert
      expect(recieved).toBe(expected)
    })
  })
})

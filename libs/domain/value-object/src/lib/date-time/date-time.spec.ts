import * as DateTime from './date-time'

describe('Date-Time Value-Object', () => {
  describe('Model Creation', () => {
    it('uses the given date and time if provided by the caller.', () => {
      // Arrange
      const expected = Date.UTC(90, 8, 14) // Sept 14, 1990

      // Act
      const dateTime = DateTime.create(expected)
      const recieved = dateTime.value.valueOf()

      // Assert
      expect(recieved).toEqual(expected)
    })

    it('uses the current date and time if not provided by the caller.', () => {
      // Arrange
      const expected = Date.UTC(90, 8, 14) // Sept 14, 1990
      Date.now = jest.fn().mockReturnValue(expected)

      // Act
      const dateTime = DateTime.create()
      const recieved = dateTime.value.valueOf()

      // Assert
      expect(recieved).toEqual(expected)
    })
  })

  describe('Model to DTO conversion', () => {
    it('produces the DTO that corresponds to the given model.', () => {
      // Arrange
      const expected = Date.UTC(2021, 4, 7) // May 7, 2021
      const dateTime = DateTime.create(expected)

      // Act
      const recieved = DateTime.to_dto(dateTime)

      // Assert
      expect(recieved).toBe(expected)
    })
  })
})

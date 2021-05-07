import * as Title from './title'

describe('Title Value-Object', () => {
  describe('Model Creation', () => {
    it(
      'produces a title with the given value if one is provided ' +
        'by the caller.',
      () => {
        // Arrange
        const title = 'random title'
        const expected = { value: title }

        // Act
        const recieved = Title.create(title)

        // Assert
        expect(recieved).toMatchObject(expected)
      }
    )

    it(
      `produces a title with the default value "${Title.DEFAULT}" ` +
        'if none is provided by the caller.',
      () => {
        // Arrange
        const expected = { value: Title.DEFAULT }

        // Act
        const recieved = Title.create()

        // Assert
        expect(recieved).toMatchObject(expected)
      }
    )
  })

  describe('Model to DTO conversion', () => {
    it('produces the DTO that corresponds to the given model.', () => {
      // Arrange
      const expected = 'random title'
      const title = Title.create(expected)

      // Act
      const recieved = Title.to_dto(title)

      // Assert
      expect(recieved).toBe(expected)
    })
  })
})

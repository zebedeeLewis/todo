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
})

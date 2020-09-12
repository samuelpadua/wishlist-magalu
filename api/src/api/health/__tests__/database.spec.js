describe('health', () => {
  describe('GET /health/database', () => {
    it('should return status code 200', async () => {
      const { payload } = await server.inject({
        method: 'GET',
        url: '/api/health/database'
      })

      const body = JSON.parse(payload)

      expect(body).toEqual({
        message: 'Connection has been established successfully.'
      })
    })
  })
})

describe('health', () => {
  describe('GET /health/check', () => {
    it('should return status code 200', async () => {
      const { payload } = await server.inject({
        method: 'GET',
        url: '/api/health/check'
      })

      const body = JSON.parse(payload)

      expect(body).toEqual({ message: 'app is running' })
    })
  })
})

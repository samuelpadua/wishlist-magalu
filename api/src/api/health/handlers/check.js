import HTTPStatus from 'http-status'

export default function (request, h) {
  return h.response({
    message: 'app is running'
  }).code(HTTPStatus.OK)
}

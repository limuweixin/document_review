import interceptors from './interceptors'

export function login(data) {
  return interceptors({
    url: "/login",
    method: 'post',
    data:JSON.stringify(data)
  })
}


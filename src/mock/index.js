import Mock from 'mockjs'
const BASE_URL = 'http://localhost:8080'

export default {
    mockData () {
        Mock.mock(BASE_URL + '/api/user/login', {
            'code': 1,
            'result': {
                'id': '100001',
                'name': '林锦泽',
                'roles': ['admin']
            }
        })
    }
}

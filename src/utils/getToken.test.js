import { BURGER_API_URL } from './constants'
import {getToken} from './getToken'

describe('GetToken fetch request', () => {
    const response = { result: 'ok', success: true, refreshToken: '123', accessToken: '321' }
    
    beforeEach(() => {
        const res = new Response();
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ...res,
            json: jest.fn().mockResolvedValue(response),
            ok: true
        })
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('fetch should be called once and pass token in body', async () => {

        await getToken('userToken')

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`${BURGER_API_URL}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                'token': 'userToken'
            })
        })
        
    })

    it('fetch should call localStorage twice and pass tokens', async () => {
        jest.spyOn(Storage.prototype, 'setItem')

        await getToken('userToken')
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', response.accessToken.split('Bearer ')[1]);
        expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', response.refreshToken);
    })

    it('fetch resolves with correct response', async () => {

        await expect(getToken('userToken')).resolves.toEqual(response)
    })

    it('should return Promise rejected with err', async() => {
        //@ts-ignore
        fetch.mockImplementationOnce(() => 
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ result: 'ok', success: false }),
            })
        )
        
        await expect(getToken('userToken')).rejects.toEqual({ result: 'ok', success: false })
    })

})
    




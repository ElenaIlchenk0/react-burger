import { request } from './fetchCheckResponse';

describe('Function request', () => {
    
    it('should return result ok', async() => { 
        const res = new Response();
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ...res,
            json: jest.fn().mockResolvedValue({result: 'ok'}),
            ok: true
        })

        const result = await request('url')

        expect(result).toEqual({result: 'ok'})
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('should return rejected promise with response', async () => {
        const res = new Response();
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ...res,
            json: jest.fn().mockResolvedValue({message: "error"}),
            ok: false
        })

        await expect(request('url')).rejects.toEqual({ message: "error"})
        expect(fetch).toHaveBeenCalledTimes(1)
    })
})

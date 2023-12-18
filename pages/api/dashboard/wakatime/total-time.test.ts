import { NextApiRequest, NextApiResponse } from 'next';
import { mocked } from 'ts-jest/utils';
import handler from './total-time';

jest.mock('node-fetch');

const { Response } = jest.requireActual('node-fetch');

describe('total-time handler', () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer token',
      },
      query: {},
    } as any;

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;
  });

  it('should return 401 if authorization header is missing', async () => {
    delete req.headers.authorization;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(undefined);
  });

  it('should return total time for successful API call', async () => {
    const mockData = [
      { duration: 120 },
      { duration: 180 },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ data: mockData }))
    );

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ total: 300 });
  });

  it('should handle API call failure', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ error: 'API Error' });
  });
});

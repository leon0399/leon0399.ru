import { NextApiRequest, NextApiResponse } from 'next';
import handler from './total-time';
import fetch from 'node-fetch';

jest.mock('node-fetch');

describe('handler', () => {
  let req: NextApiRequest;
  let res: NextApiResponse;
  let mockFetch: jest.Mock;

  beforeEach(() => {
    req = {} as NextApiRequest;
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as NextApiResponse;
    mockFetch = fetch as unknown as jest.Mock;
  });

  it('returns 401 when authorization header is not present', async () => {
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('fetches data from Wakatime API and calculates total time', async () => {
    req.headers = { authorization: 'Bearer token' };
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        data: [
          { duration: 1 },
          { duration: 2 },
          { duration: 3 },
        ],
      }),
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ total: 6 });
  });
});

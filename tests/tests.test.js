const request = require('supertest');
const app = require('./app');

describe('POST /chat-completions', () => {
  it('should return 200 OK with valid request body', async () => {
    const res = await request(app)
      .post('/chat-completions')
      .send({ text: 'Hello', userId: '123' });
    expect(res.statusCode).toEqual(200);
  });

  it('should return 500 Internal Server Error with invalid request body', async () => {
    const res = await request(app)
      .post('/chat-completions')
      .send({ invalidField: 'Hello', userId: '123' });
    expect(res.statusCode).toEqual(500);
  });

  it('should call setTokensForUser with correct userId', async () => {
    const mockSetTokensForUser = jest.fn();
    jest.mock('./utils', () => ({ setTokensForUser: mockSetTokensForUser }));

    await request(app)
      .post('/chat-completions')
      .send({ text: 'Hello', userId: '123' });

    expect(mockSetTokensForUser).toHaveBeenCalledWith('123');
  });

  it('should call OpenAI constructor with correct API key', async () => {
    const mockOpenAI = jest.fn();
    jest.mock('openai', () => ({ OpenAI: mockOpenAI }));

    await request(app)
      .post('/chat-completions')
      .send({ text: 'Hello', userId: '123' });

    expect(mockOpenAI).toHaveBeenCalledWith({ modelName: 'gpt-4', apiKey: process.env.OPENAI_API_KEY });
  });

  it('should call APIChain.fromLLMAndAPIDocs with correct arguments', async () => {
    const mockFromLLMAndAPIDocs = jest.fn();
    jest.mock('./apiChain', () => ({ APIChain: { fromLLMAndAPIDocs: mockFromLLMAndAPIDocs } }));

    await request(app)
      .post('/chat-completions')
      .send({ text: 'Hello', userId: '123' });

    expect(mockFromLLMAndAPIDocs).toHaveBeenCalledWith(mockOpenAI, WIX_API_DOCS);
  });

  it('should call APIChain.call with correct argument', async () => {
    const mockCall = jest.fn();
    jest.mock('./apiChain', () => ({ APIChain: { fromLLMAndAPIDocs: () => ({ call: mockCall }) } }));

    await request(app)
      .post('/chat-completions')
      .send({ text: 'Hello', userId: '123' });

    expect(mockCall).toHaveBeenCalledWith({ question: 'Hello' });
  });

  it('should return result from APIChain.call', async () => {
    const mockCall = jest.fn().mockResolvedValue({ data: 'Hello, world!' });
    jest.mock('./apiChain', () => ({ APIChain: { fromLLMAndAPIDocs: () => ({ call: mockCall }) } }));

    const res = await request(app)
      .post('/chat-completions')
      .send({ text: 'Hello', userId: '123' });

    expect(res.text).toEqual('Hello, world!');
  });
});
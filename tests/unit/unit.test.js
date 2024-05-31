const mockDB = require('../../mockdatabase'); // Adjust the path to your mock database module

describe('mockdatabase', () => {
  let mockConnection;

  beforeEach(() => {
    mockConnection = {
      query: jest.fn(),
      release: jest.fn(),
    };
    mockDB.connectDB.mockResolvedValue(mockConnection);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('connectDB should be a function', () => {
    expect(typeof mockDB.connectDB).toBe('function');
  });

  test('connectDB should resolve with a connection object', async () => {
    const connection = await mockDB.connectDB();
    expect(connection).toHaveProperty('query');
    expect(connection).toHaveProperty('release');
    expect(typeof connection.query).toBe('function');
    expect(typeof connection.release).toBe('function');
  });

  test('query method should be called with correct parameters', async () => {
    const connection = await mockDB.connectDB();
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    const params = [1];
    await connection.query(sql, params);
    expect(connection.query).toHaveBeenCalledWith(sql, params);
  });

  test('release method should be called after query', async () => {
    const connection = await mockDB.connectDB();
    await connection.query('SELECT 1');
    connection.release();
    expect(connection.release).toHaveBeenCalled();
  });

  test('connectDB should handle multiple connections', async () => {
    const connection1 = await mockDB.connectDB();
    const connection2 = await mockDB.connectDB();
    expect(connection1).toHaveProperty('query');
    expect(connection2).toHaveProperty('query');
    expect(connection1.query).not.toBe(connection2.query); // Ensure separate instances
  });
});

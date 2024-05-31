const mockDB = {
    // Mocked method to simulate connecting to the database
    connectDB: jest.fn().mockResolvedValue({
      query: jest.fn(),
      release: jest.fn(),
    }),
  
    // Additional methods or properties can be added here if needed
  };
  
  module.exports = mockDB;
  
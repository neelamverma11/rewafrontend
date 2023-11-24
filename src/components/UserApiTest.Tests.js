import userApi from './userApi';
import axios from 'axios';

jest.mock('axios');

describe('userApi', () => {
    it('should get user by ID', async () => {
        const mockUserId = '123';
        const mockUserData = { id: mockUserId, firstName: 'John', lastName: 'Doe' };
        const expectedData = mockUserData;

        axios.get.mockResolvedValueOnce({ data: mockUserData });

        const response = await userApi.getUserById(mockUserId);
        expect(response).toEqual(expectedData);
    });

    it('should update user profile', async () => {
        const mockUserId = '123';
        const mockUserDataToUpdate = { firstName: 'Jane', lastName: 'Doe' };
        const mockUpdatedUserData = { id: mockUserId, ...mockUserDataToUpdate };
        const expectedData = mockUpdatedUserData;

        axios.put.mockResolvedValueOnce({ data: mockUpdatedUserData });

        const response = await userApi.updateUserProfile(mockUserId, mockUserDataToUpdate);
        expect(response).toEqual(expectedData);
    });

    // Add more tests for other endpoints if needed...
});

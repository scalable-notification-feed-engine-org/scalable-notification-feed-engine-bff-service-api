import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { User } from '../types/user.model';
import { AxiosResponse } from 'axios';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async getUserById(token:string): Promise<AxiosResponse<User>> {
    try {
      console.log("Token for user service " , token);
      const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      const response = await firstValueFrom(
        this.httpService.get(`http://localhost:8081/user-service/api/v1/users/get-user-details`,{
          headers: {
            'Authorization': authHeader,
          },
        }),
      );

      console.log("User service response", response.data.data);
      return response.data.data as AxiosResponse<User>;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred while fetching feeds');
    }
  }
}

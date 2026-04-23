import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class FeedService {
  constructor(private readonly httpService: HttpService) {}

  async getAllFeeds(token: string, userId:string): Promise<any[]> {
    const url = `http://localhost:3003/api/v1/feed/${userId}`;
    try {

      const response = await firstValueFrom(

        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );

      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred while fetching feeds');
    }
  }
}

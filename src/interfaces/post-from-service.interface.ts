export interface PostFromService {
  id: string;
  content: string;
  userId: string;
  mediaUrls: string[];
  likeCount: number;
  commentCount: number;
  createAt: string;
}

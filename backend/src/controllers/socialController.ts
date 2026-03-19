import { Request, Response } from 'express';
import { socialService } from '../services/socialService.js';
import { ok } from '../utils/apiResponse.js';

export const socialController = {
  async createPost(req: Request, res: Response) {
    return ok(res, await socialService.createPost(req.auth!.userId, req.body), 'post_created', 201);
  },
  async feed(req: Request, res: Response) {
    return ok(res, await socialService.getFeed(Number(req.query.limit ?? 30)));
  },
  async onePost(req: Request, res: Response) {
    return ok(res, await socialService.getPost(req.params.postId));
  },
  async editPost(req: Request, res: Response) {
    return ok(res, await socialService.editPost(req.params.postId, req.auth!.userId, req.body), 'post_updated');
  },
  async deletePost(req: Request, res: Response) {
    return ok(res, await socialService.removePost(req.params.postId, req.auth!.userId), 'post_deleted');
  },
  async like(req: Request, res: Response) {
    return ok(res, await socialService.toggleLike(req.auth!.userId, req.params.postId), 'like_toggled');
  },
  async comment(req: Request, res: Response) {
    return ok(res, await socialService.addComment(req.auth!.userId, req.params.postId, req.body.content), 'comment_created', 201);
  },
  async deleteComment(req: Request, res: Response) {
    return ok(res, await socialService.deleteComment(req.params.commentId, req.auth!.userId), 'comment_deleted');
  },
  async follow(req: Request, res: Response) {
    return ok(res, await socialService.toggleFollow(req.auth!.userId, req.params.userId), 'follow_toggled');
  },
  async followers(req: Request, res: Response) {
    return ok(res, await socialService.getFollowers(req.params.userId));
  },
  async following(req: Request, res: Response) {
    return ok(res, await socialService.getFollowing(req.params.userId));
  },
};

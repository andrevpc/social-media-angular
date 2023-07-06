import { IPostResult } from "./IPostResult";

export interface ILikeResult
{
    post: IPostResult
    iLiked: boolean | null
}
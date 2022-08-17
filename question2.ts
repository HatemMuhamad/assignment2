import { StringDecoder } from "string_decoder";
import { pipe } from "./node_modules/fp-ts/lib/function";

const posts: Post[] = [
  { id: "1", __tag: "post", userId: 1, title: "a7a", body: "yama" },
  { id: "2", __tag: "post", userId: 1, title: "ss", body: "yama" },
  { id: "3", __tag: "post", userId: 1, title: "ww", body: "yama" },
  { id: "4", __tag: "post", userId: 1, title: "aa", body: "yama" },
];

const comments: Comment[] = [
  {
    id: "1",
    __tag: "comment",
    postId: 1,
    name: "Hatem",
    email: "essam@gmail.com",
    body: "Hi",
  },
  {
    id: "2",
    __tag: "comment",
    postId: 1,
    name: "Hatem",
    email: "essam@gmail.com",
    body: "Hi",
  },
  {
    id: "3",
    __tag: "comment",
    postId: 1,
    name: "Hatem",
    email: "essam@gmail.com",
    body: "Hi",
  },
  {
    id: "4",
    __tag: "comment",
    postId: 1,
    name: "Hatem",
    email: "essam@gmail.com",
    body: "Hi",
  },
  {
    id: "5",
    __tag: "comment",
    postId: 1,
    name: "Ali",
    email: "essam@gmail.com",
    body: "Hi",
  },
  {
    id: "6",
    __tag: "comment",
    postId: 1,
    name: "Andrew",
    email: "essam@gmail.com",
    body: "Hi",
  },
];

type HasError = { status: "error"; error: string };
type Successful<T> = { status: "success"; data: T[] };

const success = <T>(data: T[]): Successful<T> => {
  return { status: "success", data: data };
};
const hasError = (error: string): HasError => {
  return { status: "error", error: error };
};

type PostComment = Post | Comment;

interface Entity {
  id: string;
}

interface Post extends Entity {
  __tag: "post";
  userId: number;
  title: string;
  body: string;
}

interface Comment extends Entity {
  __tag: "comment";
  postId: number;
  name: string;
  email: string;
  body: string;
}

type ApiResponse<T extends Entity> = Successful<T> | HasError;

//Typeguard for error state
const isError = <T extends Entity>(api: ApiResponse<T>): api is HasError =>
  api.status === "error";

//Typeguard for success state
const isSuccess = <T extends Entity>(
  api: ApiResponse<T>
): api is Successful<T> => api.status === "success";

const fetchMockData = (reqType: string): PostComment[] | string => {
  if (reqType === "posts") {
    return posts;
  } else if (reqType === "comments") {
    return comments;
  } else {
    return "No data available";
  }
};

const fetchComments = pipe("comments", fetchMockData);
const fetchPosts = pipe("posts", fetchMockData);

const fold = <T extends Entity, R>(
  successfulF: (d: T[]) => R,
  errorF: (e: string) => R,
  r: ApiResponse<T>
): R => {
  if (isSuccess(r)) return successfulF(r.data);
  else return errorF(r.error);
};

const onSuccess = <T extends Entity, R>(d: T[]): string => {
  return "This is success";
};

const onError = <R>(e: string): string => {
  return `This is error: ${e}`;
};

const numberOfCommentsByAuthor = (name: string): number => {
  return comments.filter((comment) => {
    comment.name === name;
  }).length;
};

const numberofCommentsOnPost = (postId: number): number => {
  return comments.filter((comment) => {
    comment.postId === postId;
  }).length;
};

console.log("Fetch all comments: " + fetchComments);
console.log("Fetch all posts: " + fetchPosts);
console.log(
  "Fold implementation with success: " +
    fold(
      onSuccess,
      onError,
      success([
        {
          id: "1",
          __tag: "comment",
          postId: 1,
          name: "Hatem",
          email: "essam@gmail.com",
          body: "Hi",
        },
      ])
    )
);
console.log(
  "Fold implementation with error: " +
    fold(onSuccess, onError, hasError("Error message"))
);
console.log(
  "Number of comments by author: " + numberOfCommentsByAuthor("Hatem")
);
console.log("Number of comments on post: " + numberofCommentsOnPost(1));

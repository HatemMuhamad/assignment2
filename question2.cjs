"use strict";
exports.__esModule = true;
var function_1 = require("fp-ts/lib/function");
var posts = [
    { id: "1", __tag: "post", userId: 1, title: "a7a", body: "yama" },
    { id: "2", __tag: "post", userId: 1, title: "ss", body: "yama" },
    { id: "3", __tag: "post", userId: 1, title: "ww", body: "yama" },
    { id: "4", __tag: "post", userId: 1, title: "aa", body: "yama" },
];
var comments = [
    {
        id: "1",
        __tag: "comment",
        postId: 1,
        name: "Hatem",
        email: "essam@gmail.com",
        body: "Hi"
    },
    {
        id: "2",
        __tag: "comment",
        postId: 1,
        name: "Hatem",
        email: "essam@gmail.com",
        body: "Hi"
    },
    {
        id: "3",
        __tag: "comment",
        postId: 1,
        name: "Hatem",
        email: "essam@gmail.com",
        body: "Hi"
    },
    {
        id: "4",
        __tag: "comment",
        postId: 1,
        name: "Hatem",
        email: "essam@gmail.com",
        body: "Hi"
    },
    {
        id: "5",
        __tag: "comment",
        postId: 1,
        name: "Ali",
        email: "essam@gmail.com",
        body: "Hi"
    },
    {
        id: "6",
        __tag: "comment",
        postId: 1,
        name: "Andrew",
        email: "essam@gmail.com",
        body: "Hi"
    },
];
var success = function (data) {
    return { status: "success", data: data };
};
var hasError = function (error) {
    return { status: "error", error: error };
};
//Typeguard for error state
var isError = function (api) {
    return api.status === "error";
};
//Typeguard for success state
var isSuccess = function (api) { return api.status === "success"; };

var fetchMockData = function (fetchType) {
    if (fetchType === "posts") {
        return posts;
    }
    else {
        return comments;
    }
};
var fetchComments = (0, function_1.pipe)("comments", fetchMockData);
var fetchPosts = (0, function_1.pipe)("posts", fetchMockData);

var fold = function (successfulF, errorF, r) {
    if (isSuccess(r))
        return successfulF(r.data);
    else
        return errorF(r.error);
};

var onSuccess = function (d) {
    return "This is data: ".concat(d);
};

var onError = function (e) {
    return "This is error: ".concat(e);
};

var numberOfCommentsByAuthor = function (name) {
    return comments.filter(function (comment) {
        comment.name === name;
    }).length;
};

var numberofCommentsOnPost = function (postId) {
    return comments.filter(function (comment) {
        comment.postId === postId;
    }).length;
};

console.log(fetchComments);
console.log(fetchPosts);
console.log(
    fold(onSuccess, onError, success([
        {
            id: "1",
            __tag: "comment",
            postId: 1,
            name: "Hatem",
            email: "essam@gmail.com",
            body: "Hi"
        },
    ])));
console.log(
    fold(onSuccess, onError, hasError("Error message")));
console.log(numberOfCommentsByAuthor("Hatem"));
console.log(numberofCommentsOnPost(1));

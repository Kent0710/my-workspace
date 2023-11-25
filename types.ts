export interface AuthorType {
    email : any;
    emailVerified : any;
    id : any;
    image : any;
    name : any; 
    posts? : any[]
};

export interface PostType {
    id : any;
    author : AuthorType;
    authorId : string;
    postContent : string;
    datePosted : any;
    tag : string;
}

export interface TeamsType {
    id : string;
    name : string;
    owner : string;
    description : string;
    membersId : string[];
    members? : AuthorType[];
    posts? : PostType[]
};


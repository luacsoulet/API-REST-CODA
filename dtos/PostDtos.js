import { ExistingUserDto } from './UserDtos.js';
import { ExistingCategoryDto } from './CategoryDtos.js';

const PostCategoryDto = {
  type: 'object',
  properties: {
    category: ExistingCategoryDto
  }
}

export const ExistingPostWithIdDto = {
  type: 'object',
  //properties => propriétés de la réponse.
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    content: { type: 'string' },
    author: ExistingUserDto,
    categories: { type: 'array', items: PostCategoryDto }
  },
  required: ['id', 'title', 'content']
};

const FuturePostDto = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    content: { type: 'string' }
  },
  required: ['title', 'content']
};

const ExistingIdDto = {
  type: 'object',
  properties: {
    id: { type: 'number' }
  },
  required: ['id']
};

export const CreatePostDto = {
  security: [{ token: [] }],
  //body => corps de la requête.
  body: FuturePostDto,
  //response => réponse de la requête.
  response: {
    //200 => code de succès.
    200: ExistingPostWithIdDto
  }
};

export const GetPostsDto = {
  //queryString => paramètres passer dans l'url de la requête.
  queryString: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      limit: { type: 'number' }
    },
    required: ['page', 'limit']
  },
  response: {
    200: {
      //type => type de la réponse.
      type: 'array',
      //items => éléments de la réponse.
      items: ExistingPostWithIdDto
    }
  }
};

export const GetPostByIdDto = {
  params: ExistingIdDto,
  response: {
    200: ExistingPostWithIdDto
  }
};

export const DeletePostDto = {
  security: [{ token: [] }],
  params: ExistingIdDto,
  response: {
    200: ExistingPostWithIdDto
  }
};

export const UpdatePostDto = {
  security: [{ token: [] }],
  params: ExistingIdDto,
  body: FuturePostDto,
  response: {
    200: ExistingPostWithIdDto
  }
};

export const AddCategoryToPostDto = {
  security: [{ token: [] }],
  params: ExistingIdDto,
  body: ExistingIdDto,
  response: {
    200: ExistingPostWithIdDto
  }
};
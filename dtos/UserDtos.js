export const ExistingUserDto = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    email: { type: 'string' },
    username: { type: 'string' }
  },
  required: ['id', 'email', 'username']
};

const ExistingIdDto = {
  type: 'object',
  properties: {
    id: { type: 'number' }
  },
  required: ['id']
};

export const CreateUserDto = {
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['email', 'username', 'password']
  },
  response: {
    200: ExistingUserDto
  }
}

export const GetUserByIdDto = {
  params: ExistingIdDto,
  response: {
    200: ExistingUserDto
  }
}

export const GetUserByEmailAndPasswordDto = {
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['email', 'password']
  },
  response: {
    200: {
      type: 'object',
      properties: { 
        token: { type: 'string' },
        id: { type: 'number' },
        email: { type: 'string' },
        username: { type: 'string' }
      },
      required: ['token', 'id', 'email', 'username']
    }
  }
}

export const DeleteUserDto = {
  security: [{ token: [] }],
  params: ExistingIdDto,
  response: {
    200: ExistingUserDto
  }
}

export const GetUsersDto = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        //properties => propriétés de la réponse.
        properties: {
          id: { type: 'number' },
          email: { type: 'string' },
          username: { type: 'string' }
        },
        required: ['id', 'email', 'username']
      }
    }
  }
}
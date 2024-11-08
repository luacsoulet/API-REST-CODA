const FutureCategoryDto = {
  type: 'object',
  properties: {
    name: { type: 'string' }
  },
  required: ['name']
};

export const ExistingCategoryDto = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' }
  },
  required: ['id', 'name']
};

export const ExistingIdDto = {
  type: 'object',
  properties: {
    id: { type: 'number' }
  },
  required: ['id']
};

export const GetCategoriesDto = {
  response: {
    200: {
      type: 'array',
      items: ExistingCategoryDto
    }
  }
};

export const GetCategoryByIdDto = {
  params: ExistingIdDto,
  response: {
    200: ExistingCategoryDto
  }
};

export const CreateCategoryDto = {
  body: FutureCategoryDto,
  response: {
    200: ExistingCategoryDto
  }
};

export const UpdateCategoryDto = {
  body: FutureCategoryDto,
  response: {
    200: ExistingCategoryDto
  }
};

export const DeleteCategoryDto = {
  params: ExistingIdDto,
  response: {
    200: ExistingCategoryDto
  }
};

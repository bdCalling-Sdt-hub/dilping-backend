import { Request, Response } from 'express'
import { CategoryServices } from './category.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { StatusCodes } from 'http-status-codes'
import ApiError from '../../../errors/ApiError'

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryData = req.body
  const { image, ...restItem } = categoryData
  if (image?.length > 0) {
    restItem.icon = image[0]
  }

  if (!restItem.icon) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Please provide an icon')
  }
  const result = await CategoryServices.createCategory(restItem)

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  })
})

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const categoryData = req.body
  const { image, ...restItem } = categoryData
  if (image?.length > 0) {
    restItem.icon = image[0]
  }
  console.log(restItem)
  const result = await CategoryServices.updateCategory(id, restItem)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  })
})

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await CategoryServices.getSingleCategory(id)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  })
})

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategories()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  })
})

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await CategoryServices.deleteCategory(id)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  })
})

export const CategoryController = {
  createCategory,
  updateCategory,
  getSingleCategory,
  getAllCategories,
  deleteCategory,
}

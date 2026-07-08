import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';

const registerUser = async (req: Request, res: Response, next: any) => {
  
    const result = await AuthService.registerUser(req.body);
    sendResponse(res, {
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: any) => {
  
    const result = await AuthService.loginUser(req.body);
    sendResponse(res, {
      success: true,
      message: 'User logged in successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req: Request, res: Response, next: any) => {
  
    const userId = (req.user as any).id;
    const result = await AuthService.getMe(userId);
    sendResponse(res, {
      success: true,
      message: 'User profile retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  registerUser,
  loginUser,
  getMe,
};

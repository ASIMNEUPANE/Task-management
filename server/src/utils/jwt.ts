import * as jwt from "jsonwebtoken";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Payload } from "src/types/type";
export const generateJWT = (payload: object) => {
  console.log(jwt);
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET || "",
    { expiresIn: process.env.JWT_DURATION },
  );
};

export const generateRefreshToken = (payload: Payload) => {
  return jwt.sign({ data: payload }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_DURATION,
  });
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new HttpException("Access token expired", HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException("Invalid access token", HttpStatus.BAD_REQUEST);
  }
};

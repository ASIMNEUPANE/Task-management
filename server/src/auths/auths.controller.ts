import {
  Controller,
  Post,
  Body,
  Res,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  HttpStatus,
  HttpCode,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { Response, Request } from "express";
import { ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";

import { FileInterceptor } from "@nestjs/platform-express";
import { AuthsService } from "./auths.service";
import {
  CreateAuthDto,
  ForgetPassowrdDto,
  GenerateFPTokenDto,
  LogInReturnDto,
  LoginDto,
  ReturnTrueDto,
  VerifyDto,
} from "./dto/create-auth.dto";

import { AuthEntity } from "./entities/auth.entity";
import { diskStorage } from "multer";

@Controller("auths")
@ApiTags("Auth")
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  //Refresh token
  @Post("refresh")
  @ApiOperation({ summary: "Refresh token" })
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: [ReturnTrueDto],
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  refreshToken(@Req() req: Request) {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token not found");
    }
    return this.authsService.refreshAccessToken(refreshToken);
  }
  // Register User
  @Post("register")
  @ApiOperation({ summary: "Create new user" })
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: [AuthEntity],
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseInterceptors(
    FileInterceptor("images", {
      storage: diskStorage({
        destination: "./public/user",
        filename: (req, file, cb) => {
          // Generating a unique filename
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split(".").pop();
          cb(null, `${uniqueSuffix}.${extension}`);
        },
      }),
    }),
  )
  registerUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: "image/jpeg" }),
          new MaxFileSizeValidator({ maxSize: 100000 }),
        ],
        fileIsRequired: false,
      }),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    ) //@ts-expect-error
    file: Express.Multer.File,
    @Body() createUserDto: CreateAuthDto,
  ) {
    if (file) {
      const uniqueSuffix = Date.now() + "." + file.originalname.split(".")[1];

      createUserDto.images = uniqueSuffix;
    }

    return this.authsService.register(createUserDto);
  }

  // Verify User

  @Post("verify")
  @ApiOperation({ summary: "Verify register user" })
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: [AuthEntity],
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  verify(@Body() verifyDto: VerifyDto) {
    return this.authsService.verify(verifyDto);
  }

  // regenerateToken
  @Post("regenerateToken")
  @ApiOperation({ summary: "Verify register user" })
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: [ReturnTrueDto],
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  regenerateToken(@Body() regenerateTokenDto: GenerateFPTokenDto) {
    return this.authsService.regenerateToken(regenerateTokenDto.email);
  }

  // LogIn User
  @Post("login")
  @ApiOperation({ summary: "Login user" })
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: [LogInReturnDto],
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    console.log(loginDto, "loginDto");
    const loginResult = await this.authsService.login(
      loginDto.email,
      loginDto.password,
      res,
    );

    // Send the response as JSON
    return res.status(200).json(loginResult);
  }

  // LogOut User
  @Post("logout")
  @ApiOperation({ summary: "Logout user" })
  @ApiResponse({
    status: 200,
    description: "Logout successful",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res() res: Response) {
    return this.authsService.logout(req, res);
  }

  // generateFPToken
  @Post("generateFPToken")
  @ApiOperation({ summary: "generateFPToken user" })
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: [ReturnTrueDto],
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  generateFPToken(@Body() generateFPTokenDto: GenerateFPTokenDto) {
    return this.authsService.generateFPToken(generateFPTokenDto.email);
  }
  // Forget Password
  @Post("forget-passowrd")
  @ApiOperation({ summary: "generateFPToken user" })
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: [ReturnTrueDto],
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  forgetPassowrd(@Body() forgetPassowrdDto: ForgetPassowrdDto) {
    return this.authsService.forgetPassowrd(
      forgetPassowrdDto.email,
      forgetPassowrdDto.otp,
      forgetPassowrdDto.password,
    );
  }
}

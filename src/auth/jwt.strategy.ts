import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./types/jwt-payload";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new InternalServerErrorException('JWT_SECRET must be set')
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret
        })
    }

    async validate(payload: JwtPayload) {
        const user = await this.userService.findById(payload.sub);

        if (!user || user.forceLogOut) {
            throw new UnauthorizedException('Usuário inválido')
        }

        return user;
    }
}
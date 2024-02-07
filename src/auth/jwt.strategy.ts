import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from "src/env";
import { z } from "zod";

const tokenPayloadSchema = z.object({
    user_id: z.string().uuid()    
})

export type TokenPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_SECRET', { infer: true })

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: privateKey
        })
    }

    async validate(payload: TokenPayload) {
        return tokenPayloadSchema.parse(payload)
    }
}
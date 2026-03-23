import { Module } from "@nestjs/common";
import { HashingService } from "./hashing/hashing.service";
import { BcryptHashingService } from "./hashing/bcrypt-hashing.service";

@Module({
    providers: [
        //provê a classe concreta como se fosse a abstrata
        {
            provide: HashingService,
            useClass: BcryptHashingService
        }
    ],
    exports: [HashingService]
})
export class CommomModule {}
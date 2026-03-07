// backend/src/modules/insurance/insurance.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [],
})
export class InsuranceModule {}

// backend/src/modules/doctors/dto/create-doctor.dto.ts

import { IsString, IsNumber, IsArray, IsOptional, MinLength } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @MinLength(3)
  specialization: string;

  @IsArray()
  qualifications: string[];

  @IsNumber()
  experience: number;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  registrationNo?: string;

  @IsNumber()
  consultationFee: number;

  @IsString()
  departmentId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  phone?: string;
}

export class UpdateDoctorDto {
  @IsString()
  @IsOptional()
  specialization?: string;

  @IsArray()
  @IsOptional()
  qualifications?: string[];

  @IsNumber()
  @IsOptional()
  experience?: number;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  registrationNo?: string;

  @IsNumber()
  @IsOptional()
  consultationFee?: number;

  @IsString()
  @IsOptional()
  departmentId?: string;
}

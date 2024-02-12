import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PageFilter {
  @IsNotEmpty()
  limit: number;
  @IsNotEmpty()
  skip: number;

  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  status: string;
  @IsOptional()
  @IsString()
  startDate: string;
  @IsOptional()
  @IsString()
  endDate: string;
}

import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MockDataService } from './mock-data.service';

@Controller('api')
export class MockController {
  constructor(private mockDataService: MockDataService) {}

  // Health check
  @Get('health')
  health() {
    return { status: 'ok', message: 'Hospital Platform API running (Mock Mode)' };
  }

  // Auth endpoints
  @Post('auth/register')
  register(@Body() body: any) {
    return this.mockDataService.register(body.email, body.password, body.firstName, body.lastName);
  }

  @Post('auth/login')
  login(@Body() body: any) {
    return this.mockDataService.login(body.email, body.password);
  }

  @Get('auth/profile')
  getProfile() {
    return {
      id: 'user-1',
      email: 'admin@hospitaldemo.in',
      firstName: 'Admin',
      lastName: 'User',
      role: 'SUPER_ADMIN',
    };
  }

  // Hospital info
  @Get('hospital')
  getHospitalInfo() {
    return this.mockDataService.getHospitalInfo();
  }

  @Put('hospital')
  updateHospitalInfo(@Body() body: any) {
    return this.mockDataService.updateHospitalInfo(body);
  }

  @Post('restart')
  restartServices() {
    // This endpoint signals that services should be restarted
    // In a production environment, this would trigger a proper restart mechanism
    // For now, we'll just return a success response
    return {
      message: 'Services restart initiated. Please wait 30 seconds.',
      timestamp: new Date(),
    };
  }

  // Departments
  @Get('departments')
  getDepartments() {
    return this.mockDataService.getDepartments();
  }

  @Get('departments/:id')
  getDepartment(@Param('id') id: string) {
    return this.mockDataService.getDepartment(id);
  }

  // Doctors
  @Get('doctors')
  getDoctors(@Query('departmentId') departmentId?: string) {
    return this.mockDataService.getDoctors(departmentId);
  }

  @Get('doctors/:id')
  getDoctor(@Param('id') id: string) {
    return this.mockDataService.getDoctor(id);
  }

  @Get('doctors/:id/availability')
  getDoctorAvailability(@Param('id') id: string) {
    return {
      doctorId: id,
      availableSlots: [
        '09:00 AM',
        '09:30 AM',
        '10:00 AM',
        '10:30 AM',
        '02:00 PM',
        '02:30 PM',
        '03:00 PM',
      ],
    };
  }

  @Post('doctors')
  addDoctor(@Body() body: any) {
    return this.mockDataService.addDoctor(body);
  }

  @Put('doctors/:id')
  updateDoctor(@Param('id') id: string, @Body() body: any) {
    return this.mockDataService.updateDoctor(id, body);
  }

  @Delete('doctors/:id')
  deleteDoctor(@Param('id') id: string) {
    return this.mockDataService.deleteDoctor(id);
  }

  // Appointments
  @Get('appointments')
  getAppointments(@Query('patientId') patientId?: string) {
    return this.mockDataService.getAppointments(patientId);
  }

  @Post('appointments/book')
  bookAppointment(@Body() body: any) {
    return this.mockDataService.bookAppointment(body);
  }

  @Get('appointments/doctor/:doctorId')
  getAppointmentsByDoctor(@Param('doctorId') doctorId: string) {
    return this.mockDataService.getAppointmentsByDoctor(doctorId);
  }

  @Put('appointments/:id/status')
  updateAppointmentStatus(@Param('id') id: string, @Body() body: any) {
    return this.mockDataService.updateAppointmentStatus(id, body.status);
  }

  // Blog
  @Get('blog')
  getBlogPosts() {
    return this.mockDataService.getBlogPosts();
  }

  @Get('blog/:slug')
  getBlogPost(@Param('slug') slug: string) {
    return this.mockDataService.getBlogPost(slug);
  }

  @Post('blog')
  addBlogPost(@Body() body: any) {
    return this.mockDataService.addBlogPost(body);
  }

  // Health packages
  @Get('packages')
  getHealthPackages() {
    return this.mockDataService.getHealthPackages();
  }

  @Get('packages/:id')
  getHealthPackage(@Param('id') id: string) {
    return this.mockDataService.getHealthPackage(id);
  }

  // Testimonials
  @Get('testimonials')
  getTestimonials() {
    return this.mockDataService.getTestimonials();
  }

  @Post('testimonials')
  addTestimonial(@Body() body: any) {
    return this.mockDataService.addTestimonial(body);
  }

  // Insurance
  @Get('insurance')
  getInsurancePartners() {
    return this.mockDataService.getInsurancePartners();
  }

  // Careers
  @Get('careers')
  getCareerOpenings() {
    return this.mockDataService.getCareerOpenings();
  }

  @Post('careers/apply')
  applyForJob(@Body() body: any) {
    return this.mockDataService.addCareerApplication(body);
  }
}

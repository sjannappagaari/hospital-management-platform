import { Injectable } from '@nestjs/common';
import { mockData } from './mock-data';

@Injectable()
export class MockDataService {
  // Auth endpoints
  register(email: string, password: string, firstName: string, lastName: string) {
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      firstName,
      lastName,
      role: 'PATIENT',
      phone: '',
      createdAt: new Date(),
    };
    mockData.users.push(newUser);
    return {
      message: 'User registered successfully',
      user: newUser,
      token: 'mock-jwt-token-' + Date.now(),
    };
  }

  login(email: string, password: string) {
    const user = mockData.users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      user: { id: user.id, email: user.email, firstName: user.firstName, role: user.role },
      token: 'mock-jwt-token-' + Date.now(),
      expiresIn: 86400,
    };
  }

  // Hospital info
  getHospitalInfo() {
    return mockData.hospitalInfo;
  }

  // Departments
  getDepartments() {
    return mockData.departments;
  }

  getDepartment(id: string) {
    return mockData.departments.find(d => d.id === id);
  }

  // Doctors
  getDoctors(departmentId?: string) {
    if (departmentId) {
      return mockData.doctors.filter(d => d.departmentId === departmentId);
    }
    return mockData.doctors;
  }

  getDoctor(id: string) {
    return mockData.doctors.find(d => d.id === id);
  }

  addDoctor(doctorData: any) {
    const newDoctor = {
      id: `doc-${Date.now()}`,
      ...doctorData,
      createdAt: new Date(),
    };
    mockData.doctors.push(newDoctor);
    return newDoctor;
  }

  updateDoctor(id: string, doctorData: any) {
    const doctor = mockData.doctors.find(d => d.id === id);
    if (!doctor) throw new Error('Doctor not found');
    Object.assign(doctor, doctorData);
    return doctor;
  }

  deleteDoctor(id: string) {
    const index = mockData.doctors.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Doctor not found');
    mockData.doctors.splice(index, 1);
    return { message: 'Doctor deleted successfully' };
  }

  // Appointments
  getAppointments(patientId?: string) {
    if (patientId) {
      return mockData.appointments.filter(a => a.patientId === patientId);
    }
    return mockData.appointments;
  }

  bookAppointment(appointmentData: any) {
    const newAppointment = {
      id: `apt-${Date.now()}`,
      ...appointmentData,
      status: 'PENDING',
      createdAt: new Date(),
    };
    mockData.appointments.push(newAppointment);
    return newAppointment;
  }

  getAppointmentsByDoctor(doctorId: string) {
    return mockData.appointments.filter(a => a.doctorId === doctorId);
  }

  updateAppointmentStatus(id: string, status: string) {
    const appointment = mockData.appointments.find(a => a.id === id);
    if (!appointment) throw new Error('Appointment not found');
    appointment.status = status;
    return appointment;
  }

  // Blog posts
  getBlogPosts() {
    return mockData.blogPosts.filter(b => b.status === 'PUBLISHED');
  }

  getBlogPost(slug: string) {
    return mockData.blogPosts.find(b => b.slug === slug);
  }

  addBlogPost(postData: any) {
    const newPost = {
      id: `blog-${Date.now()}`,
      ...postData,
      status: 'DRAFT',
      views: 0,
      createdAt: new Date(),
    };
    mockData.blogPosts.push(newPost);
    return newPost;
  }

  // Health packages
  getHealthPackages() {
    return mockData.healthPackages;
  }

  getHealthPackage(id: string) {
    return mockData.healthPackages.find(p => p.id === id);
  }

  // Testimonials
  getTestimonials() {
    return mockData.testimonials;
  }

  addTestimonial(testimonialData: any) {
    const newTestimonial = {
      id: `test-${Date.now()}`,
      ...testimonialData,
      approved: false,
      createdAt: new Date(),
    };
    mockData.testimonials.push(newTestimonial);
    return newTestimonial;
  }

  // Insurance
  getInsurancePartners() {
    return mockData.insurancePartners;
  }

  // Careers
  getCareerOpenings() {
    return mockData.careerOpenings;
  }

  addCareerApplication(applicationData: any) {
    return {
      message: 'Application submitted successfully',
      applicationId: `app-${Date.now()}`,
    };
  }
}

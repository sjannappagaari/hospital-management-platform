// database/prisma/seed.ts

import { PrismaClient, UserRole, AppointmentStatus, DayOfWeek, BlogPostStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clear existing data (be careful in production!)
  await prisma.appointment.deleteMany({});
  await prisma.careerApplication.deleteMany({});
  await prisma.careerOpening.deleteMany({});
  await prisma.doctorAvailability.deleteMany({});
  await prisma.doctor.deleteMany({});
  await prisma.patient.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.healthPackage.deleteMany({});
  await prisma.insurancePartner.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.hospitalInfo.deleteMany({});

  // ============================================
  // CREATE HOSPITAL INFO
  // ============================================

  const hospitalInfo = await prisma.hospitalInfo.create({
    data: {
      name: 'Helios Super Speciality Hospital',
      description:
        'A leading multispecialty hospital in India dedicated to providing world-class healthcare with cutting-edge technology and compassionate care.',
      logo: '/images/hospital-logo.png',
      banner: '/images/hospital-banner.jpg',
      phone: '+91-11-4000-1111',
      email: 'info@helioshospital.in',
      address: '123 Medical Avenue, Medical District',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110085',
      country: 'India',
      website: 'https://helioshospital.in',
      facebook: 'https://facebook.com/helioshospital',
      instagram: 'https://instagram.com/helioshospital',
      twitter: 'https://twitter.com/helioshospital',
      linkedin: 'https://linkedin.com/company/helioshospital',
      established: new Date('2005-01-15'),
      bedCount: 500,
      department_count: 20,
      doctor_count: 150,
    },
  });

  console.log('✅ Hospital info created');

  // ============================================
  // CREATE DEPARTMENTS
  // ============================================

  const departments = await Promise.all([
    prisma.department.create({
      data: {
        name: 'Cardiology',
        slug: 'cardiology',
        description: 'Comprehensive heart and cardiovascular care with advanced diagnostic and interventional facilities.',
        icon: '❤️',
        image: '/images/departments/cardiology.jpg',
        isActive: true,
        displayOrder: 1,
      },
    }),
    prisma.department.create({
      data: {
        name: 'Orthopedics',
        slug: 'orthopedics',
        description: 'Expert care for bone, joint, and muscle disorders with modern surgical techniques.',
        icon: '🦴',
        image: '/images/departments/orthopedics.jpg',
        isActive: true,
        displayOrder: 2,
      },
    }),
    prisma.department.create({
      data: {
        name: 'Neuroscience',
        slug: 'neuroscience',
        description: 'Specialized treatment for neurological disorders and brain conditions.',
        icon: '🧠',
        image: '/images/departments/neuro.jpg',
        isActive: true,
        displayOrder: 3,
      },
    }),
    prisma.department.create({
      data: {
        name: 'Oncology',
        slug: 'oncology',
        description: 'Comprehensive cancer care with latest treatment modalities.',
        icon: '⚕️',
        image: '/images/departments/oncology.jpg',
        isActive: true,
        displayOrder: 4,
      },
    }),
    prisma.department.create({
      data: {
        name: 'Pediatrics',
        slug: 'pediatrics',
        description: 'Specialized healthcare services for infants, children, and adolescents.',
        icon: '👶',
        image: '/images/departments/pediatrics.jpg',
        isActive: true,
        displayOrder: 5,
      },
    }),
  ]);

  console.log('✅ Departments created');

  // ============================================
  // CREATE USERS AND DOCTORS
  // ============================================

  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  const doctorPassword = await bcrypt.hash('Doctor@123', 10);

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@hospitaldemo.in',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.SUPER_ADMIN,
      phone: '+91-9000000001',
    },
  });

  console.log('✅ Admin user created');

  // Create doctors
  const doctorsData = [
    {
      name: 'Dr. Rajesh Kumar',
      specialization: 'Cardiologist',
      department: departments[0],
      experience: 15,
    },
    {
      name: 'Dr. Priya Sharma',
      specialization: 'Orthopedic Surgeon',
      department: departments[1],
      experience: 12,
    },
    {
      name: 'Dr. Amit Patel',
      specialization: 'Neurosurgeon',
      department: departments[2],
      experience: 18,
    },
    {
      name: 'Dr. Neha Gupta',
      specialization: 'Oncologist',
      department: departments[3],
      experience: 14,
    },
    {
      name: 'Dr. Vikram Singh',
      specialization: 'Pediatrician',
      department: departments[4],
      experience: 10,
    },
    {
      name: 'Dr. Anjali Desai',
      specialization: 'Interventional Cardiologist',
      department: departments[0],
      experience: 16,
    },
    {
      name: 'Dr. Rohit Verma',
      specialization: 'Spine Surgeon',
      department: departments[1],
      experience: 13,
    },
    {
      name: 'Dr. Meera Iyer',
      specialization: 'Neurologist',
      department: departments[2],
      experience: 11,
    },
    {
      name: 'Dr. Sanjay Reddy',
      specialization: 'Pediatric Cardiologist',
      department: departments[4],
      experience: 9,
    },
    {
      name: 'Dr. Priyanka Nair',
      specialization: 'Medical Oncologist',
      department: departments[3],
      experience: 12,
    },
  ];

  const doctors = await Promise.all(
    doctorsData.map(async (data) => {
      const userEmail = `${data.name.toLowerCase().replace(/\s+/g, '.')}@helioshospital.in`;
      const user = await prisma.user.create({
        data: {
          email: userEmail,
          password: doctorPassword,
          firstName: data.name.split(' ')[1],
          lastName: data.name.split(' ')[2] || data.name.split(' ')[1],
          role: UserRole.DOCTOR,
          phone: `+91-${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
        },
      });

      return prisma.doctor.create({
        data: {
          userId: user.id,
          departmentId: data.department.id,
          specialization: data.specialization,
          qualifications: ['MBBS', 'MD/MS', 'Diploma in Specialization'],
          experience: data.experience,
          bio: `Dr. ${data.name.split(' ')[1]} is an accomplished ${data.specialization} with ${data.experience} years of experience in treating complex cases.`,
          image: `/images/doctors/doctor-${Math.floor(Math.random() * 5) + 1}.jpg`,
          registrationNo: `REG${Math.floor(Math.random() * 900000 + 100000)}`,
          consultationFee: Math.floor(Math.random() * 200 + 300) * 100, // 300-500 rupees
          isAvailable: true,
          displayOrder: doctorsData.indexOf(data),
        },
      });
    }),
  );

  console.log('✅ Doctors created');

  // ============================================
  // CREATE DOCTOR AVAILABILITY
  // ============================================

  const daysOfWeek = [
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
  ];

  for (const doctor of doctors) {
    for (const day of daysOfWeek) {
      await prisma.doctorAvailability.create({
        data: {
          doctorId: doctor.id,
          dayOfWeek: day,
          startTime: '09:00',
          endTime: '17:00',
          slotDuration: 30,
          isActive: true,
        },
      });
    }
  }

  console.log('✅ Doctor availability created');

  // ============================================
  // CREATE PATIENTS AND USERS
  // ============================================

  const patientNames = [
    'Rajendra Kumar',
    'Anita Singh',
    'Mohan Patel',
    'Sakshi Sharma',
    'Arjun Reddy',
  ];

  const patients = await Promise.all(
    patientNames.map(async (name, index) => {
      const user = await prisma.user.create({
        data: {
          email: `patient${index + 1}@example.com`,
          password: hashedPassword,
          firstName: name.split(' ')[0],
          lastName: name.split(' ')[1],
          role: UserRole.PATIENT,
          phone: `+91-${9000000001 + index}`,
        },
      });

      return prisma.patient.create({
        data: {
          userId: user.id,
          dateOfBirth: new Date(`${1950 + index}-05-15`),
          gender: index % 2 === 0 ? 'MALE' : 'FEMALE',
          bloodGroup: ['A+', 'B+', 'O+', 'AB+'][index % 4],
          allergies: 'None',
          medicalHistory: 'Hypertension controlled',
          emergencyContact: 'Family Member',
          emergencyPhone: `+91-${9100000001 + index}`,
        },
      });
    }),
  );

  console.log('✅ Patients created');

  // ============================================
  // CREATE APPOINTMENTS
  // ============================================

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  for (let i = 0; i < patients.length; i++) {
    const appointmentDate = new Date(tomorrow);
    appointmentDate.setDate(appointmentDate.getDate() + i);

    await prisma.appointment.create({
      data: {
        patientId: patients[i].id,
        userId: patients[i].userId,
        doctorId: doctors[i].id,
        departmentId: doctors[i].departmentId,
        appointmentDate,
        appointmentTime: '10:00',
        status: i % 3 === 0 ? AppointmentStatus.PENDING : AppointmentStatus.APPROVED,
        reason: 'Regular Check-up',
        notes: 'Patient is stable',
      },
    });
  }

  console.log('✅ Appointments created');

  // ============================================
  // CREATE HEALTH PACKAGES
  // ============================================

  const packages = await Promise.all([
    prisma.healthPackage.create({
      data: {
        name: 'Full Body Health Checkup',
        slug: 'full-body-checkup',
        description: 'Comprehensive health screening for preventive care and early disease detection.',
        price: 25000, // 250 rupees in paisa
        duration: '3 days',
        tests: ['Blood Tests', 'ECG', 'Ultrasound (Abdomen)', 'Chest X-Ray', 'Thyroid Profile'],
        benefits: ['100% Health Assessment', 'Doctor Consultation', 'Personalized Health Report'],
        image: '/images/packages/full-body-checkup.jpg',
        isActive: true,
        displayOrder: 1,
      },
    }),
    prisma.healthPackage.create({
      data: {
        name: 'Cardiac Wellness Package',
        slug: 'cardiac-wellness',
        description: 'Specialized cardiac health screening with advance diagnostics.',
        price: 35000,
        duration: '1 week',
        tests: ['ECG', '2D Echo', 'Stress Test', 'Lipid Profile', 'Troponin Test'],
        benefits: ['Cardiologist Consultation', 'Lifestyle Counseling', 'Follow-up Package'],
        image: '/images/packages/cardiac.jpg',
        isActive: true,
        displayOrder: 2,
      },
    }),
    prisma.healthPackage.create({
      data: {
        name: 'Orthopedic Health Check',
        slug: 'orthopedic-check',
        description: 'Comprehensive bone and joint health assessment.',
        price: 20000,
        duration: '2 days',
        tests: ['X-Ray (as required)', 'Joint Assessment', 'Mobility Test', 'Vitamin D Profile'],
        benefits: ['Orthopedic Consultation', 'Personalized Exercise Plan'],
        image: '/images/packages/orthopedic.jpg',
        isActive: true,
        displayOrder: 3,
      },
    }),
    prisma.healthPackage.create({
      data: {
        name: 'Pediatric Wellness Program',
        slug: 'pediatric-wellness',
        description: 'Complete health check-up for children aged 2-12 years.',
        price: 15000,
        duration: '1 day',
        tests: ['Growth Assessment', 'Vision & Hearing Test', 'Blood Tests', 'Developmental Screening'],
        benefits: ['Pediatrician Consultation', 'Vaccination Guidance', 'Parent Education'],
        image: '/images/packages/pediatric.jpg',
        isActive: true,
        displayOrder: 4,
      },
    }),
    prisma.healthPackage.create({
      data: {
        name: 'Senior Citizens Health Package',
        slug: 'senior-citizens',
        description: 'Specialized health screening for seniors (60+ years).',
        price: 40000,
        duration: '5 days',
        tests: [
          'Blood Tests',
          'ECG',
          'Ultrasound',
          'Cognitive Assessment',
          'Fall Risk Assessment',
        ],
        benefits: ['Geriatric Consultation', 'Home Safety Assessment', 'Medication Review'],
        image: '/images/packages/senior-citizens.jpg',
        isActive: true,
        displayOrder: 5,
      },
    }),
  ]);

  console.log('✅ Health packages created');

  // ============================================
  // CREATE TESTIMONIALS
  // ============================================

  const testimonials = await Promise.all([
    prisma.testimonial.create({
      data: {
        title: 'Excellent Care and Treatment',
        content:
          'The doctors and nursing staff were highly professional and caring. I received excellent care during my cardiac treatment. Highly recommended!',
        rating: 5,
        userId: patients[0].userId,
        doctorId: doctors[0].id,
        isApproved: true,
        isActive: true,
        displayOrder: 1,
      },
    }),
    prisma.testimonial.create({
      data: {
        title: 'Great Recovery Experience',
        content:
          'After my orthopedic surgery, the post-operative care was exceptional. The physiotherapy team helped me recover faster than expected.',
        rating: 5,
        userId: patients[1].userId,
        doctorId: doctors[1].id,
        isApproved: true,
        isActive: true,
        displayOrder: 2,
      },
    }),
    prisma.testimonial.create({
      data: {
        title: 'Best Hospital Experience',
        content:
          'From admission to discharge, everything was smooth and well-organized. The doctors explained everything clearly.',
        rating: 4,
        userId: patients[2].userId,
        doctorId: doctors[2].id,
        isApproved: true,
        isActive: true,
        displayOrder: 3,
      },
    }),
    prisma.testimonial.create({
      data: {
        title: 'Compassionate Medical Team',
        content:
          'The entire team showed genuine care and compassion. My family felt secure with their expertise.',
        rating: 5,
        userId: patients[3].userId,
        isApproved: true,
        isActive: true,
        displayOrder: 4,
      },
    }),
    prisma.testimonial.create({
      data: {
        title: 'Life-Changing Treatment',
        content:
          'The treatment I received here changed my life. I am grateful to the doctors and staff.',
        rating: 5,
        userId: patients[4].userId,
        isApproved: true,
        isActive: true,
        displayOrder: 5,
      },
    }),
  ]);

  console.log('✅ Testimonials created');

  // ============================================
  // CREATE BLOG POSTS
  // ============================================

  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: 'Common Heart Diseases: Risk Factors and Prevention',
        slug: 'heart-diseases-prevention',
        excerpt: 'Learn about the common heart diseases, their risk factors, and how to prevent them.',
        content: `
          <h2>Understanding Heart Health</h2>
          <p>Cardiovascular diseases remain the leading cause of death worldwide. Early detection and lifestyle modifications can significantly reduce the risk.</p>
          <h3>Common Heart Conditions</h3>
          <ul>
            <li>Coronary Artery Disease</li>
            <li>Heart Failure</li>
            <li>Arrhythmias</li>
            <li>Valve Disorders</li>
          </ul>
          <h3>Prevention Tips</h3>
          <p>Regular exercise, healthy diet, stress management, and routine check-ups are essential for heart health.</p>
        `,
        image: '/images/blog/heart-health.jpg',
        authorId: adminUser.id,
        status: BlogPostStatus.PUBLISHED,
        publishedAt: new Date(),
        isActive: true,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'Orthopedic Health: Maintaining Strong Bones',
        slug: 'orthopedic-bone-health',
        excerpt: 'Essential tips for maintaining bone health and preventing osteoporosis.',
        content: `
          <h2>Bone Health is Important</h2>
          <p>Our bones support our body and protect vital organs. Maintaining bone density is crucial for quality of life.</p>
          <h3>Bone Health Tips</h3>
          <ul>
            <li>Adequate calcium and vitamin D intake</li>
            <li>Weight-bearing exercises</li>
            <li>Regular health check-ups</li>
            <li>Avoid smoking and excessive alcohol</li>
          </ul>
        `,
        image: '/images/blog/bone-health.jpg',
        authorId: adminUser.id,
        status: BlogPostStatus.PUBLISHED,
        publishedAt: new Date(),
        isActive: true,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'Pediatric Care: Ensuring Your Child\'s Health',
        slug: 'pediatric-child-health',
        excerpt: 'Complete guide to pediatric care and child health development.',
        content: `
          <h2>Child Health and Development</h2>
          <p>Proper pediatric care in the early years sets the foundation for lifelong health.</p>
          <h3>Key Milestones</h3>
          <p>Regular monitoring of developmental milestones helps ensure healthy growth and development.</p>
        `,
        image: '/images/blog/child-health.jpg',
        authorId: adminUser.id,
        status: BlogPostStatus.PUBLISHED,
        publishedAt: new Date(),
        isActive: true,
      },
    }),
  ]);

  console.log('✅ Blog posts created');

  // ============================================
  // CREATE INSURANCE PARTNERS
  // ============================================

  const insurancePartners = await Promise.all([
    prisma.insurancePartner.create({
      data: {
        name: 'HDFC ERGO Health Insurance',
        slug: 'hdfc-ergo',
        description: 'Leading health insurance provider in India',
        logo: '/images/insurance/hdfc-ergo.png',
        website: 'https://hdfcergo.com',
        phone: '+91-11-2000-2000',
        isActive: true,
        displayOrder: 1,
      },
    }),
    prisma.insurancePartner.create({
      data: {
        name: 'ICICI Lombard Health',
        slug: 'icici-lombard',
        description: 'Comprehensive health insurance solutions',
        logo: '/images/insurance/icici-lombard.png',
        website: 'https://icicilombard.com',
        phone: '+91-11-4100-4100',
        isActive: true,
        displayOrder: 2,
      },
    }),
    prisma.insurancePartner.create({
      data: {
        name: 'Aditya Birla Health Insurance',
        slug: 'aditya-birla',
        description: 'Trusted health insurance provider',
        logo: '/images/insurance/aditya-birla.png',
        website: 'https://adityabirlahealthinsurance.com',
        phone: '+91-11-6000-6000',
        isActive: true,
        displayOrder: 3,
      },
    }),
    prisma.insurancePartner.create({
      data: {
        name: 'Star Health and Allied Insurance',
        slug: 'star-health',
        description: 'Affordable health insurance plans',
        logo: '/images/insurance/star-health.png',
        website: 'https://starhealth.in',
        phone: '+91-11-3000-3000',
        isActive: true,
        displayOrder: 4,
      },
    }),
    prisma.insurancePartner.create({
      data: {
        name: 'Apollo Munich Health Insurance',
        slug: 'apollo-munich',
        description: 'Quality health insurance coverage',
        logo: '/images/insurance/apollo-munich.png',
        website: 'https://apollomunich.com',
        phone: '+91-11-5500-5500',
        isActive: true,
        displayOrder: 5,
      },
    }),
  ]);

  console.log('✅ Insurance partners created');

  // ============================================
  // CREATE CAREER OPENINGS
  // ============================================

  const careers = await Promise.all([
    prisma.careerOpening.create({
      data: {
        title: 'Senior Cardiologist',
        slug: 'senior-cardiologist',
        department: 'Cardiology',
        description: 'We are looking for an experienced cardiologist to join our team.',
        requirements: [
          'MBBS with MD/DM in Cardiology',
          '10+ years of experience',
          'Strong clinical expertise',
        ],
        responsibilities: [
          'Patient diagnosis and treatment',
          'Research and publications',
          'Teaching medical students',
        ],
        salary: '₹20,00,000 - ₹25,00,000 per annum',
        experience: '10+ years',
        location: 'New Delhi',
        jobType: 'FULL_TIME',
        isActive: true,
        isOpen: true,
        displayOrder: 1,
      },
    }),
    prisma.careerOpening.create({
      data: {
        title: 'Registered Nurse',
        slug: 'registered-nurse',
        department: 'Nursing',
        description: 'Seeking compassionate and skilled nurses for various departments.',
        requirements: [
          'B.Sc or Diploma in Nursing',
          '2+ years experience',
          'Valid nursing registration',
        ],
        responsibilities: ['Patient care', 'Medical assistance', 'Patient monitoring'],
        salary: '₹4,00,000 - ₹6,00,000 per annum',
        experience: '2+ years',
        location: 'New Delhi',
        jobType: 'FULL_TIME',
        isActive: true,
        isOpen: true,
        displayOrder: 2,
      },
    }),
    prisma.careerOpening.create({
      data: {
        title: 'Junior Doctor (MBBS)',
        slug: 'junior-doctor',
        department: 'Medical Services',
        description: 'Entry-level position for fresh medical graduates.',
        requirements: [
          'MBBS degree',
          'Recent medical graduate',
          'Willingness to learn',
        ],
        responsibilities: [
          'Patient care under supervision',
          'Medical record maintenance',
          'Clinical learning',
        ],
        salary: '₹3,00,000 - ₹4,00,000 per annum',
        experience: 'Fresher',
        location: 'New Delhi',
        jobType: 'FULL_TIME',
        isActive: true,
        isOpen: true,
        displayOrder: 3,
      },
    }),
  ]);

  console.log('✅ Career openings created');

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

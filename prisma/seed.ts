import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { mockProperties } from '../src/data/properties'
import { pricingPlans, addonPlans } from '../src/data/pricing'

const prisma = new PrismaClient()

async function main() {
  // 1. Seed Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rumio.id' },
    update: {},
    create: {
      email: 'admin@rumio.id',
      name: 'Admin Rumio',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user ready')

  // 2. Seed Pricing Plans & Features
  console.log('Seeding Pricing Plans...')
  for (const plan of pricingPlans) {
    const createdPlan = await prisma.pricingPlan.upsert({
      where: { id: plan.id },
      update: {
        name: plan.name,
        description: plan.description,
        price: parseFloat(plan.price.replace(/\./g, '')),
        icon: plan.icon.displayName || plan.icon.name || 'Check',
        isPopular: plan.isPopular || false,
      },
      create: {
        id: plan.id,
        name: plan.name,
        description: plan.description,
        price: parseFloat(plan.price.replace(/\./g, '')),
        icon: plan.icon.displayName || plan.icon.name || 'Check',
        isPopular: plan.isPopular || false,
      },
    })
    
    // Seed Features
    await prisma.pricingFeature.deleteMany({ where: { planId: createdPlan.id } })
    
    for (const [index, feature] of plan.features.entries()) {
      await prisma.pricingFeature.create({
        data: {
          planId: createdPlan.id,
          text: feature.text,
          tableValues: feature.tableValues,
          sortOrder: index,
        },
      })
    }
  }
  console.log('✅ Pricing Plans seeded')

  // 3. Seed Addon Plans
  console.log('Seeding Addon Plans...')
  for (const addon of addonPlans) {
    await prisma.addonPlan.upsert({
      where: { id: addon.id },
      update: {
        name: addon.name,
        description: addon.description,
        price: parseFloat(addon.price.replace(/\./g, '')),
        priceSuffix: addon.priceSuffix,
        imageUrl: addon.image,
      },
      create: {
        id: addon.id,
        name: addon.name,
        description: addon.description,
        price: parseFloat(addon.price.replace(/\./g, '')),
        priceSuffix: addon.priceSuffix,
        imageUrl: addon.image,
      },
    })
  }
  console.log('✅ Addon Plans seeded')

  // 4. Seed Properties
  console.log('Seeding Properties...')
  for (const prop of mockProperties) {
    const electricityInt = prop.electricity ? parseInt(prop.electricity.replace(/\D/g, '')) || 0 : 0;
    
    const createdProperty = await prisma.property.upsert({
      where: { slug: prop.slug },
      update: {
        title: prop.title,
        price: prop.priceNumeric,
        location: prop.location,
        propertyType: prop.propertyType || "Rumah",
        listingType: prop.listingType || "Dijual",
        condition: prop.condition || "Baru",
        bedrooms: prop.beds,
        bathrooms: prop.baths,
        floors: prop.floors || 1,
        landArea: prop.landArea || prop.area,
        buildingArea: prop.area,
        electricity: electricityInt,
        waterSupply: prop.water || "PAM",
        facing: prop.facing || "Selatan",
        buildYear: prop.builtYear || new Date().getFullYear(),
        certificate: prop.certificate || "SHM",
        description: prop.description || "",
        featuredImage: prop.image,
        highlights: prop.highlights ? prop.highlights : undefined,
        virtualTourData: prop.slug === 'apartemen-studio-furnished' ? { url: "https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg" } : undefined,
      },
      create: {
        ownerId: admin.id,
        title: prop.title,
        slug: prop.slug,
        price: prop.priceNumeric,
        location: prop.location,
        propertyType: prop.propertyType || "Rumah",
        listingType: prop.listingType || "Dijual",
        condition: prop.condition || "Baru",
        bedrooms: prop.beds,
        bathrooms: prop.baths,
        floors: prop.floors || 1,
        landArea: prop.landArea || prop.area,
        buildingArea: prop.area,
        electricity: electricityInt,
        waterSupply: prop.water || "PAM",
        facing: prop.facing || "Selatan",
        buildYear: prop.builtYear || new Date().getFullYear(),
        certificate: prop.certificate || "SHM",
        description: prop.description || "",
        featuredImage: prop.image,
        highlights: prop.highlights ? prop.highlights : undefined,
        virtualTourData: prop.slug === 'apartemen-studio-furnished' ? { url: "https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg" } : undefined,
      },
    })

    // Seed Gallery
    await prisma.propertyImage.deleteMany({ where: { propertyId: createdProperty.id } })
    const dummyCaptions = ["Tampak Depan", "Ruang Tamu Luas", "Kamar Tidur Utama", "Dapur Minimalis", "Kamar Mandi Bersih", "Taman Belakang Hijau"];
    for (let i = 0; i < prop.gallery.length; i++) {
      const image = prop.gallery[i];
      await prisma.propertyImage.create({
        data: {
          propertyId: createdProperty.id,
          imageUrl: image,
          caption: dummyCaptions[i % dummyCaptions.length]
        },
      })
    }
  }
  console.log('✅ Properties seeded')

  // 5. Seed Blogs
  console.log('Seeding Blogs...')
  const blogsDirectory = path.join(process.cwd(), 'src/data/blogs')
  if (fs.existsSync(blogsDirectory)) {
    const fileNames = fs.readdirSync(blogsDirectory)
    for (const fileName of fileNames) {
      if (fileName.endsWith('.md')) {
        const fullPath = path.join(blogsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        
        const slug = fileName.replace(/\.md$/, '')
        
        await prisma.blog.upsert({
          where: { slug },
          update: {
            title: data.title || slug,
            category: data.category || 'Uncategorized',
            content: content,
            author: data.author || admin.name,
            featuredImage: data.image || null,
          },
          create: {
            title: data.title || slug,
            slug: slug,
            category: data.category || 'Uncategorized',
            content: content,
            author: data.author || admin.name,
            featuredImage: data.image || null,
          },
        })
      }
    }
    console.log('✅ Blogs seeded')
  } else {
    console.log('⚠️ Blogs directory not found, skipping.')
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')

async function testDatabase() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔍 Testing database connection...')
    
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connection successful')
    
    // Test a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Database query successful:', result)
    
    // Check if tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('📊 Available tables:', tables.map(t => t.table_name))
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()

#!/usr/bin/env node

/**
 * Utility script to generate bcrypt hash for passwords
 * Usage: node api/generateHash.js
 */

const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🔐 Bcrypt Password Hash Generator');
console.log('=' .repeat(40));

rl.question('Enter password to hash: ', (password) => {
  if (!password) {
    console.log('❌ Password cannot be empty');
    rl.close();
    process.exit(1);
  }

  const hash = bcrypt.hashSync(password, 10);
  console.log('\n✅ Hashed password:');
  console.log(hash);
  console.log('\n📝 Add this to your .env.local file as:');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  rl.close();
});
